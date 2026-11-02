import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // One address for Google: send the bare domain and the vercel.app link to www.
  async redirects() {
    return ["beeleegeen.co.za", "bee-lee-geen.vercel.app"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://www.beeleegeen.co.za/:path*",
      permanent: true,
    }));
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
