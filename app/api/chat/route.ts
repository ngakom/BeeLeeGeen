import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, faqReply } from "@/lib/chatbot";

const MAX_HISTORY = 12;
const MAX_CHARS = 1000;
const RATE_LIMIT = 20; // messages per visitor per window
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best-effort per-instance limiter to stop casual abuse of the API key.
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

type ChatTurn = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): Anthropic.MessageParam[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const turns = raw.slice(-MAX_HISTORY).filter(
    (m): m is ChatTurn =>
      (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim() !== ""
  );
  // The API requires the conversation to start with a user turn.
  while (turns.length && turns[0].role !== "user") turns.shift();
  if (!turns.length || turns[turns.length - 1].role !== "user") return null;
  return turns.map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
}

export async function POST(req: Request) {
  const messages = parseMessages(await req.json().catch(() => null));
  if (!messages) return Response.json({ error: "Invalid request" }, { status: 400 });

  const question = messages[messages.length - 1].content as string;

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ reply: faqReply(question) });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({
      reply: "You've sent a lot of messages in a short time. Please WhatsApp or call the salon and we'll help you personally.",
    });
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 2000,
      output_config: { effort: "low" },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages,
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    if (response.stop_reason === "refusal" || !text) {
      return Response.json({ reply: faqReply(question) });
    }
    return Response.json({ reply: text });
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error(`Chat API error ${error.status}:`, error.message);
    } else {
      console.error("Chat error:", error);
    }
    return Response.json({ reply: faqReply(question) });
  }
}
