"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi lovely! ✨ I'm the Luxe & Glow assistant. Ask me about prices, treatments, opening hours or booking.",
};

const SUGGESTIONS = ["How much are knotless braids?", "Do you do bridal makeup?", "Are you open on Saturday?"];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || sending) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is client-side only, so it isn't sent.
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error(data.error);
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I couldn't respond just now. Please WhatsApp or call the salon and we'll help you.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Luxe & Glow"
          className="flex h-[min(560px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-hairline bg-ivory shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center gap-3 border-b border-hairline bg-brown px-5 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-champagne-light to-champagne-dark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2 14 9 21 11 14 13 12 20 10 13 3 11 10 9Z" />
              </svg>
            </span>
            <div className="flex-1">
              <p className="font-display text-lg text-ivory">Luxe & Glow Assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-beige">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · AI powered
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-beige transition-colors hover:bg-white/10 hover:text-ivory"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <p
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto w-fit max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-brown px-3.5 py-2.5 text-sm text-ivory"
                    : "w-fit max-w-[90%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-cream px-3.5 py-2.5 text-sm leading-relaxed text-brown"
                }
              >
                {m.content}
              </p>
            ))}
            {sending && (
              <p className="flex w-fit gap-1 rounded-2xl rounded-bl-sm bg-cream px-4 py-3.5" aria-label="Assistant is typing">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="pulse-soft h-1.5 w-1.5 rounded-full bg-champagne" style={{ animationDelay: `${d * 0.2}s` }} />
                ))}
              </p>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-champagne/50 px-3 py-1.5 text-xs text-champagne-dark transition-colors hover:bg-champagne/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-hairline p-3">
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Type your message…"
              className="flex-1 rounded-full border border-hairline bg-white px-4 py-2.5 text-sm text-ink outline-none placeholder:text-brown-soft/50 focus:border-champagne"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brown text-ivory transition-colors hover:bg-champagne-dark disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5 21 12 3 3.5 3 10l12 2-12 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Ask us anything"}
        aria-expanded={open}
        className="flex h-14 items-center gap-2 rounded-full bg-brown px-5 text-sm font-medium tracking-wide text-ivory shadow-[0_12px_30px_rgba(59,42,32,0.35)] transition-colors hover:bg-champagne-dark"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        </svg>
        {!open && <span className="hidden sm:inline">Ask us anything</span>}
      </button>
    </div>
  );
}
