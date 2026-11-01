import Image from "next/image";

// The owner's logo artwork (background removed).
export default function Logo({ className = "h-14 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="BeeLeeGeen — Luxury Styling for Little Royals"
      width={900}
      height={882}
      priority
      className={className}
    />
  );
}
