// Monogram + wordmark. Drawn in SVG so it stays crisp at any size.
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2c995" />
          <stop offset="55%" stopColor="#c9a66b" />
          <stop offset="100%" stopColor="#a8844b" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#lg-gold)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke="url(#lg-gold)" strokeWidth="0.6" opacity="0.7" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="24"
        fontStyle="italic"
        fontWeight="600"
        fill="url(#lg-gold)"
      >
        L&amp;G
      </text>
      {/* glow sparkle */}
      <path d="M48 13 49.2 16.8 53 18 49.2 19.2 48 23 46.8 19.2 43 18 46.8 16.8Z" fill="url(#lg-gold)" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-2xl font-semibold ${light ? "text-ivory" : "text-brown"}`}>
          Luxe <span className="italic text-champagne">&amp;</span> Glow
        </span>
        <span className={`mt-1 text-[0.6rem] tracking-[0.35em] uppercase ${light ? "text-beige" : "text-brown-soft"}`}>
          Beauty Studio
        </span>
      </span>
    </span>
  );
}
