import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import BookingRequest from "@/components/BookingRequest";

export const metadata: Metadata = { title: "Book an Appointment", alternates: { canonical: "/booking" } };

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Bookings"
        title="Book an Appointment"
        intro="Fill in the details below and your request opens in WhatsApp, ready to send. We'll reply to confirm."
      />
      <div className="px-5 py-14 lg:py-20">
        <Suspense>
          <BookingRequest />
        </Suspense>
      </div>
    </>
  );
}
