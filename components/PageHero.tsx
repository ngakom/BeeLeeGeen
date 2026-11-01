export default function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:py-20">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="font-display fade-up mt-4 text-5xl font-medium text-brown sm:text-6xl">{title}</h1>
        <div className="gold-rule mx-auto mt-6" />
        {intro && <p className="fade-up mx-auto mt-6 max-w-xl leading-relaxed text-brown-soft">{intro}</p>}
      </div>
    </section>
  );
}
