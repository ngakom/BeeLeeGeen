import { HOURS, SALON, SERVICES, TEAM, formatDuration, formatPrice } from "./salon";

const priceList = SERVICES.map((s) => `- ${s.name}: ${formatPrice(s)} (${formatDuration(s.minutes)}) — ${s.description}`).join("\n");
const team = TEAM.map((t) => `- ${t.name}, ${t.role}: ${t.bio}`).join("\n");
const hours = HOURS.map((h) => `- ${h.days}: ${h.time}`).join("\n");

export const SYSTEM_PROMPT = `You are the friendly booking assistant for ${SALON.name} ("${SALON.tagline}"), a beauty salon in ${SALON.area}, South Africa.

Services and prices (South African rand):
${priceList}

Team:
${team}

Opening hours:
${hours}

Contact: ${SALON.phone}, ${SALON.email}. Online booking at /booking; WhatsApp button on the Contact page.
Policies: no deposit needed to book; free cancellation up to 24 hours before; prices for braids and nail art depend on length and design and are confirmed before starting.

Rules:
- Reply warmly in 1-3 short paragraphs of plain text, no markdown headings or tables.
- Quote prices and durations only from the list above. Never invent services, promotions or availability.
- To book, point clients to the "Book Now" button (/booking). You cannot see or change the diary yourself.
- For anything you don't know (e.g. a specific product brand), suggest WhatsApp or calling the salon.
- Stay on salon topics; politely decline anything unrelated.`;

const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["braid", "knotless", "box"],
    answer: "Our knotless braids (medium, waist length) start from R650 and take about 5 hours; box braids start from R550. Hair is included for knotless. Tap \"Book Now\" to choose Thandiwe or Naledi and a time that suits you.",
  },
  {
    keywords: ["nail", "gel", "acrylic", "manicure", "pedicure"],
    answer: "Gel overlay is R250, an acrylic full set R380, gel pedicure R300 and a classic manicure R180. Nail art starts from R30. Lerato, our nail artist, would love to see you — book online any time.",
  },
  {
    keywords: ["makeup", "make-up", "bridal", "bride", "wedding", "matric"],
    answer: "Everyday glam is R450 and special occasion makeup (with lashes) is R650. Our bridal package is R1,800 and includes a trial. For weddings, send us a message on the Contact page so we can reserve the date.",
  },
  {
    keywords: ["facial", "skin", "lash", "brow"],
    answer: "Our Signature Glow Facial is R550. Lashes: classic extensions R450, volume R600, lash lift & tint R350. Brow shape & tint is R150.",
  },
  {
    keywords: ["wig", "silk press", "blow", "treatment", "hair"],
    answer: "Wig install & styling is R450, silk press R380, wash & blow-dry R250 and treatment & steam R300. You can see the full menu on our Services & Pricing page.",
  },
  {
    keywords: ["hour", "open", "close", "time", "sunday", "saturday"],
    answer: "We're open Monday to Friday 08:00–18:00 and Saturday 08:00–16:00. We're closed on Sundays and public holidays.",
  },
  {
    keywords: ["where", "location", "address", "directions", "park"],
    answer: `We're in ${SALON.area}. You'll find a map on our Contact page.`,
  },
  {
    keywords: ["book", "appointment", "available", "slot", "cancel"],
    answer: "You can book online in under a minute — tap \"Book Now\", pick your treatment, stylist and time. No deposit needed, and free cancellation up to 24 hours before.",
  },
  {
    keywords: ["price", "cost", "how much", "rate"],
    answer: "Prices range from R150 (brow shape & tint) to R1,800 (bridal makeup with trial). Tell me which treatment you're interested in, or see the full list on our Services & Pricing page.",
  },
];

/** Keyword answers used when the AI service isn't configured. */
export function faqReply(question: string): string {
  const q = question.toLowerCase();
  const match = FAQ.find((item) => item.keywords.some((k) => q.includes(k)));
  return (
    match?.answer ??
    `Thanks for your message! I can help with prices, treatments, opening hours and booking. For anything else, WhatsApp or call us on ${SALON.phone}.`
  );
}
