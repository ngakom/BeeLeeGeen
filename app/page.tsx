import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, SALON, SERVICES, formatPrice, formatDuration } from "@/lib/salon";

const PROMISES = [
  { title: "Expert Professionals", text: "Qualified stylists, nail artists and therapists who keep up with every trend." },
  { title: "Premium Products", text: "Salon-grade, skin-loving products chosen for lasting, healthy results." },
  { title: "Book in Seconds", text: "Choose your service, stylist and time online — day or night." },
];

const REVIEWS = [
  { quote: "My knotless braids were neat, light and done on time. The studio is so calm and beautiful.", name: "Palesa", service: "Knotless Braids" },
  { quote: "Zanele did my bridal makeup and I felt like the best version of myself all day.", name: "Kgomotso", service: "Bridal Makeup" },
  { quote: "Booking online took a minute and my gel nails lasted three weeks. I'm hooked!", name: "Refilwe", service: "Gel Overlay" },
];

export default function Home() {
  const popular = SERVICES.filter((s) => s.popular);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
          <div className="fade-up order-2 lg:order-1">
            <p className="eyebrow">{SALON.area}</p>
            <h1 className="font-display mt-5 text-5xl font-medium leading-[1.05] text-brown sm:text-6xl lg:text-7xl">
              Where Beauty <br />
              Meets <span className="italic text-champagne-dark">Elegance</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-brown-soft">
              Hair, nails, makeup and skincare in a calm, luxurious studio. Look and feel your best — book your
              appointment online in under a minute.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/booking" className="btn-gold">
                Book Now
              </Link>
              <Link href="/services" className="btn-outline">
                View Prices
              </Link>
            </div>
            <dl className="mt-12 flex gap-10 border-t border-hairline pt-8">
              {[
                ["4.9★", "Client rating"],
                ["12+", "Years of artistry"],
                ["20+", "Treatments"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-semibold text-brown">{v}</dt>
                  <dd className="mt-1 text-xs tracking-wide text-brown-soft">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-[0_30px_80px_rgba(59,42,32,0.25)]">
              <Image
                src="/images/hero-portrait.jpg"
                alt="Woman with radiant, glowing skin"
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-2 rounded-2xl bg-ivory/95 px-5 py-4 shadow-xl backdrop-blur sm:left-8">
              <p className="eyebrow !text-[0.6rem]">Next available</p>
              <p className="font-display mt-1 text-xl font-semibold text-brown">Today · 14:30</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center lg:py-24">
        <p className="eyebrow">Welcome</p>
        <h2 className="font-display mt-4 text-4xl font-medium text-brown sm:text-5xl">Beauty, confidence &amp; relaxation</h2>
        <div className="gold-rule mx-auto mt-6" />
        <p className="mt-6 leading-relaxed text-brown-soft">
          Whether you&apos;re preparing for a special occasion or simply treating yourself to some well-deserved self-care,
          Luxe &amp; Glow is your destination for personalised beauty experiences — delivered by talented professionals in a
          welcoming, luxurious space.
        </p>
      </section>

      {/* Service categories */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/services#${c.id}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-medium text-ivory">{c.title}</h3>
                  <p className="mt-1 text-sm text-beige">{c.summary}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular services */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <div className="text-center">
            <p className="eyebrow">Client favourites</p>
            <h2 className="font-display mt-4 text-4xl font-medium text-brown sm:text-5xl">Popular Treatments</h2>
            <div className="gold-rule mx-auto mt-6" />
          </div>
          <ul className="mt-12 divide-y divide-hairline">
            {popular.map((s) => (
              <li key={s.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                <div>
                  <p className="font-display text-2xl text-brown">{s.name}</p>
                  <p className="text-sm text-brown-soft">{formatDuration(s.minutes)}</p>
                </div>
                <div className="flex items-center gap-5">
                  <span className="font-display text-2xl font-semibold text-champagne-dark">{formatPrice(s)}</span>
                  <Link href={`/booking?service=${s.id}`} className="text-xs uppercase tracking-[0.2em] text-brown underline-offset-4 hover:underline">
                    Book
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-outline">
              Full Price List
            </Link>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image src="/images/nail-technician.jpg" alt="Nail technician working on a client's nails" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow">Why Luxe &amp; Glow</p>
          <h2 className="font-display mt-4 text-4xl font-medium text-brown sm:text-5xl">Personalised care, every visit</h2>
          <div className="mt-10 space-y-8">
            {PROMISES.map((p, i) => (
              <div key={p.title} className="flex gap-5">
                <span className="font-display text-3xl italic text-champagne">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-medium text-brown">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-brown-soft">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-brown py-20 text-ivory lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center">
            <p className="eyebrow !text-champagne-light">Kind words</p>
            <h2 className="font-display mt-4 text-4xl font-medium sm:text-5xl">Loved by our clients</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <p className="text-champagne-light" aria-label="5 stars">★★★★★</p>
                <blockquote className="font-display mt-4 text-xl italic leading-relaxed text-beige">“{r.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-ivory">{r.name}</span>
                  <span className="text-beige/60"> · {r.service}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center lg:py-24">
        <h2 className="font-display text-4xl font-medium text-brown sm:text-5xl">Ready to glow?</h2>
        <p className="mt-5 text-brown-soft">Pick a treatment, choose your favourite stylist and secure your slot in seconds.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/booking" className="btn-gold">
            Book an Appointment
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
