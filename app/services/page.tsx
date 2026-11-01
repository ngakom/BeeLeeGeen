import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { HOURS, PRICE_LISTS, TERMS, formatPrice, type Audience, type Style } from "@/lib/salon";

export const metadata: Metadata = { title: "Services & Prices" };

const SECTIONS: { audience: Audience; heading: React.ReactNode; intro: string }[] = [
  {
    audience: "kids",
    heading: "Kiddies Price List",
    intro: "Neat, gentle styling for little royals.",
  },
  {
    audience: "adults",
    heading: (
      <>
        <span className="font-script block text-4xl font-normal text-pink-dark">Luxury styling</span>
        for Adults Too!
      </>
    ),
    intro: "The same care and neat work for moms, teens and adults.",
  },
];

function PriceCard({ style }: { style: Style }) {
  return (
    <div id={style.id} className="card scroll-mt-28 overflow-hidden">
      <div className="flex items-center gap-5 border-b border-hairline p-5">
        {style.image && (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
            <Image src={style.image} alt={style.name} fill sizes="5rem" className="object-cover" />
          </div>
        )}
        <div>
          <h3 className="font-display text-2xl font-semibold text-purple">{style.name}</h3>
          {style.description && <p className="mt-1 text-sm leading-relaxed text-plum-soft">{style.description}</p>}
        </div>
      </div>
      <ul className="divide-y divide-hairline px-6">
        {style.options.map((o) => (
          <li key={o.label} className="flex items-center justify-between py-3">
            <span className="text-plum">{o.label}</span>
            <span className="font-display text-xl font-semibold text-pink-dark">{formatPrice(o.price)}</span>
          </li>
        ))}
      </ul>
      <div className="px-6 pb-6 pt-2">
        <Link href={`/booking?style=${style.id}`} className="text-sm font-extrabold text-purple underline-offset-4 hover:underline">
          Book {style.name} →
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Price list" title="Services & Prices" intro="Kids first, adults welcome. Walk in, or book ahead to secure your spot." />

      <div className="mx-auto max-w-6xl space-y-20 px-5 py-14 lg:px-10 lg:py-20">
        {SECTIONS.map((sec) => (
          <section key={sec.audience} id={sec.audience} className="scroll-mt-28">
            <div className="text-center">
              <h2 className="font-display text-4xl font-semibold text-purple sm:text-5xl">{sec.heading}</h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-plum-soft">{sec.intro}</p>
            </div>
            {/* Columns keep the cards packed despite their different heights. */}
            <div className="mt-10 gap-6 md:columns-2 [&>*]:mb-6 [&>*]:break-inside-avoid">
              {PRICE_LISTS[sec.audience].map((s) => (
                <PriceCard key={s.id} style={s} />
              ))}
            </div>
          </section>
        ))}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.75rem] bg-plum p-8 text-lilac">
            <h2 className="font-display text-2xl font-semibold text-white">Terms & conditions</h2>
            <ul className="mt-4 space-y-2.5">
              {TERMS.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="text-gold" aria-hidden="true">
                    ♛
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-8">
            <h2 className="font-display text-2xl font-semibold text-purple">Opening hours</h2>
            <ul className="mt-4 space-y-2.5">
              {HOURS.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span className="text-plum">{h.days}</span>
                  <span className="font-bold text-pink-dark">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
