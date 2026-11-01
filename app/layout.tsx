import type { Metadata } from "next";
import { Dancing_Script, Fredoka, Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["500", "600"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dancing = Dancing_Script({ variable: "--font-dancing", subsets: ["latin"], weight: ["600"] });

export const metadata: Metadata = {
  title: {
    default: "BeeLeeGeen Kiddies Hair Salon | Luxury Styling for Little Royals",
    template: "%s | BeeLeeGeen Kiddies Hair Salon",
  },
  description:
    "BeeLeeGeen is a child-friendly kiddies hair salon in Mmotong, Lefisoane offering plaiting, cornrows, braids and hair care for children — and luxury styling for adults too. Walk in or book online — 063 379 7842.",
  openGraph: {
    type: "website",
    siteName: "BeeLeeGeen Kiddies Hair Salon",
    title: "BeeLeeGeen | Luxury Styling for Little Royals",
    description: "Kiddies hair salon in Lefisoane — plaiting, cornrows, braids and hair care. Adults welcome too!",
    images: [{ url: "/images/work/14.jpg", width: 1200, height: 1600, alt: "Flower cornrow design by BeeLeeGeen" }],
    locale: "en_ZA",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${dancing.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
