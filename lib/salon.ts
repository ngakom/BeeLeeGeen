// Single source of truth for the demo salon's details. Edit here to rebrand the site for a real client.

export const SALON = {
  name: "Luxe & Glow Beauty Studio",
  shortName: "Luxe & Glow",
  tagline: "Where Beauty Meets Elegance",
  area: "Menlyn, Pretoria",
  // Demo contact details — replace with the client's real ones.
  phone: "+27 12 000 0000",
  email: "hello@luxeglow-demo.co.za",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  tiktok: "https://www.tiktok.com/",
  mapQuery: "Menlyn, Pretoria",
};

// The demo has no real WhatsApp number, so links open WhatsApp with the message ready to send to any chat.
export function whatsappLink(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export const HOURS = [
  { days: "Monday – Friday", time: "08:00 – 18:00" },
  { days: "Saturday", time: "08:00 – 16:00" },
  { days: "Sunday & public holidays", time: "Closed" },
];

// Opening hours used by the booking calendar (0 = Sunday).
export const OPEN_HOURS: Record<number, [number, number] | null> = {
  0: null,
  1: [8, 18],
  2: [8, 18],
  3: [8, 18],
  4: [8, 18],
  5: [8, 18],
  6: [8, 16],
};

export type CategoryId = "hair" | "nails" | "makeup" | "skin";

export const CATEGORIES: {
  id: CategoryId;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    id: "hair",
    title: "Hair Styling",
    summary: "Braids, wigs, treatments and styling.",
    image: "/images/hair-braiding.jpg",
    imageAlt: "Stylist braiding a client's hair",
  },
  {
    id: "nails",
    title: "Nail Treatments",
    summary: "Gel nails, acrylics, manicures and pedicures.",
    image: "/images/nails-client.jpg",
    imageAlt: "Smiling client during a manicure",
  },
  {
    id: "makeup",
    title: "Makeup Services",
    summary: "Bridal, special occasion and everyday glam.",
    image: "/images/makeup-artist.jpg",
    imageAlt: "Makeup artist applying eyeliner",
  },
  {
    id: "skin",
    title: "Beauty & Skincare",
    summary: "Facials, brows, lashes and skincare treatments.",
    image: "/images/skincare-facial.jpg",
    imageAlt: "Client receiving a facial serum treatment",
  },
];

export type Service = {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  price: number;
  priceFrom?: boolean;
  minutes: number;
  popular?: boolean;
};

export const SERVICES: Service[] = [
  // Hair
  { id: "knotless-braids", category: "hair", name: "Knotless Braids (medium)", description: "Lightweight, natural-looking braids, waist length. Hair included.", price: 650, priceFrom: true, minutes: 300, popular: true },
  { id: "box-braids", category: "hair", name: "Box Braids", description: "Classic box braids in your choice of length and size.", price: 550, priceFrom: true, minutes: 240 },
  { id: "wig-install", category: "hair", name: "Wig Install & Styling", description: "Frontal or closure install with plucking, bleaching and styling.", price: 450, minutes: 120, popular: true },
  { id: "silk-press", category: "hair", name: "Silk Press", description: "Wash, deep condition and a sleek, bouncy silk press on natural hair.", price: 380, minutes: 120 },
  { id: "wash-blowdry", category: "hair", name: "Wash & Blow-dry", description: "Cleanse, condition and a smooth blow-dry finish.", price: 250, minutes: 60 },
  { id: "hair-treatment", category: "hair", name: "Treatment & Steam", description: "Restorative protein or moisture treatment with steam.", price: 300, minutes: 60 },
  // Nails
  { id: "gel-overlay", category: "nails", name: "Gel Overlay", description: "Strengthening gel on natural nails, any colour.", price: 250, minutes: 60, popular: true },
  { id: "acrylic-set", category: "nails", name: "Acrylic Full Set", description: "Sculpted acrylic extensions in your chosen shape and length.", price: 380, minutes: 90 },
  { id: "gel-pedicure", category: "nails", name: "Gel Pedicure", description: "Soak, scrub, cuticle care, massage and long-lasting gel colour.", price: 300, minutes: 75 },
  { id: "classic-manicure", category: "nails", name: "Classic Manicure", description: "Shape, cuticle care, hand massage and polish.", price: 180, minutes: 45 },
  { id: "nail-art", category: "nails", name: "Nail Art", description: "Chrome, French, ombré, gems and hand-painted designs.", price: 30, priceFrom: true, minutes: 30 },
  // Makeup
  { id: "everyday-glam", category: "makeup", name: "Everyday Glam", description: "Soft, polished makeup for work, dinner or photos.", price: 450, minutes: 60 },
  { id: "occasion-makeup", category: "makeup", name: "Special Occasion Makeup", description: "Full glam with lashes for matric dance, parties and events.", price: 650, minutes: 75, popular: true },
  { id: "bridal-makeup", category: "makeup", name: "Bridal Makeup (incl. trial)", description: "Trial session plus long-wear bridal makeup on your big day.", price: 1800, minutes: 120 },
  // Skin, brows & lashes
  { id: "signature-facial", category: "skin", name: "Signature Glow Facial", description: "Deep cleanse, exfoliation, mask and hydrating serum for radiant skin.", price: 550, minutes: 60, popular: true },
  { id: "brow-shape-tint", category: "skin", name: "Brow Shape & Tint", description: "Wax or thread shaping with a custom tint.", price: 150, minutes: 30 },
  { id: "classic-lashes", category: "skin", name: "Classic Lash Extensions", description: "One extension per natural lash for a natural, defined look.", price: 450, minutes: 90 },
  { id: "volume-lashes", category: "skin", name: "Volume Lash Extensions", description: "Fluffy, full lashes using handmade fans.", price: 600, minutes: 120 },
  { id: "lash-lift", category: "skin", name: "Lash Lift & Tint", description: "Lifts and darkens your natural lashes for up to 8 weeks.", price: 350, minutes: 60 },
];

export type Stylist = {
  id: string;
  name: string;
  role: string;
  bio: string;
  categories: CategoryId[];
};

// Fictional team for the demo.
export const TEAM: Stylist[] = [
  { id: "naledi", name: "Naledi M.", role: "Founder & Creative Director", bio: "Twelve years of hair artistry, from silk presses to editorial styling.", categories: ["hair"] },
  { id: "thandiwe", name: "Thandiwe K.", role: "Senior Braider", bio: "Known for flawless knotless braids and gentle, tension-free installs.", categories: ["hair"] },
  { id: "lerato", name: "Lerato S.", role: "Nail Artist", bio: "Gel, acrylic and hand-painted nail art with an eye for detail.", categories: ["nails"] },
  { id: "zanele", name: "Zanele D.", role: "Makeup & Lash Artist", bio: "Bridal and occasion glam that lasts from first look to last dance.", categories: ["makeup", "skin"] },
  { id: "ayanda", name: "Ayanda P.", role: "Skin Therapist", bio: "Qualified therapist specialising in facials and skin health.", categories: ["skin"] },
];

export const formatPrice = (s: Pick<Service, "price" | "priceFrom">) =>
  `${s.priceFrom ? "from " : ""}R${s.price.toLocaleString("en-ZA")}`;

export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return [h ? `${h}h` : "", m ? `${m}min` : ""].filter(Boolean).join(" ");
};
