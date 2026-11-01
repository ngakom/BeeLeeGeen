// Single source of truth for BeeLeeGeen's details. Edit here when the owner sends updates.

export const SALON = {
  name: "BeeLeeGeen",
  shortName: "BLG",
  kind: "Kiddies Hair Salon",
  tagline: "Luxury Styling for Little Royals",
  adultsLine: "Luxury styling for adults too!",
  motto: "Your beauty is worthy of our time",
  address: "E689B Mmotong section, Lefisoane",
  mapQuery: "Mmotong, Lefisoane",
  phones: [
    { display: "063 379 7842", intl: "27633797842" },
    { display: "079 372 1697", intl: "27793721697" },
  ],
  instagram: { handle: "@beeleegeen", url: "https://www.instagram.com/beeleegeen/" },
  facebook: { handle: "Beeleegeen Mmamphofe", url: "https://www.facebook.com/share/19v1oeELGp/" },
  tiktok: { handle: "BLG Beeleegeen", url: "https://www.tiktok.com/@blgb3el3eg3en" },
};

/** WhatsApp chat with the salon's main number, with the message ready to send. */
export function whatsappLink(message: string, intl = SALON.phones[0].intl) {
  return `https://wa.me/${intl}?text=${encodeURIComponent(message)}`;
}

export const telLink = (intl: string) => `tel:+${intl}`;

// From the owner's business profile.
export const PROFILE = {
  overview:
    "BeeLeeGeen is a kiddies hair salon in Lefisoane where little ones are treated like royalty. We offer children's plaiting, cornrows, braids and hair care with gentle hands and lots of patience — and the same luxury styling for moms and adults too.",
  vision: "To become the most trusted and leading kiddies hair salon.",
  mission: "To provide quality, affordable and child-friendly hairstyling services.",
  goals: ["Customer satisfaction", "Growth", "Excellent service"],
};

export type PriceOption = { label: string; price: number };

export type KidsStyle = { id: string; name: string; description: string; image: string; options: PriceOption[] };

// The owner's kids price list (rand).
export const KIDS_STYLES: KidsStyle[] = [
  {
    id: "knotless-braids",
    name: "Knotless Braids",
    description: "Light, neat knotless braids that are gentle on little heads.",
    image: "/images/work/34.jpg",
    options: [{ label: "Short", price: 250 }, { label: "Long", price: 300 }],
  },
  {
    id: "straight-back",
    name: "Straight Back",
    description: "Classic cornrows plaited neatly straight back.",
    image: "/images/work/18.jpg",
    options: [{ label: "Short", price: 150 }, { label: "Long", price: 180 }],
  },
  {
    id: "straight-up",
    name: "Straight Up",
    description: "Cornrows swept up into a ponytail or bun — perfect for school.",
    image: "/images/work/12.jpg",
    options: [{ label: "Short", price: 180 }, { label: "Long", price: 200 }],
  },
  {
    id: "tribal-braids",
    name: "Tribal Braids",
    description: "Cornrows paired with braids for a bold, beautiful look.",
    image: "/images/work/13.jpg",
    options: [{ label: "Short", price: 200 }, { label: "Long", price: 250 }],
  },
  {
    id: "free-hand",
    name: "Free-Hand",
    description: "Creative freehand cornrow designs — lines, fishbones, pondos and funky patterns.",
    image: "/images/work/14.jpg",
    options: [
      { label: "Straight line", price: 80 },
      { label: "Funky design", price: 100 },
      { label: "1 fishbone", price: 100 },
      { label: "2 fishbone", price: 120 },
      { label: "1 pondo", price: 100 },
      { label: "2 pondo", price: 120 },
    ],
  },
];

export const fromPrice = (s: KidsStyle) => Math.min(...s.options.map((o) => o.price));

export type AdultStyle = { id: string; name: string; description: string; image: string };

