import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CATEGORIES, SERVICES, formatDuration, formatPrice } from "@/lib/salon";

export const metadata: Metadata = { title: "Services & Pricing" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Menu"
        title="Services & Pricing"
        intro="Transparent pricing in rand. Final prices may vary with hair length, nail length or add-ons — we'll always confirm before we start."
      />

      <nav className="sticky top-[118px] z-30 border-b border-hairline bg-ivory/90 backdrop-blur" aria-label="Service categories">
        <div className="mx-auto flex max-w-5xl justify-start gap-6 overflow-x-auto px-5 py-3 text-sm sm:justify-center lg:px-10">
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="whitespace-nowrap text-brown hover:text-champagne-dark">
              {c.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-5xl space-y-20 px-5 py-16 lg:px-10 lg:py-20">
        {CATEGORIES.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-44">
            <div className="grid items-center gap-8 sm:grid-cols-[180px_1fr]">
              <div className="relative aspect-square overflow-hidden rounded-full">
                <Image src={c.image} alt={c.imageAlt} fill sizes="180px" className="object-cover" />
              </div>
              <div>
                <h2 className="font-display text-4xl font-medium text-brown sm:text-5xl">{c.title}</h2>
                <p className="mt-2 text-brown-soft">{c.summary}</p>
              </div>
            </div>
            <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
              {SERVICES.filter((s) => s.category === c.id).map((s) => (
                <li key={s.id} className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
                  <div>
                    <h3 className="font-display text-2xl text-brown">
                      {s.name}
                      {s.popular && (
                        <span className="ml-3 rounded-full bg-champagne/15 px-2.5 py-0.5 align-middle font-sans text-[0.65rem] uppercase tracking-[0.15em] text-champagne-dark">
                          Popular
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-brown-soft">{s.description}</p>
                    <p className="mt-1 text-xs text-brown-soft/80">{formatDuration(s.minutes)}</p>
                  </div>
                  <div className="flex items-center gap-5 sm:justify-end">
                    <span className="font-display text-2xl font-semibold text-champagne-dark">{formatPrice(s)}</span>
                    <Link href={`/booking?service=${s.id}`} className="btn-outline !px-5 !py-2 !text-[0.7rem]">
                      Book
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
