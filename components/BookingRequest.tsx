"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import { ADULT_STYLES, KIDS_STYLES, SALON, findPhoto, whatsappLink } from "@/lib/salon";

const TIMES = ["Morning (08:00–12:00)", "Midday (12:00–14:00)", "Afternoon (14:00–17:00)"];
const OTHER = "Something else — I'll send a picture";
const SAME_AS_PHOTO = "Same as the photo I chose";

const kidsOption = (name: string, o: { label: string; price: number }) => `${name} – ${o.label} (R${o.price})`;

/** Example photo for a style picked from the list (kids options are "Name – Option (Rxx)"). */
const exampleFor = (style: string) =>
  KIDS_STYLES.find((s) => style.startsWith(`${s.name} – `)) ?? ADULT_STYLES.find((s) => s.name === style);

// Builds a WhatsApp message to the salon. The owner confirms the time and payment in the chat.
export default function BookingRequest() {
  const params = useSearchParams();
  const styleId = params.get("style");
  const kidsPick = KIDS_STYLES.find((s) => s.id === styleId);
  const adultPick = ADULT_STYLES.find((s) => s.id === styleId);
  const photo = findPhoto(params.get("photo"));
  const [forWho, setForWho] = useState<"child" | "adult">(adultPick ? "adult" : "child");
  const [sent, setSent] = useState(false);

  const defaultStyle = (who: "child" | "adult") =>
    photo
      ? SAME_AS_PHOTO
      : who === "child"
        ? kidsPick
          ? kidsOption(kidsPick.name, kidsPick.options[0])
          : ""
        : (adultPick?.name ?? "");
  const [style, setStyle] = useState(() => defaultStyle(forWho));
  const example = exampleFor(style);

  function chooseFor(who: "child" | "adult") {
    setForWho(who);
    setStyle(defaultStyle(who));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    const date = get("date")
      ? new Date(`${get("date")}T00:00`).toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })
      : "";
    const lines = [
      // No emoji: some WhatsApp versions garble them in pre-filled messages.
      `Hi ${SALON.name}! I'd like to book an appointment.`,
      "",
      forWho === "child" ? `For: my child ${get("childName")}${get("childAge") ? ` (age ${get("childAge")})` : ""}` : "For: myself (adult)",
      `Style: ${get("style")}`,
      // Full link so WhatsApp shows the salon a preview of the exact photo.
      photo ? `Style photo: ${window.location.origin}${photo.src}` : null,
      example && d.get("includeExample") ? `Example photo: ${window.location.origin}${example.image}` : null,
      date ? `Preferred date: ${date}` : null,
      `Preferred time: ${get("time")}`,
      get("notes") ? `Notes: ${get("notes")}` : null,
      "",
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
    ].filter((l) => l !== null); // empty strings are intentional spacer lines
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card fade-up mx-auto max-w-xl p-10 text-center">
        <p className="text-5xl" aria-hidden="true">
          👑
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold text-purple">Almost done!</h2>
        <p className="mt-3 text-lg leading-relaxed text-plum-soft">
          WhatsApp has opened with your booking request. Tap <strong>send</strong> and we&apos;ll reply with your time and payment
          details. Your booking is confirmed once payment is received.
        </p>
        {!photo && <p className="mt-4 text-sm text-plum-soft">Tip: attach a picture of the style you&apos;d like.</p>}
        <button type="button" onClick={() => setSent(false)} className="btn-secondary mt-8">
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card mx-auto grid max-w-3xl gap-5 p-6 sm:grid-cols-2 sm:p-10">
      {photo && (
        <div className="flex items-center gap-4 rounded-2xl bg-blush p-3 sm:col-span-2">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
            <Image src={photo.src} alt={photo.alt} fill sizes="6rem" className="object-cover" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-purple">Your chosen style</p>
            <p className="text-sm text-plum-soft">{photo.alt}</p>
            <Link href="/gallery" className="mt-1 inline-block text-sm font-extrabold text-pink-dark underline-offset-4 hover:underline">
              Choose a different photo
            </Link>
          </div>
        </div>
      )}

      <fieldset className="sm:col-span-2">
        <legend className="font-display text-xl font-semibold text-purple">Who is the appointment for?</legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(
            [
              ["child", "👧🏾 My child"],
              ["adult", "💁🏾‍♀️ Me (adult)"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => chooseFor(value)}
              aria-pressed={forWho === value}
              className={`rounded-2xl border-2 py-4 text-lg font-bold transition-colors ${
                forWho === value ? "border-pink bg-blush text-pink-dark" : "border-hairline text-plum hover:border-pink/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {forWho === "child" && (
        <>
          <label className="font-bold text-plum">
            Child&apos;s name
            <input name="childName" required className="field mt-1.5" />
          </label>
          <label className="font-bold text-plum">
            Child&apos;s age
            <input name="childAge" inputMode="numeric" className="field mt-1.5" placeholder="e.g. 5" />
          </label>
        </>
      )}

      <label className="font-bold text-plum sm:col-span-2">
        Style
        <select name="style" required value={style} onChange={(e) => setStyle(e.target.value)} className="field mt-1.5">
          <option value="" disabled>
            Choose a style…
          </option>
          {photo && <option>{SAME_AS_PHOTO}</option>}
          {forWho === "child"
            ? KIDS_STYLES.map((s) => (
                <optgroup key={s.id} label={s.name}>
                  {s.options.map((o) => (
                    <option key={o.label}>{kidsOption(s.name, o)}</option>
                  ))}
                </optgroup>
              ))
            : ADULT_STYLES.map((s) => <option key={s.id}>{s.name}</option>)}
          <option>{OTHER}</option>
        </select>
      </label>

      {example && (
        // Optional: the client can untick it and book without a photo.
        <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-pink/40 p-3 sm:col-span-2">
          <input name="includeExample" type="checkbox" defaultChecked className="h-5 w-5 shrink-0 accent-pink-dark" />
          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
            <Image src={example.image} alt={`Example of ${example.name}`} fill sizes="4rem" className="object-cover" />
          </span>
          <span className="text-sm text-plum">
            <strong>Include this example photo in my message</strong>
            <span className="block text-plum-soft">Optional — it shows the salon what {example.name.toLowerCase()} looks like.</span>
          </span>
        </label>
      )}

      <label className="font-bold text-plum">
        Preferred date
        <input name="date" type="date" required className="field mt-1.5" />
      </label>
      <label className="font-bold text-plum">
        Preferred time
        <select name="time" className="field mt-1.5">
          {TIMES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="font-bold text-plum">
        Your name
        <input name="name" required autoComplete="name" className="field mt-1.5" />
      </label>
      <label className="font-bold text-plum">
        Your phone number
        <input name="phone" type="tel" required autoComplete="tel" className="field mt-1.5" placeholder="071 234 5678" />
      </label>

      <label className="font-bold text-plum sm:col-span-2">
        Notes (optional)
        <textarea name="notes" rows={3} className="field mt-1.5 resize-none" placeholder="Hair length, extensions, beads, colour…" />
      </label>

      <button type="submit" className="btn-primary sm:col-span-2">
        <WhatsAppIcon /> Send booking request on WhatsApp
      </button>
      <div className="rounded-2xl bg-blush p-4 text-sm leading-relaxed text-plum sm:col-span-2">
        <strong>Please note:</strong> we work strictly by appointment (no walk-ins). Your booking is confirmed once payment is received —
        we&apos;ll send you the payment details on WhatsApp. Cash in hand is not accepted.
      </div>
    </form>
  );
}
