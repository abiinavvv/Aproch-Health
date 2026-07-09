import type { SessionType } from "@/types";

export const introductorySession: SessionType = {
  id: "introductory",
  label: "Introductory Session",
  duration: 60,
  price: 500,
  tagline: "Perfect for your first conversation",
  description:
    "Not sure where to start? This shorter session helps you get comfortable and understand what therapy looks like for you.",
};

export const sessionTypes: SessionType[] = [introductorySession];

// Days of week where sessions are available (0 = Sunday)
export const availableDays = [0, 1, 2, 3, 4, 5, 6];

export const TIME_MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => i);

export function formatMinuteOption(minute: number): string {
  return minute.toString().padStart(2, "0");
}

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

export function formatTimeSlot(hours24: number, minutes: number): string {
  const period = hours24 >= 12 ? "PM" : "AM";
  const displayHours = hours24 % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function isTimeSlotInPast(dateIso: string, slot: string): boolean {
  const { hours, minutes } = parseTimeSlot(slot);
  const selected = new Date(dateIso + "T00:00:00");
  selected.setHours(hours, minutes, 0, 0);
  return selected.getTime() < Date.now();
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
