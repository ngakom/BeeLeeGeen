import { SALON } from "@/lib/salon";

const LINKS = [
  {
    label: "Instagram",
    href: SALON.instagram,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.3" cy="6.7" r="1.1" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: SALON.facebook,
    icon: <path d="M14 9V6.5c0-.83.67-1.5 1.5-1.5H17V2h-2.5A4.5 4.5 0 0 0 10 6.5V9H7v3h3v10h4V12h2.8l.7-3H14Z" />,
  },
  {
    label: "TikTok",
    href: SALON.tiktok,
    icon: <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.7a5.8 5.8 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6Z" />,
  },
];

export function SocialLinks({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            light
              ? "border-white/20 text-beige hover:border-champagne hover:text-champagne-light"
              : "border-hairline text-brown hover:border-champagne hover:text-champagne-dark"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            {l.icon}
          </svg>
        </a>
      ))}
    </div>
  );
}
