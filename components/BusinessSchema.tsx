import { HOURS, PRICE_LISTS, SALON } from "@/lib/salon";

const DAYS: Record<string, string[]> = {
  "Monday – Friday": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  Saturday: ["Saturday"],
  Sunday: ["Sunday"],
};

const prices = Object.values(PRICE_LISTS)
  .flat()
  .flatMap((s) => s.options.map((o) => o.price))
  .filter((p): p is number => p !== null);

/** Google-readable business details (address, hours, phone) for search results and Maps. */
export default function BusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: `${SALON.name} ${SALON.kind}`,
    description: SALON.tagline,
    url: SALON.url,
    logo: `${SALON.url}/images/logo.png`,
    image: `${SALON.url}/images/work/14.jpg`,
    telephone: `+${SALON.phones[0].intl}`,
    priceRange: `R${Math.min(...prices)} – R${Math.max(...prices)}`,
    paymentAccepted: "EFT",
    address: {
      "@type": "PostalAddress",
      streetAddress: "E689B Mmotong section",
      addressLocality: "Lefisoane",
      addressCountry: "ZA",
    },
    openingHoursSpecification: HOURS.map((h) => {
      const [opens, closes] = h.time.split(" – ");
      return { "@type": "OpeningHoursSpecification", dayOfWeek: DAYS[h.days], opens, closes };
    }),
    sameAs: [SALON.instagram.url, SALON.facebook.url, SALON.tiktok.url],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
