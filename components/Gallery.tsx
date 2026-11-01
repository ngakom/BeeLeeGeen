"use client";

import Image from "next/image";
import { useState } from "react";
import { PHOTOS } from "@/lib/salon";

const TAGS = ["All", ...Array.from(new Set(PHOTOS.map((p) => p.style)))];

export default function Gallery() {
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? PHOTOS : PHOTOS.filter((p) => p.style === tag);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery">
        {TAGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
            className={`rounded-full px-5 py-2 font-bold transition-colors ${
              tag === t ? "bg-purple text-white" : "bg-lilac text-purple hover:bg-blush"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-10 columns-2 gap-4 lg:columns-3">
        {shown.map((p) => (
          <figure key={p.src} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-3xl">
            <Image
              src={p.src}
              alt={p.alt}
              width={1200}
              height={1600}
              sizes="(min-width: 1024px) 30vw, 45vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </>
  );
}
