export default function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="sparkles bg-gradient-to-b from-lilac to-cream">
      <div className="mx-auto max-w-3xl px-5 py-14 text-center lg:py-20">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="font-display fade-up mt-3 text-5xl font-semibold text-purple sm:text-6xl">{title}</h1>
        {intro && <p className="fade-up mx-auto mt-5 max-w-xl text-lg leading-relaxed text-plum-soft">{intro}</p>}
      </div>
    </section>
  );
}
