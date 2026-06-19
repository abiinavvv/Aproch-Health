import type { SessionType } from "@/types";

export const sessionTypes: SessionType[] = [
  {
    id: "introductory",
    label: "Introductory Session",
    duration: 30,
    price: 500,
    tagline: "Perfect for your first conversation",
    description:
      "Not sure where to start? This shorter session helps you get comfortable and understand what therapy looks like for you.",
  },
  {
    id: "full",
    label: "Full Session",
    duration: 60,
    price: 999,
    tagline: "A complete therapeutic session",
    description:
      "A full hour to go deep. Recommended if you know what you'd like to work on.",
  },
];

// ⚠️ Update these slots weekly — Anirudh manages availability manually
export const availableTimeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

// Days of week where sessions are available (0 = Sunday)
export const availableDays = [1, 2, 3, 4, 5, 6];

// Slots greyed out for realism — update weekly
export const unavailableSlots = ["11:00 AM", "3:00 PM", "7:00 PM"];

export function getSessionById(id: string) {
  return sessionTypes.find((s) => s.id === id);
}

export function parseTimeSlot(slot: string): { hours: number; minutes: number } {
  const [time, period] = slot.split(" ");
  const [h, m] = time.split(":").map(Number);
  let hours = h;
  if (period === "PM" && h !== 12) hours += 12;
  if (period === "AM" && h === 12) hours = 0;
  return { hours, minutes: m };
}

export function formatSessionEndTime(
  startSlot: string,
  durationMinutes: number
): string {
  const { hours, minutes } = parseTimeSlot(startSlot);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  const period = endHours >= 12 ? "PM" : "AM";
  const displayHours = endHours % 12 || 12;
  return `${displayHours}:${endMinutes.toString().padStart(2, "0")} ${period}`;
}