// No adult price list yet: quoted per style on WhatsApp.
export const ADULT_STYLES: AdultStyle[] = [
  { id: "adults-cornrows", name: "Cornrow Styles", description: "Straight-back, side-swept and patterned cornrows, with or without extensions.", image: "/images/work/32.jpg" },
  { id: "adults-ponytails", name: "Braided Ponytails & Updos", description: "Sleek cornrow ponytails and buns with long braids or curly ends.", image: "/images/work/16.jpg" },
  { id: "adults-braids", name: "Braids", description: "Knotless and box braids, including colour and boho curly ends.", image: "/images/work/7.jpg" },
];

// The owner's terms and conditions from her price list.
export const TERMS = [
  "Strictly by appointment — no walk-ins.",
  "A booking is only confirmed once payment is received.",
  "Cash in hand is not accepted.",
  "Prices can be negotiable, depending on how big the blocks are.",
  "A complimentary wash is offered.",
];

export type Photo = { src: string; alt: string; style: "Cornrows & Patterns" | "Ponytails & Buns" | "Braids & Beads" };

/** Short id for a gallery photo, used in "book this style" links (e.g. /booking?photo=14). */
export const photoId = (p: Photo) => p.src.split("/").pop()!.replace(".jpg", "");
export const findPhoto = (id: string | null) => PHOTOS.find((p) => photoId(p) === id);
export const bookPhotoHref = (p: Photo) => `/booking?photo=${photoId(p)}`;

export const PHOTOS: Photo[] = [
  { src: "/images/work/14.jpg", alt: "Child with a flower cornrow design", style: "Cornrows & Patterns" },
  { src: "/images/work/35.jpg", alt: "Child's braids finished with pink beads", style: "Braids & Beads" },
  { src: "/images/work/12.jpg", alt: "Child's cornrows swept into a bun", style: "Ponytails & Buns" },
  { src: "/images/work/34.jpg", alt: "Two cornrow ponytails with curly ends", style: "Braids & Beads" },
  { src: "/images/work/16.jpg", alt: "Cornrow ponytail with long curly braids", style: "Ponytails & Buns" },
  { src: "/images/work/33.jpg", alt: "Wavy side cornrows", style: "Cornrows & Patterns" },
  { src: "/images/work/13.jpg", alt: "Child's braided ponytail with curls", style: "Braids & Beads" },
  { src: "/images/work/32.jpg", alt: "Spiral cornrow design", style: "Cornrows & Patterns" },
  { src: "/images/work/7.jpg", alt: "Long knotless braids with copper curly ends", style: "Braids & Beads" },
  { src: "/images/work/3.jpg", alt: "Child's cornrows into a top bun", style: "Ponytails & Buns" },
  { src: "/images/work/11.jpg", alt: "Zigzag cornrow pattern", style: "Cornrows & Patterns" },
  { src: "/images/work/37.jpg", alt: "Child's swirl cornrows into a curly ponytail", style: "Ponytails & Buns" },
  { src: "/images/work/20.jpg", alt: "Cornrows with rosette buns", style: "Cornrows & Patterns" },
  { src: "/images/work/19.jpg", alt: "High ponytail with curly braids", style: "Ponytails & Buns" },
  { src: "/images/work/8.jpg", alt: "Side-swept cornrows with ombré ends", style: "Braids & Beads" },
  { src: "/images/work/18.jpg", alt: "Child's curved cornrows", style: "Cornrows & Patterns" },
  { src: "/images/work/30.jpg", alt: "Cornrow updo with long braids", style: "Ponytails & Buns" },
  { src: "/images/work/9.jpg", alt: "Curved cornrows", style: "Cornrows & Patterns" },
  { src: "/images/work/4.jpg", alt: "Child's cornrows into a side bun", style: "Ponytails & Buns" },
  { src: "/images/work/21.jpg", alt: "Wavy cornrows with curly back", style: "Cornrows & Patterns" },
  { src: "/images/work/10.jpg", alt: "Cornrow ponytail", style: "Ponytails & Buns" },
  { src: "/images/work/29.jpg", alt: "Swirl cornrows with a loop detail", style: "Cornrows & Patterns" },
  { src: "/images/work/17.jpg", alt: "Back view of a cornrow design", style: "Cornrows & Patterns" },
  { src: "/images/work/31.jpg", alt: "Swirl cornrows into a ponytail", style: "Ponytails & Buns" },
];
