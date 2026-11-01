import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { SocialLinks } from "@/components/SocialLinks";
import { HOURS, SALON, telLink, whatsappLink } from "@/lib/salon";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Get in touch" title="Contact Us" intro="Walk-ins are welcome — or WhatsApp or call us to book your spot." />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 md:grid-cols-2 lg:px-10 lg:py-20">
        {SALON.phones.map((p) => (
          <div key={p.intl} className="card p-8">
            <p className="eyebrow">Call / WhatsApp</p>
            <p className="font-display mt-2 text-4xl font-semibold text-purple">{p.display}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink("Hi BeeLeeGeen! I'd like to book a hairstyle.", p.intl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1f8f4e] px-6 py-3 font-extrabold text-white transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
              <a href={telLink(p.intl)} className="btn-secondary">
                Call
              </a>
            </div>
          </div>
        ))}

        <div className="card p-8">
          <p className="eyebrow">Visit us</p>
          <p className="font-display mt-2 text-2xl font-semibold text-purple">{SALON.address}</p>
          <ul className="mt-4 space-y-1.5">
            {HOURS.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span className="text-plum">{h.days}</span>
                <span className="font-bold text-pink-dark">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-8">
          <p className="eyebrow">Follow our work</p>
          <ul className="mt-3 space-y-1.5 text-plum">
            <li>
              Instagram: <strong>{SALON.instagram.handle}</strong>
            </li>
            <li>
              Facebook: <strong>{SALON.facebook.handle}</strong>
            </li>
            <li>
              TikTok: <strong>{SALON.tiktok.handle}</strong>
            </li>
          </ul>
          <SocialLinks className="mt-5" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-hairline">
          <iframe
            title={`Map of ${SALON.mapQuery}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(SALON.mapQuery)}&output=embed`}
            className="h-[380px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
