import type { BookingState } from "@/types";
import { formatDisplayDate } from "@/lib/calendar";
import { psychologist } from "@/lib/psychologist";
import { formatSessionEndTime, getSessionById } from "@/lib/sessions";
import { getWhatsAppNumber as getSiteWhatsAppNumber } from "@/lib/site";

/** Normalize to digits-only wa.me format with India country code */
export function getWhatsAppNumber(): string {
  return getSiteWhatsAppNumber();
}

export function getWhatsAppUrl(message?: string): string {
  const number = getWhatsAppNumber();
  if (!message) return `https://wa.me/${number}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildBookingWhatsAppMessage(booking: BookingState): string {
  const session = booking.sessionType ? getSessionById(booking.sessionType) : null;
  if (!session || !booking.date || !booking.timeSlot) {
    throw new Error("Incomplete booking data");
  }

  const endTime = formatSessionEndTime(booking.timeSlot, session.duration);
  const modeLabel = booking.sessionMode === "video" ? "Video" : "Audio";
  const lines = [
    "Hi, I'd like to book a session with Aproch Health.",
    "",
    `*Name:* ${booking.name}`,
    `*Phone:* +91 ${booking.phone}`,
    `*Email:* ${booking.email}`,
    `*Age:* ${booking.age}`,
    "",
    `*Session:* ${session.label} (${session.duration} min)`,
    `*Fee:* ₹${session.price}`,
    `*Date:* ${formatDisplayDate(booking.date)}`,
    `*Time:* ${booking.timeSlot} – ${endTime}`,
    `*Mode:* ${modeLabel}`,
    `*Psychologist:* ${psychologist.name}`,
  ];

  if (booking.intakeMessage.trim()) {
    lines.push("", `*Message for psychologist:*`, booking.intakeMessage.trim());
  }

  return lines.join("\n");
}

export function buildBookingWhatsAppUrl(booking: BookingState): string {
  return getWhatsAppUrl(buildBookingWhatsAppMessage(booking));
}
