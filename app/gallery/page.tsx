import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Portfolio" title="Our Work" intro="Plaits, cornrows and braids by BeeLeeGeen — for little royals and grown-ups alike." />
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <Gallery />
        <div className="mt-16 text-center">
          <p className="font-display text-3xl font-semibold text-purple">Love a look?</p>
          <Link href="/booking" className="btn-primary mt-6">
            Book it now
          </Link>
        </div>
      </section>
    </>
  );
}
