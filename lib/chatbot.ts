import { HOURS, PRICE_LISTS, PROFILE, SALON, TERMS, formatPrice, fromPrice, type Audience } from "./salon";

const priceList = (a: Audience) =>
  PRICE_LISTS[a].map((s) => `- ${s.name}: ${s.options.map((o) => `${o.label} ${o.price === null ? "(price on request)" : formatPrice(o.price)}`).join(", ")}`).join("\n");
const hours = HOURS.map((h) => `${h.days} ${h.time}`).join("; ");
const phones = SALON.phones.map((p) => p.display).join(" or ");
const bookingPhone = SALON.phones[0].display;

export const SYSTEM_PROMPT = `You are the friendly assistant for ${SALON.name}, a ${SALON.kind.toLowerCase()} run by ${SALON.owner} at ${SALON.address}, South Africa. Tagline: "${SALON.tagline}". The salon specialises in children's hair and also styles adults.

About: ${PROFILE.overview}
Vision: ${PROFILE.vision}
Mission: ${PROFILE.mission}

Kids price list (rand):
${priceList("kids")}

Adults price list (rand; "Ask us" means quoted on request):
${priceList("adults")}

Opening hours: ${hours}.
Terms:
${TERMS.map((t) => `- ${t}`).join("\n")}

Bookings: walk-ins are allowed, but booking secures a spot. Clients book with the "Book Now" form (/booking), which sends a WhatsApp message to ${bookingPhone}, or call/WhatsApp ${phones}. Payment details are sent on WhatsApp.
Social media: Instagram ${SALON.instagram.handle}, Facebook "${SALON.facebook.handle}", TikTok "${SALON.tiktok.handle}".

Rules:
- Reply warmly in 1-3 short paragraphs of plain text, no markdown headings or tables. You may use an occasional 👑 or 💜.
- Quote prices and hours only from the lists above. If a price says "Ask us", point to WhatsApp.
- Never invent services, staff, promotions or availability.
- Stay on salon topics; politely decline anything unrelated.`;

/** "Knotless braids: kids R250 (short) / R300 (long); adults R300 (short) / R400 (long)." built from the price lists. */
function priceAnswer(name: string) {
  const parts = (["kids", "adults"] as const).flatMap((a) => {
    const s = PRICE_LISTS[a].find((x) => x.name === name);
    if (!s) return [];
    const opts = s.options.map((o) => (s.options.length === 1 ? formatPrice(o.price) : `${formatPrice(o.price)} (${o.label.toLowerCase()})`));
    return [`${a === "kids" ? "kids" : "adults"} ${opts.join(" / ")}`];
  });
  return `${name}: ${parts.join("; ")}.`;
}

const FAQ: { keywords: string[]; answer: string }[] = [
  { keywords: ["knotless"], answer: `${priceAnswer("Knotless Braids")} 👑` },
  { keywords: ["tribal"], answer: priceAnswer("Tribal Braids") },
  { keywords: ["straight back"], answer: priceAnswer("Straight Back") },
  { keywords: ["straight up", "ponytail", "bun"], answer: priceAnswer("Straight Up") },
  { keywords: ["ben", "betty"], answer: priceAnswer("Ben & Betty") },
  { keywords: ["unplait", "take out", "remove"], answer: `Unplaiting is ${formatPrice(PRICE_LISTS.kids.find((s) => s.name === "Unplaiting")!.options[0].price)}.` },
  {
    keywords: ["free-hand", "freehand", "free hand", "fishbone", "fish bone", "pondo", "design", "line"],
    answer: `Free hand designs: ${PRICE_LISTS.kids.find((s) => s.name === "Free Hand")!.options.map((o) => `${o.label} ${o.price === null ? "(price on request)" : formatPrice(o.price)}`).join(", ")}.`,
  },
  {
    keywords: ["wash", "blow", "treatment", "relax", "restore", "hair care"],
    answer: `Hair care — kids: ${PRICE_LISTS.kids.find((s) => s.name === "Hair Care")!.options.map((o) => `${o.label} ${o.price === null ? "(price on request)" : formatPrice(o.price)}`).join(", ")}. Adults: ${PRICE_LISTS.adults.find((s) => s.name === "Hair Care")!.options.map((o) => `${o.label} ${o.price === null ? "(price on request)" : formatPrice(o.price)}`).join(", ")}.`,
  },
  {
    keywords: ["adult", "mom", "mother", "myself", "grown"],
    answer: `Yes! We're a kiddies salon, but we do luxury styling for adults too — knotless and tribal braids, straight up, straight back, Ben & Betty and free hand designs. See the adult prices on our Services page.`,
  },
  {
    keywords: ["price", "cost", "how much", "rate", "quote", "r"],
    answer: `Kids' styles: ${PRICE_LISTS.kids.filter((s) => s.image).map((s) => `${s.name.toLowerCase()} from R${fromPrice(s)}`).join(", ")}. Unplaiting is R50 and a wash is R40. See the full kids and adults price lists on our Services page 💜`,
  },
  { keywords: ["hour", "open", "close", "sunday", "saturday", "time", "today"], answer: `We're open ${hours}.` },
  {
    keywords: ["pay", "deposit", "cash", "eft", "card"],
    answer: `Your booking is confirmed once payment is received, and cash in hand isn't accepted. We'll send payment details on WhatsApp (${bookingPhone}).`,
  },
  {
    keywords: ["walk", "book", "appointment", "available", "slot", "when"],
    answer: `Walk-ins are welcome! To secure your spot, tap "Book Now" to send your request on WhatsApp to ${bookingPhone}, and we'll confirm your time and payment details.`,
  },
  { keywords: ["where", "address", "location", "directions"], answer: `We're at ${SALON.address}. There's a map on our Contact page.` },
  {
    keywords: ["cornrow", "plait", "braid", "bead", "style"],
    answer: "We do knotless and tribal braids, straight up and straight back cornrows, and free hand designs for kids and adults. Have a look at our Gallery for ideas! 👑",
  },
];

/** Keyword answers used when the AI service isn't configured. */
export function faqReply(question: string): string {
  const q = ` ${question.toLowerCase()} `;
  const match = FAQ.find((item) => item.keywords.some((k) => (k.length < 3 ? q.includes(` ${k} `) : q.includes(k))));
  return (
    match?.answer ??
    `Thanks for your message! I can help with our prices, hours and bookings. For anything else, WhatsApp or call us on ${phones} 💜`
  );
}
