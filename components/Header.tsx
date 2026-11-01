"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-brown px-4 py-2 text-center text-[11px] tracking-wide text-beige">
        Demo website designed by{" "}
        <a href="https://www.mbttechsphere.co.za" className="font-medium text-champagne-light underline-offset-2 hover:underline">
          MBT TechSphere Solutions
        </a>{" "}
        — want one like this for your salon?
      </div>
      <div className="border-b border-hairline bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-10">
          <Link href="/" aria-label="Luxe & Glow Beauty Studio home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition-colors hover:text-champagne-dark ${
                  pathname === item.href ? "text-champagne-dark" : "text-brown"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/booking" className="btn-gold !px-6 !py-2.5">
              Book Now
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-full p-2 text-brown lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {open && (
          // Any link tap inside the menu closes it.
          <nav className="border-t border-hairline px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile" onClick={() => setOpen(false)}>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block border-b border-hairline py-3.5 text-base ${
                  pathname === item.href ? "text-champagne-dark" : "text-brown"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/booking" className="btn-gold mt-5 w-full">
              Book Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
