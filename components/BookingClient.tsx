"use client";

import dynamic from "next/dynamic";

// The booking form depends on today's date and the visitor's saved bookings, so render it in the browser only.
const BookingForm = dynamic(() => import("./BookingForm"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse rounded-3xl bg-cream" />,
});

export default BookingForm;
