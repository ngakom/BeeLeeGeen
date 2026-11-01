import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingClient";

export const metadata: Metadata = { title: "Book an Appointment" };

export default function BookingPage() {
  return (
    <>
      <PageHero eyebrow="Online booking" title="Book an Appointment" intro="Choose your treatment, favourite stylist and a time that suits you. It takes less than a minute." />
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-10 lg:py-20">
        <Suspense>
          <BookingForm />
        </Suspense>
      </div>
    </>
  );
}
