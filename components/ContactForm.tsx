"use client";

import { useState, type FormEvent } from "react";

// Demo form: nothing is sent. On a client's live site this posts to their inbox (e.g. via Web3Forms).
export default function ContactForm() {
  const [sent, setSent] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "");
    setSent(name.split(" ")[0] || "there");
    e.currentTarget.reset();
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-cream p-6 text-center" role="status">
        <p className="font-display text-2xl text-brown">Thank you, {sent}!</p>
        <p className="mt-2 text-sm text-brown-soft">
          Your message has been received. (Demo: on a live site this would arrive in the salon&apos;s inbox instantly.)
        </p>
        <button type="button" onClick={() => setSent("")} className="mt-4 text-sm text-champagne-dark underline-offset-4 hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm text-brown-soft">
        Full name
        <input name="name" required autoComplete="name" className="field mt-1.5" />
      </label>
      <label className="text-sm text-brown-soft">
        Mobile number
        <input name="phone" type="tel" autoComplete="tel" className="field mt-1.5" />
      </label>
      <label className="text-sm text-brown-soft sm:col-span-2">
        Email
        <input name="email" type="email" required autoComplete="email" className="field mt-1.5" />
      </label>
      <label className="text-sm text-brown-soft sm:col-span-2">
        Enquiry type
        <select name="topic" className="field mt-1.5">
          <option>General question</option>
          <option>Bridal &amp; events</option>
          <option>Group booking</option>
          <option>Gift voucher</option>
        </select>
      </label>
      <label className="text-sm text-brown-soft sm:col-span-2">
        Message
        <textarea name="message" required rows={5} className="field mt-1.5 resize-none" />
      </label>
      <button type="submit" className="btn-gold sm:col-span-2">
        Send Message
      </button>
    </form>
  );
}
