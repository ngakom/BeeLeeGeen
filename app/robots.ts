import type { MetadataRoute } from "next";
import { SALON } from "@/lib/salon";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SALON.url}/sitemap.xml`,
  };
}
