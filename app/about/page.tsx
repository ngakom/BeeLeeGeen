import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { TEAM } from "@/lib/salon";

export const metadata: Metadata = { title: "About Us" };

const VALUES = [
  { title: "Care", text: "Every client is welcomed, listened to and treated with gentle, unhurried attention." },
  { title: "Craft", text: "We invest in training so our techniques — and results — stay ahead of the trends." },
  { title: "Hygiene", text: "Sterilised tools, fresh linen and hospital-grade cleaning between every appointment." },
  { title: "Confidence", text: "We celebrate natural beauty and help you leave feeling like your best self." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title="About Luxe & Glow" intro="Where beauty, confidence and relaxation come together." />

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image src="/images/salon-interior.jpg" alt="Bright, modern salon interior with styling stations" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
        </div>
        <div className="space-y-5 leading-relaxed text-brown-soft">
          <p className="eyebrow">Welcome</p>
          <h2 className="font-display text-4xl font-medium text-brown sm:text-5xl">A modern studio for every kind of beautiful</h2>
          <p>
            Welcome to Luxe &amp; Glow Beauty Studio, where beauty, confidence, and relaxation come together.
          </p>
          <p>
            We are a modern beauty salon dedicated to helping every client look and feel their best. Our talented beauty
            professionals provide exceptional hair, nail, makeup, and beauty treatments in a welcoming and luxurious
            environment.
          </p>
          <p>
            Whether you&apos;re preparing for a special occasion or simply treating yourself to some well-deserved self-care,
            Luxe &amp; Glow Beauty Studio is your destination for personalised beauty experiences.
          </p>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center">
            <p className="eyebrow">What we stand for</p>
            <h2 className="font-display mt-4 text-4xl font-medium text-brown sm:text-5xl">Our Values</h2>
            <div className="gold-rule mx-auto mt-6" />
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-3xl bg-ivory p-8 text-center">
                <h3 className="font-display text-2xl text-brown">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brown-soft">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="text-center">
          <p className="eyebrow">The artists</p>
          <h2 className="font-display mt-4 text-4xl font-medium text-brown sm:text-5xl">Meet the Team</h2>
          <div className="gold-rule mx-auto mt-6" />
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {TEAM.map((m) => (
            <div key={m.id} className="rounded-3xl border border-hairline bg-white p-7 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-champagne-light to-champagne-dark">
                <span className="font-display text-3xl italic text-ivory">{m.name[0]}</span>
              </div>
              <h3 className="font-display mt-5 text-2xl text-brown">{m.name}</h3>
              <p className="eyebrow mt-1 !text-[0.6rem]">{m.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-brown-soft">{m.bio}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/booking" className="btn-gold">
            Book with our team
          </Link>
        </div>
      </section>
    </>
  );
}
