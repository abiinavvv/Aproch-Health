"use client";

import { useState } from "react";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import { Pencil } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  useBooking,
  saveBookingToSession,
} from "@/context/BookingContext";
import { getPsychologistBySlug, getDefaultPsychologist, formatSessionFee } from "@/lib/psychologists";
import {
  introductorySession,
  formatSessionEndTime,
} from "@/lib/sessions";
import { formatDisplayDate } from "@/lib/calendar";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";

export default function Step4Review() {
  const booking = useBooking();
  const {
    psychologistSlug,
    sessionType,
    date,
    timeSlot,
    sessionMode,
    name,
    email,
    phone,
    age,
    goToStep,
  } = booking;

  const [agreed, setAgreed] = useState(false);

  const session = introductorySession;
  if (!date || !timeSlot) return null;

  const endTime = formatSessionEndTime(timeSlot, session.duration);
  const modeLabel = sessionMode === "video" ? "Video" : "Audio";

  const psychologist =
    (psychologistSlug && getPsychologistBySlug(psychologistSlug)) ||
    getDefaultPsychologist();
  const sessionFee = psychologist.sessionFee;

  const handleWhatsAppConfirm = () => {
    if (!agreed) return;

    const url = buildBookingWhatsAppUrl({
      psychologistSlug: booking.psychologistSlug,
      sessionType: booking.sessionType,
      date: booking.date,
      timeSlot: booking.timeSlot,
      sessionMode: booking.sessionMode,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      age: booking.age,
      intakeMessage: booking.intakeMessage,
      currentStep: 5,
    });

    window.open(url, "_blank", "noopener,noreferrer");

    saveBookingToSession({
      psychologistSlug: booking.psychologistSlug,
      sessionType: booking.sessionType,
      date: booking.date,
      timeSlot: booking.timeSlot,
      sessionMode: booking.sessionMode,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      age: booking.age,
      intakeMessage: booking.intakeMessage,
      currentStep: 5,
    });
    sessionStorage.setItem("bookingComplete", "true");
    window.location.href = "/confirmation";
  };

  return (
    <div className="mx-auto max-w-[520px]">
      <h2 className="mb-4 font-display text-xl font-bold text-dark-text md:mb-6 md:text-2xl">
        Review your booking
      </h2>

      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <div className="flex items-start justify-between border-b border-border p-4 md:p-5">
          <div className="flex gap-3 md:gap-4">
            <div className="psychologist-photo-avatar relative h-12 w-12 shrink-0 overflow-hidden rounded-xl md:h-14 md:w-14">
              <PsychologistPhoto
                photo={psychologist.photo}
                photoWebp={psychologist.photoWebp}
                alt={psychologist.name}
                fill
                className="psychologist-photo"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-dark-text md:text-base">{psychologist.name}</p>
              <p className="text-xs text-muted md:text-sm">{psychologist.designation}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="flex items-center gap-1 text-xs text-primary md:text-sm"
          >
            <Pencil size={14} /> Edit
          </button>
        </div>

        <div className="border-b border-border p-4 text-xs text-body-text md:p-5 md:text-sm">
          {session.label} · {session.duration} min · {modeLabel}
        </div>

        <div className="flex flex-col gap-3 border-b border-border p-4 max-md:gap-4 md:flex-row md:items-start md:justify-between md:gap-5 md:p-5">
          <div className="flex gap-6 max-md:w-full md:gap-8">
            <div>
              <p className="text-xs font-medium text-muted md:text-sm md:font-normal">Date</p>
              <p className="mt-0.5 text-sm font-medium text-dark-text md:mt-1">{formatDisplayDate(date)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted md:text-sm md:font-normal">Time</p>
              <p className="mt-0.5 text-sm font-medium text-dark-text md:mt-1">
                {timeSlot} – {endTime}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="flex shrink-0 items-center gap-1 self-start text-xs text-primary md:text-sm"
          >
            <Pencil size={14} /> Edit
          </button>
        </div>

        <div className="border-b border-border p-4 text-xs md:p-5 md:text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Your details
          </p>
          <p className="mt-2 text-sm text-dark-text md:mt-3">{name}</p>
          <p className="mt-0.5 text-xs text-body-text md:mt-1 md:text-sm">+91 {phone} · {email}</p>
          <p className="mt-0.5 text-xs text-body-text md:mt-1 md:text-sm">Age {age}</p>
        </div>

        <div className="p-4 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Session fee
          </p>
          <div className="mt-2 flex flex-col gap-0.5 text-sm font-semibold text-dark-text max-md:gap-1 md:mt-3 md:flex-row md:justify-between md:text-base">
            <span>{session.label}</span>
            <span>{formatSessionFee(sessionFee)}</span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted md:mt-3 md:text-xs">
            Payment details will be shared when we confirm your slot on WhatsApp.
          </p>
        </div>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-body-text md:mt-6 md:gap-3 md:text-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-primary"
        />
        By proceeding, I agree to the Terms and Conditions and Consent to Therapy
      </label>

      <div className="mt-4 md:mt-6">
        <Button
          variant="yellow"
          fullWidth
          onClick={handleWhatsAppConfirm}
          disabled={!agreed}
          className="!px-4 !py-2.5 text-xs md:!py-3 md:text-sm"
        >
          Confirm on WhatsApp →
        </Button>
      </div>
    </div>
  );
}
