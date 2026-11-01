"use client";

import Image from "next/image";
import { useState } from "react";

const PHOTOS = [
  { src: "/images/hair-braiding.jpg", alt: "Braided hairstyle in progress", tag: "Hair" },
  { src: "/images/nails-pink.jpg", alt: "Soft pink manicure with glitter accent", tag: "Nails" },
  { src: "/images/makeup-studio.jpg", alt: "Makeup artist working with a client in the studio", tag: "Makeup" },
  { src: "/images/lashes-closeup.jpg", alt: "Lash extensions being applied", tag: "Lashes & Skin" },
  { src: "/images/nails-nude.jpg", alt: "Nude almond nails with gem details", tag: "Nails" },
  { src: "/images/facial-mask.jpg", alt: "Client enjoying a facial mask treatment", tag: "Lashes & Skin" },
  { src: "/images/makeup-artist.jpg", alt: "Makeup artist perfecting eyeliner", tag: "Makeup" },
  { src: "/images/nails-salon.jpg", alt: "Client choosing nail colours at the nail bar", tag: "Nails" },
  { src: "/images/lashes-application.jpg", alt: "Close-up of a lash extension application", tag: "Lashes & Skin" },
  { src: "/images/salon-interior.jpg", alt: "The studio's styling floor", tag: "Studio" },
  { src: "/images/skincare-facial.jpg", alt: "Hydrating serum facial", tag: "Lashes & Skin" },
  { src: "/images/nails-client.jpg", alt: "Smiling client during her manicure", tag: "Nails" },
];

const TAGS = ["All", ...Array.from(new Set(PHOTOS.map((p) => p.tag)))];

export default function Gallery() {
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? PHOTOS : PHOTOS.filter((p) => p.tag === tag);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery">
        {TAGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              tag === t ? "border-brown bg-brown text-ivory" : "border-hairline text-brown hover:border-champagne"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {shown.map((p) => (
          <figure key={p.src} className="group relative mb-5 break-inside-avoid overflow-hidden rounded-3xl">
            <Image
              src={p.src}
              alt={p.alt}
              width={800}
              height={600}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-ivory/90 px-3 py-1 text-xs text-brown backdrop-blur">
              {p.tag}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
