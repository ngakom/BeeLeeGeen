import Link from "next/link";
import Logo from "./Logo";
import { NAV } from "@/lib/nav";
import { HOURS, SALON } from "@/lib/salon";
import { SocialLinks } from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-brown text-beige">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed text-beige/80">{SALON.tagline}. Hair, nails, makeup and skincare in {SALON.area}.</p>
          <SocialLinks className="mt-6" light />
        </div>

        <div>
          <p className="eyebrow !text-champagne-light">Explore</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[...NAV, { label: "Book an Appointment", href: "/booking" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-champagne-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-champagne-light">Opening Hours</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {HOURS.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-beige/70">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-champagne-light">Visit Us</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>{SALON.area}</li>
            <li>{SALON.phone}</li>
            <li>{SALON.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-beige/60 sm:flex-row sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} {SALON.name}. A fictional salon created for demonstration.</p>
          <p>
            Website by{" "}
            <a href="https://www.mbttechsphere.co.za" className="text-champagne-light hover:underline">
              MBT TechSphere Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
