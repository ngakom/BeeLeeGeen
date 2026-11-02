import type { MetadataRoute } from "next";
import { SALON } from "@/lib/salon";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SALON.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SALON.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SALON.url}/booking`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SALON.url}/gallery`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SALON.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SALON.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
