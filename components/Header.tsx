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
    <header className="sticky top-0 z-40 border-b border-hairline bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 lg:px-10">
        <Link href="/" aria-label="BeeLeeGeen home" className="flex items-center gap-3">
          <Logo className="h-14 w-auto" />
          <span className="hidden leading-tight sm:block">
            <span className="font-display block text-xl font-semibold text-purple">BeeLeeGeen</span>
            <span className="block text-xs font-bold text-pink-dark">Kiddies Hair Salon</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-bold transition-colors hover:text-pink-dark ${pathname === item.href ? "text-pink-dark" : "text-plum"}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary !px-6 !py-2.5">
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-full p-2 text-purple lg:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
              className={`block border-b border-hairline py-3.5 text-lg font-bold ${pathname === item.href ? "text-pink-dark" : "text-plum"}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary mt-5 w-full">
            Book Now
          </Link>
        </nav>
      )}
    </header>
  );
}
