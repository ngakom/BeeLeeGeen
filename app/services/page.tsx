import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { ADULT_STYLES, KIDS_STYLES, TERMS, whatsappLink } from "@/lib/salon";

export const metadata: Metadata = { title: "Services & Prices" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Kids price list"
        title="Services & Prices"
        intro="Neat, gentle styling for little royals — every kids' style comes with a complimentary wash."
      />

      <div className="mx-auto max-w-6xl space-y-20 px-5 py-14 lg:px-10 lg:py-20">
        <section id="kids">
          <div className="grid gap-6 md:grid-cols-2">
            {KIDS_STYLES.map((s) => (
              <div key={s.id} id={s.id} className="card scroll-mt-28 overflow-hidden">
                <div className="flex items-center gap-5 border-b border-hairline p-5">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                    <Image src={s.image} alt={s.name} fill sizes="6rem" className="object-cover" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-purple">{s.name}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-plum-soft">{s.description}</p>
                  </div>
                </div>
                <ul className="divide-y divide-hairline px-6">
                  {s.options.map((o) => (
                    <li key={o.label} className="flex items-center justify-between py-3">
                      <span className="text-plum">{o.label}</span>
                      <span className="font-display text-xl font-semibold text-pink-dark">R{o.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="px-6 pb-6 pt-2">
                  <Link href={`/booking?style=${s.id}`} className="text-sm font-extrabold text-purple underline-offset-4 hover:underline">
                    Book {s.name} →
                  </Link>
                </div>
              </div>
            ))}

            <div className="self-start rounded-[1.75rem] bg-plum p-8 text-lilac">
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
          </div>
        </section>

        <section id="adults" className="scroll-mt-28">
          <div className="text-center">
            <p className="font-script text-4xl text-pink-dark">Luxury styling</p>
            <h2 className="font-display mt-1 text-4xl font-semibold text-purple sm:text-5xl">for Adults Too!</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-plum-soft">
              Adult prices depend on the style, size and length — WhatsApp us a picture for a quote.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ADULT_STYLES.map((s) => (
              <div key={s.id} className="card overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={s.image} alt={s.name} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-purple">{s.name}</h3>
                  <p className="mt-2 leading-relaxed text-plum-soft">{s.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold text-pink-dark">Price on request</span>
                    <Link href={`/booking?style=${s.id}`} className="text-sm font-extrabold text-purple underline-offset-4 hover:underline">
                      Book this →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={whatsappLink("Hi BeeLeeGeen! How much would this style cost? (I'll attach a picture)")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <WhatsAppIcon /> Get an adult quote on WhatsApp
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
