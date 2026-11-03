import type { BookingState } from "@/types";
import { formatDisplayDate } from "@/lib/calendar";
import {
  getDefaultPsychologist,
  getPsychologistBySlug,
  formatSessionFee,
} from "@/lib/psychologists";
import {
  getDefaultNutritionist,
  getNutritionistBySlug,
} from "@/lib/nutritionists";
import {
  formatNutritionFee,
  getNutritionOfferById,
} from "@/lib/nutrition";
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

function getBookingPsychologist(booking: BookingState) {
  if (booking.psychologistSlug) {
    return getPsychologistBySlug(booking.psychologistSlug) ?? getDefaultPsychologist();
  }
  return getDefaultPsychologist();
}

function getBookingNutritionist(booking: BookingState) {
  if (booking.nutritionistSlug) {
    return (
      getNutritionistBySlug(booking.nutritionistSlug) ?? getDefaultNutritionist()
    );
  }
  return getDefaultNutritionist();
}

function buildTherapyWhatsAppMessage(booking: BookingState): string {
  const session = booking.sessionType ? getSessionById(booking.sessionType) : null;
  if (!session || !booking.date || !booking.timeSlot) {
    throw new Error("Incomplete booking data");
  }

  const psychologist = getBookingPsychologist(booking);
  const endTime = formatSessionEndTime(booking.timeSlot, session.duration);
  const modeLabel = booking.sessionMode === "video" ? "Video" : "Audio";
  const lines = [
    "Hi, I'd like to book a session with Aproch Health.",
    "",
    `*Name:* ${booking.name}`,
    `*Phone:* ${booking.phoneCountryCode} ${booking.phone}`,
    `*Email:* ${booking.email}`,
    `*Age:* ${booking.age}`,
    "",
    `*Service:* Therapy`,
    `*Session:* ${session.label} (${session.duration} min)`,
    `*Fee:* ${formatSessionFee(psychologist.sessionFee)}`,
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

function buildNutritionWhatsAppMessage(booking: BookingState): string {
  const offer = getNutritionOfferById(booking.nutritionOfferId);
  if (!offer || !booking.date || !booking.timeSlot) {
    throw new Error("Incomplete booking data");
  }

  const nutritionist = getBookingNutritionist(booking);
  const endTime = formatSessionEndTime(booking.timeSlot, offer.duration);
  const modeLabel = booking.sessionMode === "video" ? "Video" : "Audio";
  const kickoffLabel =
    offer.id === "nutrition-package"
      ? "Preferred kickoff"
      : "Consultation";

  const lines = [
    "Hi, I'd like to book nutrition support with Aproch Health.",
    "",
    `*Name:* ${booking.name}`,
    `*Phone:* ${booking.phoneCountryCode} ${booking.phone}`,
    `*Email:* ${booking.email}`,
    `*Age:* ${booking.age}`,
    "",
    `*Service:* Food & Nutrition`,
    `*Offer:* ${offer.label}`,
    `*Fee:* ${formatNutritionFee(offer.price)}`,
    `*${kickoffLabel} date:* ${formatDisplayDate(booking.date)}`,
    `*Time:* ${booking.timeSlot} – ${endTime}`,
    `*Mode:* ${modeLabel}`,
    `*Dietitian:* ${nutritionist.name}`,
  ];

  if (booking.intakeMessage.trim()) {
    lines.push("", `*Message for dietitian:*`, booking.intakeMessage.trim());
  }

  return lines.join("\n");
}

export function buildBookingWhatsAppMessage(booking: BookingState): string {
  if (booking.service === "nutrition") {
    return buildNutritionWhatsAppMessage(booking);
  }
  return buildTherapyWhatsAppMessage(booking);
}

export function buildBookingWhatsAppUrl(booking: BookingState): string {
  return getWhatsAppUrl(buildBookingWhatsAppMessage(booking));
}
