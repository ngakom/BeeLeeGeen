"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { CATEGORIES, SALON, SERVICES, TEAM, formatDuration, formatPrice, whatsappLink, type CategoryId } from "@/lib/salon";
import {
  availableSlots,
  bookingReference,
  fromDateKey,
  icsFile,
  openDays,
  stylistsFor,
  toDateKey,
  type Booking,
} from "@/lib/availability";

const STORAGE_KEY = "luxe-glow-bookings";

function loadBookings(): Booking[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveBookings(bookings: Booking[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // Storage blocked (private mode): the booking still confirms for this visit.
  }
}

const dayLabel = (d: Date) => d.toLocaleDateString("en-ZA", { weekday: "short" });
const longDate = (key: string) =>
  fromDateKey(key).toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" });

function Step({ n, title, done, children }: { n: number; title: string; done?: boolean; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-hairline bg-white p-6 sm:p-8">
      <h2 className="flex items-center gap-3 font-display text-2xl text-brown sm:text-3xl">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-sm ${
            done ? "bg-champagne text-white" : "border border-champagne text-champagne-dark"
          }`}
        >
          {done ? "✓" : n}
        </span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function BookingForm() {
  const params = useSearchParams();
  const preselected = SERVICES.find((s) => s.id === params.get("service"));

  const [category, setCategory] = useState<CategoryId>(preselected?.category ?? "hair");
  const [serviceId, setServiceId] = useState(preselected?.id ?? "");
  const [stylistId, setStylistId] = useState<string>("any");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<{ time: string; stylistId: string } | null>(null);
  // This component only renders in the browser (see BookingClient), so it can read storage and the clock directly.
  const [bookings, setBookings] = useState<Booking[]>(loadBookings);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [now] = useState(() => new Date());

  const service = SERVICES.find((s) => s.id === serviceId);
  const days = useMemo(() => openDays(14, now), [now]);
  const slots = useMemo(
    () => (service && date ? availableSlots(service, stylistId, date, bookings, now) : []),
    [service, stylistId, date, bookings, now]
  );

  function chooseService(id: string) {
    setServiceId(id);
    setStylistId("any");
    setSlot(null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!service || !slot) return;
    const data = new FormData(e.currentTarget);
    const booking: Booking = {
      ref: bookingReference(),
      serviceId: service.id,
      stylistId: slot.stylistId,
      date,
      time: slot.time,
      minutes: service.minutes,
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      notes: String(data.get("notes") ?? ""),
      createdAt: new Date().toISOString(),
    };
    const next = [...bookings, booking];
    saveBookings(next);
    setBookings(next);
    setConfirmed(booking);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (confirmed) {
    const s = SERVICES.find((x) => x.id === confirmed.serviceId)!;
    const stylist = TEAM.find((t) => t.id === confirmed.stylistId)!;
    const summary = `${s.name} with ${stylist.name} on ${longDate(confirmed.date)} at ${confirmed.time}`;
    const ics = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsFile(confirmed, s.name, SALON.name, SALON.area))}`;
    return (
      <div className="fade-up mx-auto max-w-xl rounded-3xl border border-hairline bg-white p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-champagne/15 text-3xl text-champagne-dark">✓</div>
        <h2 className="font-display mt-6 text-4xl text-brown">You&apos;re booked, {confirmed.name.split(" ")[0]}!</h2>
        <p className="mt-3 text-brown-soft">We can&apos;t wait to see you.</p>
        <dl className="mt-8 space-y-3 rounded-2xl bg-cream p-6 text-left text-sm">
          {[
            ["Reference", confirmed.ref],
            ["Treatment", s.name],
            ["With", `${stylist.name} · ${stylist.role}`],
            ["When", `${longDate(confirmed.date)} at ${confirmed.time}`],
            ["Duration", formatDuration(s.minutes)],
            ["Price", formatPrice(s)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-brown-soft">{k}</dt>
              <dd className="text-right font-medium text-brown">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={ics} download={`luxe-glow-${confirmed.ref}.ics`} className="btn-gold">
            Add to Calendar
          </a>
          <a
            href={whatsappLink(`Hi ${SALON.shortName}! I've booked ${summary}. Reference: ${confirmed.ref}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Share on WhatsApp
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setConfirmed(null);
            setSlot(null);
            setDate("");
          }}
          className="mt-6 text-sm text-brown-soft underline-offset-4 hover:underline"
        >
          Make another booking
        </button>
        <p className="mt-8 border-t border-hairline pt-6 text-xs leading-relaxed text-brown-soft">
          This is a demo booking system. On a live salon website, the salon would instantly receive this booking by email or
          WhatsApp, and you would get an SMS reminder the day before.{" "}
          <Link href="https://www.mbttechsphere.co.za/#contact" className="text-champagne-dark underline">
            Get this for your salon
          </Link>
        </p>
      </div>
    );
  }

  const stylists = service ? stylistsFor(service) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="min-w-0 space-y-6">
        <Step n={1} title="Choose a treatment" done={!!service}>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Service category">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={category === c.id}
                onClick={() => setCategory(c.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  category === c.id ? "border-brown bg-brown text-ivory" : "border-hairline text-brown hover:border-champagne"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {SERVICES.filter((s) => s.category === category).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => chooseService(s.id)}
                aria-pressed={serviceId === s.id}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  serviceId === s.id ? "border-champagne bg-champagne/10" : "border-hairline hover:border-champagne/60"
                }`}
              >
                <span className="block font-medium text-brown">{s.name}</span>
                <span className="mt-1 block text-sm text-brown-soft">
                  {formatPrice(s)} · {formatDuration(s.minutes)}
                </span>
              </button>
            ))}
          </div>
        </Step>

        {service && (
          <Step n={2} title="Choose your stylist" done={!!slot}>
            <div className="grid gap-3 sm:grid-cols-3">
              {[{ id: "any", name: "Any available", role: "First free professional" }, ...stylists].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setStylistId(t.id);
                    setSlot(null);
                  }}
                  aria-pressed={stylistId === t.id}
                  className={`rounded-2xl border p-4 text-left transition-colors ${
                    stylistId === t.id ? "border-champagne bg-champagne/10" : "border-hairline hover:border-champagne/60"
                  }`}
                >
                  <span className="block font-medium text-brown">{t.name}</span>
                  <span className="mt-1 block text-xs text-brown-soft">{t.role}</span>
                </button>
              ))}
            </div>
          </Step>
        )}

        {service && (
          <Step n={3} title="Pick a date & time" done={!!slot}>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
              {days.map((d) => {
                const key = toDateKey(d);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setDate(key);
                      setSlot(null);
                    }}
                    aria-pressed={date === key}
                    className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-3 transition-colors ${
                      date === key ? "border-brown bg-brown text-ivory" : "border-hairline text-brown hover:border-champagne"
                    }`}
                  >
                    <span className="text-[0.65rem] uppercase tracking-widest opacity-80">{dayLabel(d)}</span>
                    <span className="font-display text-2xl">{d.getDate()}</span>
                    <span className="text-[0.65rem] opacity-70">{d.toLocaleDateString("en-ZA", { month: "short" })}</span>
                  </button>
                );
              })}
            </div>
            {date && (
              <div className="mt-6">
                <p className="text-sm text-brown-soft">{longDate(date)}</p>
                {slots.length ? (
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {slots.map((s) => (
                      <button
                        key={s.time}
                        type="button"
                        onClick={() => setSlot(s)}
                        aria-pressed={slot?.time === s.time}
                        className={`rounded-xl border py-2.5 text-sm transition-colors ${
                          slot?.time === s.time ? "border-champagne bg-champagne text-white" : "border-hairline text-brown hover:border-champagne"
                        }`}
                      >
                        {s.time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 rounded-2xl bg-cream p-4 text-sm text-brown-soft">
                    Fully booked on this day — please choose another date or stylist.
                  </p>
                )}
              </div>
            )}
          </Step>
        )}

        {slot && (
          <Step n={4} title="Your details">
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-brown-soft">
                Full name
                <input name="name" required autoComplete="name" className="field mt-1.5" placeholder="Naledi Mokoena" />
              </label>
              <label className="text-sm text-brown-soft">
                Mobile number
                <input name="phone" type="tel" required autoComplete="tel" className="field mt-1.5" placeholder="071 234 5678" />
              </label>
              <label className="text-sm text-brown-soft sm:col-span-2">
                Email (optional)
                <input name="email" type="email" autoComplete="email" className="field mt-1.5" placeholder="you@example.com" />
              </label>
              <label className="text-sm text-brown-soft sm:col-span-2">
                Notes for your stylist (optional)
                <textarea name="notes" rows={3} className="field mt-1.5 resize-none" placeholder="Hair length, inspiration, allergies…" />
              </label>
              <button type="submit" className="btn-gold sm:col-span-2">
                Confirm Booking
              </button>
            </form>
          </Step>
        )}
      </div>

      <aside className="rounded-3xl bg-brown p-7 text-beige lg:sticky lg:top-36">
        <p className="eyebrow !text-champagne-light">Your appointment</p>
        {service ? (
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-beige/60">Treatment</dt>
              <dd className="font-display mt-0.5 text-2xl text-ivory">{service.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-beige/60">Price</dt>
              <dd className="text-ivory">{formatPrice(service)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-beige/60">Duration</dt>
              <dd className="text-ivory">{formatDuration(service.minutes)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-beige/60">Stylist</dt>
              <dd className="text-ivory">
                {slot ? TEAM.find((t) => t.id === slot.stylistId)?.name : stylistId === "any" ? "Any available" : TEAM.find((t) => t.id === stylistId)?.name}
              </dd>
            </div>
            {date && (
              <div className="flex justify-between gap-4">
                <dt className="text-beige/60">When</dt>
                <dd className="text-right text-ivory">
                  {longDate(date)}
                  {slot && ` · ${slot.time}`}
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="mt-5 text-sm leading-relaxed">Choose a treatment to see prices, stylists and available times.</p>
        )}
        <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-beige/70">
          No payment needed to book. Free cancellation up to 24 hours before your appointment.
        </p>
      </aside>
    </div>
  );
}
