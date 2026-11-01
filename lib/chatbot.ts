import { ADULT_STYLES, KIDS_STYLES, PROFILE, SALON, TERMS } from "./salon";

const kidsPrices = KIDS_STYLES.map((s) => `- ${s.name}: ${s.options.map((o) => `${o.label} R${o.price}`).join(", ")}`).join("\n");
const adults = ADULT_STYLES.map((s) => `- ${s.name}: ${s.description}`).join("\n");
const phones = SALON.phones.map((p) => p.display).join(" or ");
const bookingPhone = SALON.phones[0].display;

export const SYSTEM_PROMPT = `You are the friendly assistant for ${SALON.name}, a ${SALON.kind.toLowerCase()} in ${SALON.address}, South Africa. Tagline: "${SALON.tagline}". The salon specialises in children's hair and also styles adults.

About: ${PROFILE.overview}
Vision: ${PROFILE.vision}
Mission: ${PROFILE.mission}

Kids price list (rand):
${kidsPrices}

Adult styles (price on request — client sends a picture on WhatsApp for a quote):
${adults}

Terms:
${TERMS.map((t) => `- ${t}`).join("\n")}

Bookings: strictly by appointment. Clients book with the "Book Now" form (/booking), which sends a WhatsApp message to ${bookingPhone}, or call/WhatsApp ${phones}. Payment details are sent on WhatsApp.
Social media: Instagram ${SALON.instagram.handle}, Facebook "${SALON.facebook.handle}", TikTok "${SALON.tiktok.handle}".

Rules:
- Reply warmly in 1-3 short paragraphs of plain text, no markdown headings or tables. You may use an occasional 👑 or 💜.
- Quote kids prices only from the list above. Adult prices, opening hours and availability are not known — point to WhatsApp.
- Never invent services, staff names or promotions.
- Stay on salon topics; politely decline anything unrelated.`;

const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["adult", "mom", "mother", "myself", "grown"],
    answer: `Yes! We're a kiddies salon, but we do luxury styling for adults too — cornrows, braided ponytails and braids. Adult prices depend on the style, so WhatsApp a picture to ${bookingPhone} for a quote.`,
  },
  {
    keywords: ["knotless"],
    answer: "Kids' knotless braids are R250 (short) or R300 (long), with a complimentary wash 👑",
  },
  {
    keywords: ["tribal"],
    answer: "Kids' tribal braids are R200 (short) or R250 (long).",
  },
  {
    keywords: ["straight back"],
    answer: "Kids' straight back cornrows are R150 (short) or R180 (long).",
  },
  {
    keywords: ["straight up", "ponytail", "bun"],
    answer: "Kids' straight up cornrows are R180 (short) or R200 (long).",
  },
  {
    keywords: ["free-hand", "freehand", "free hand", "fishbone", "fish bone", "pondo", "design", "line"],
    answer: "Free-hand designs: straight line R80, funky design R100, 1 fishbone R100, 2 fishbone R120, 1 pondo R100, 2 pondo R120.",
  },
  {
    keywords: ["price", "cost", "how much", "rate", "quote", "r"],
    answer:
      "Kids' styles: straight back from R150, straight up from R180, tribal braids from R200, knotless braids from R250, and free-hand designs from R80. Every kids' style comes with a complimentary wash. See the full list on our Services page 💜",
  },
  {
    keywords: ["pay", "deposit", "cash", "eft", "walk"],
    answer: `We work strictly by appointment — no walk-ins. Your booking is confirmed once payment is received, and cash in hand isn't accepted. We'll send payment details on WhatsApp (${bookingPhone}).`,
  },
  {
    keywords: ["book", "appointment", "available", "slot", "when"],
    answer: `We work strictly by appointment. Tap "Book Now" to send your request on WhatsApp to ${bookingPhone}, and we'll confirm your time and payment details.`,
  },
  {
    keywords: ["where", "address", "location", "directions"],
    answer: `We're at ${SALON.address}. There's a map on our Contact page.`,
  },
  {
    keywords: ["hour", "open", "close", "sunday", "saturday", "time"],
    answer: `We work by appointment, so please WhatsApp ${phones} to find a time that suits you.`,
  },
  {
    keywords: ["cornrow", "plait", "braid", "bead", "ponytail", "bun", "style", "hair care", "wash"],
    answer: "We do children's plaiting, cornrows and patterns, plaited ponytails and buns, braids with beads or curls, and hair care. Have a look at our Gallery for ideas! 👑",
  },
];

/** Keyword answers used when the AI service isn't configured. */
export function faqReply(question: string): string {
  const q = ` ${question.toLowerCase()} `;
  const match = FAQ.find((item) => item.keywords.some((k) => (k.length < 3 ? q.includes(` ${k} `) : q.includes(k))));
  return (
    match?.answer ??
    `Thanks for your message! I can help with our styles, bookings and location. For anything else, WhatsApp or call us on ${phones} 💜`
  );
}
