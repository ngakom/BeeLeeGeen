import { OPEN_HOURS, TEAM, type Service } from "./salon";

const SLOT_MINUTES = 30;
const SAMPLE_BUSY_RATE = 0.38;

export type Booking = {
  ref: string;
  serviceId: string;
  stylistId: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:MM
  minutes: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
};

export const toDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const fromDateKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const toTime = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

// Deterministic pseudo-random so the sample diary looks the same on every visit.
function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function sampleBusy(stylistId: string, date: string, slot: number) {
  // Busy blocks are an hour long so the diary looks like real appointments.
  return hash(`${stylistId}|${date}|${Math.floor(slot / 60)}`) < SAMPLE_BUSY_RATE;
}

/** Next `count` days the salon is open, starting today. */
export function openDays(count = 14, from = new Date()) {
  const days: Date[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (days.length < count) {
    if (OPEN_HOURS[d.getDay()]) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export function stylistsFor(service: Service) {
  return TEAM.filter((t) => t.categories.includes(service.category));
}

function isFree(stylistId: string, date: string, start: number, minutes: number, bookings: Booking[]) {
  for (let t = start; t < start + minutes; t += SLOT_MINUTES) {
    if (sampleBusy(stylistId, date, t)) return false;
  }
  return !bookings.some((b) => {
    if (b.stylistId !== stylistId || b.date !== date) return false;
    const bs = toMinutes(b.time);
    return start < bs + b.minutes && bs < start + minutes;
  });
}

/** Start times on `date` with the stylist that would take each one. */
export function availableSlots(
  service: Service,
  stylistId: string | "any",
  date: string,
  bookings: Booking[],
  now = new Date()
): { time: string; stylistId: string }[] {
  const hours = OPEN_HOURS[fromDateKey(date).getDay()];
  if (!hours) return [];
  const [open, close] = hours;
  const candidates = stylistId === "any" ? stylistsFor(service).map((s) => s.id) : [stylistId];
  const earliest = date === toDateKey(now) ? now.getHours() * 60 + now.getMinutes() + 60 : 0;

  const slots: { time: string; stylistId: string }[] = [];
  for (let start = open * 60; start + service.minutes <= close * 60; start += SLOT_MINUTES) {
    if (start < earliest) continue;
    const free = candidates.find((id) => isFree(id, date, start, service.minutes, bookings));
    if (free) slots.push({ time: toTime(start), stylistId: free });
  }
  return slots;
}

export function bookingReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "LG-";
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

/** iCalendar file so the client can add the appointment to their calendar. */
export function icsFile(booking: Booking, serviceName: string, salonName: string, location: string) {
  const start = fromDateKey(booking.date);
  const [h, m] = booking.time.split(":").map(Number);
  start.setHours(h, m);
  const end = new Date(start.getTime() + booking.minutes * 60000);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Luxe & Glow//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${booking.ref}@luxeglow`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${serviceName} at ${salonName}`,
    `LOCATION:${location}`,
    `DESCRIPTION:Booking reference ${booking.ref}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
