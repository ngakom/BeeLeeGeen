import Link from "next/link";
import Logo from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { NAV } from "@/lib/nav";
import { HOURS, SALON, telLink } from "@/lib/salon";

export default function Footer() {
  return (
    <footer className="bg-plum text-lilac">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <div className="inline-block rounded-3xl bg-cream p-3">
            <Logo className="h-28 w-auto" />
          </div>
          <p className="font-script mt-5 text-2xl text-gold">{SALON.motto}</p>
        </div>

        <div>
          <p className="eyebrow !text-gold">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {[...NAV, { label: "Book an Appointment", href: "/booking" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-pink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-gold">Call / WhatsApp</p>
          <ul className="mt-5 space-y-2.5">
            {SALON.phones.map((p) => (
              <li key={p.intl}>
                <a href={telLink(p.intl)} className="text-lg font-bold text-white hover:text-pink">
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-5 space-y-1 text-sm">
            {HOURS.map((h) => (
              <li key={h.days}>
                {h.days}: <span className="text-white">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-gold">Visit Us</p>
          <p className="mt-5">{SALON.address}</p>
          <SocialLinks className="mt-6" light />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-lilac/70 sm:flex-row sm:justify-between lg:px-10">
          <p>
            © {new Date().getFullYear()} {SALON.name} {SALON.kind}. All rights reserved.
          </p>
          <p>
            Website by{" "}
            <a href="https://www.mbttechsphere.co.za" className="text-gold hover:underline">
              MBT TechSphere Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
