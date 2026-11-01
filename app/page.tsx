import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { HOURS, PHOTOS, PRICE_LISTS, PROFILE, SALON, bookPhotoHref, fromPrice, whatsappLink } from "@/lib/salon";

// Styles with a photo make the home page cards; hair care and unplaiting stay on the price list.
const KIDS_CARDS = PRICE_LISTS.kids.filter((s) => s.image);

const WHY = [
  { emoji: "👑", title: "Child-friendly", text: "Patient, gentle hands and a fun, welcoming space so little ones feel like royalty." },
  { emoji: "✨", title: "Quality styling", text: "Neat partings, clean cornrows and creative designs that last." },
  { emoji: "💜", title: "Affordable", text: "Kids' free-hand styles from just R80 — and walk-ins are welcome." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="sparkles relative overflow-hidden bg-gradient-to-br from-lilac via-blush to-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:px-10 lg:py-16">
          <div className="fade-up text-center lg:text-left">
            <Logo className="float mx-auto h-44 w-auto sm:h-52 lg:mx-0" />
            <p className="eyebrow mt-6">{SALON.kind} · Lefisoane</p>
            <h1 className="font-display mt-3 text-5xl font-semibold leading-[1.05] text-purple sm:text-6xl">
              Luxury styling for <span className="text-pink-dark">little royals</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-plum-soft lg:mx-0">
              Plaiting, cornrows, braids and hair care for children — done with love, patience and a lot of style.
            </p>
            <p className="font-script mt-3 text-3xl text-pink-dark">…and for adults too!</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href={whatsappLink("Hi BeeLeeGeen! I'd like to book a hairstyle.")} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <WhatsAppIcon /> Book on WhatsApp
              </a>
              <Link href="/gallery" className="btn-secondary">
                See our work
              </Link>
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
            {["/images/work/14.jpg", "/images/work/35.jpg", "/images/work/13.jpg", "/images/work/12.jpg"].map((src, i) => (
              <div
                key={src}
                className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white shadow-xl ${i % 2 ? "translate-y-8" : ""}`}
              >
                <Image src={src} alt={PHOTOS.find((p) => p.src === src)?.alt ?? ""} fill priority={i < 2} sizes="(min-width: 1024px) 16rem, 45vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="eyebrow">Welcome to BeeLeeGeen</p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-purple sm:text-5xl">Where every child is a little royal</h2>
        <p className="mt-6 text-lg leading-relaxed text-plum-soft">{PROFILE.overview}</p>
      </section>

      {/* Kids services */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">For little royals</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-purple sm:text-5xl">Kiddies Styles</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
          {KIDS_CARDS.map((s) => (
            <Link key={s.id} href={`/services#${s.id}`} className="card group overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <Image src={s.image!} alt={s.name} fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-extrabold text-pink-dark shadow">
                  from R{fromPrice(s)}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-purple">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-plum-soft">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-secondary">
            Full price list
          </Link>
        </div>
      </section>

      {/* Adults too */}
      <section className="bg-plum text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <div className="text-center lg:text-left">
            <p className="font-script text-4xl text-gold">Luxury styling</p>
            <h2 className="font-display mt-1 text-5xl font-semibold">for Adults Too!</h2>
            <p className="mt-5 text-lg leading-relaxed text-lilac">
              Moms, sisters and aunties — sit back and let us do your cornrows, braided ponytails and braids with the same care we give our little clients.
            </p>
            <Link href="/services#adults" className="btn-primary mt-8">
              Adult styles
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["/images/work/32.jpg", "/images/work/16.jpg", "/images/work/7.jpg"].map((src) => (
              <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src={src} alt={PHOTOS.find((p) => p.src === src)?.alt ?? ""} fill sizes="(min-width: 1024px) 14rem, 30vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why parents choose us */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">Why parents choose us</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-purple sm:text-5xl">Happy kids, happy parents</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {WHY.map((w) => (
            <div key={w.title} className="card p-8 text-center">
              <span className="text-5xl" aria-hidden="true">
                {w.emoji}
              </span>
              <h3 className="font-display mt-4 text-2xl font-semibold text-purple">{w.title}</h3>
              <p className="mt-2 leading-relaxed text-plum-soft">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-lilac/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center">
            <p className="eyebrow">Our work</p>
            <h2 className="font-display mt-3 text-4xl font-semibold text-purple sm:text-5xl">Fresh from the chair</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {PHOTOS.slice(4, 12).map((p) => (
              <Link
                key={p.src}
                href={bookPhotoHref(p)}
                aria-label={`Book this style: ${p.alt}`}
                className="group relative aspect-square overflow-hidden rounded-3xl"
              >
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 22vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-2 bottom-2 rounded-full bg-white/95 py-1.5 text-center text-xs font-extrabold text-purple shadow transition-colors group-hover:bg-pink group-hover:text-white sm:text-sm">
                  Book this style
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/gallery" className="btn-secondary">
              View full gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="font-display text-4xl font-semibold text-purple sm:text-5xl">Ready for a royal hairdo?</h2>
        <p className="mt-4 text-lg text-plum-soft">Walk in, or book ahead to secure your spot — we&apos;re open 7 days a week.</p>
        <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left">
          {HOURS.map((h) => (
            <li key={h.days} className="flex justify-between rounded-full bg-lilac px-5 py-2.5 font-bold text-plum">
              <span>{h.days}</span>
              <span className="text-pink-dark">{h.time}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/booking" className="btn-primary">
            Book an appointment
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
