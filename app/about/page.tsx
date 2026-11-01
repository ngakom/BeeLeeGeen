import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { PROFILE, SALON } from "@/lib/salon";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title="About BeeLeeGeen" intro={SALON.motto} />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.8fr_1fr] lg:px-10 lg:py-20">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl">
          <Image src="/images/owner.jpg" alt={`${SALON.owner}, founder of BeeLeeGeen`} fill sizes="(min-width: 1024px) 24rem, 90vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow">Meet the founder, {SALON.owner}</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-purple sm:text-5xl">A kiddies salon with a royal touch</h2>
          <p className="mt-6 text-lg leading-relaxed text-plum-soft">{PROFILE.overview}</p>
          <p className="mt-4 text-lg leading-relaxed text-plum-soft">
            Every plait is done with care, because we believe your child&apos;s comfort matters as much as the finished look.
          </p>
        </div>
      </section>

      <section className="bg-lilac/60 py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2 lg:px-10">
          <div className="card p-9">
            <span className="text-4xl" aria-hidden="true">
              🌟
            </span>
            <h2 className="font-display mt-3 text-3xl font-semibold text-purple">Our Vision</h2>
            <p className="mt-3 text-lg leading-relaxed text-plum-soft">{PROFILE.vision}</p>
          </div>
          <div className="card p-9">
            <span className="text-4xl" aria-hidden="true">
              💜
            </span>
            <h2 className="font-display mt-3 text-3xl font-semibold text-purple">Our Mission</h2>
            <p className="mt-3 text-lg leading-relaxed text-plum-soft">{PROFILE.mission}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 text-center lg:py-20">
        <p className="eyebrow">What we work towards</p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-purple sm:text-5xl">Our Goals</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PROFILE.goals.map((g, i) => (
            <div key={g} className="rounded-[1.75rem] bg-gradient-to-br from-pink to-purple p-8 text-white shadow-lg">
              <span className="font-display text-4xl font-semibold text-gold">0{i + 1}</span>
              <p className="font-display mt-2 text-2xl font-semibold">{g}</p>
            </div>
          ))}
        </div>
        <Link href="/booking" className="btn-primary mt-12">
          Book your little royal in
        </Link>
      </section>
    </>
  );
}
