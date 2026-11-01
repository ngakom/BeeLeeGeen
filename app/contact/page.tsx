import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { HOURS, SALON, whatsappLink } from "@/lib/salon";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Get in touch" title="Contact Us" intro="Questions, bridal enquiries or group bookings — we'd love to hear from you." />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_1.2fr] lg:px-10 lg:py-20">
        <div className="space-y-6">
          <a
            href={whatsappLink(`Hi ${SALON.shortName}! I'd like to book an appointment.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-3xl bg-[#1f8f4e] p-6 text-white transition-transform hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3Z" />
            </svg>
            <span>
              <span className="block font-display text-2xl">Book via WhatsApp</span>
              <span className="text-sm text-white/85">Fastest way to reach us — we reply within minutes.</span>
            </span>
          </a>

          <div className="rounded-3xl border border-hairline bg-white p-7">
            <h2 className="font-display text-2xl text-brown">Visit the studio</h2>
            <ul className="mt-4 space-y-2 text-sm text-brown-soft">
              <li>{SALON.area}</li>
              <li>{SALON.phone}</li>
              <li>{SALON.email}</li>
            </ul>
            <h3 className="eyebrow mt-7">Opening hours</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {HOURS.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span className="text-brown">{h.days}</span>
                  <span className="text-brown-soft">{h.time}</span>
                </li>
              ))}
            </ul>
            <h3 className="eyebrow mt-7">Follow us</h3>
            <SocialLinks className="mt-3" />
          </div>
        </div>

        <div className="rounded-3xl border border-hairline bg-white p-7 sm:p-9">
          <h2 className="font-display text-3xl text-brown">Send us a message</h2>
          <p className="mt-2 text-sm text-brown-soft">We&apos;ll get back to you within one business day.</p>
          <div className="mt-7">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-hairline">
          <iframe
            title={`Map of ${SALON.area}`}
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
