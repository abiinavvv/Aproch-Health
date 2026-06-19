"use client";

import { useState } from "react";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import { Pencil } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  useBooking,
  saveBookingToSession,
} from "@/context/BookingContext";
import { psychologist } from "@/lib/psychologist";
import {
  getSessionById,
  formatSessionEndTime,
} from "@/lib/sessions";
import { formatDisplayDate } from "@/lib/calendar";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";

export default function Step4Review() {
  const booking = useBooking();
  const {
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

  const session = sessionType ? getSessionById(sessionType) : null;
  if (!session || !date || !timeSlot) return null;

  const endTime = formatSessionEndTime(timeSlot, session.duration);
  const modeLabel = sessionMode === "video" ? "Video" : "Audio";

  const handleWhatsAppConfirm = () => {
    if (!agreed) return;

    const url = buildBookingWhatsAppUrl({
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
      <h2 className="mb-6 font-display text-2xl font-bold text-dark-text">
        Review your booking
      </h2>

      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div className="flex gap-4">
            <div className="relative h-14 w-14 shrink-0">
              <PsychologistPhoto fill className="psychologist-photo" />
            </div>
            <div>
              <p className="font-semibold text-dark-text">{psychologist.name}</p>
              <p className="text-sm text-muted">{psychologist.designation}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="flex items-center gap-1 text-sm text-primary"
          >
            <Pencil size={14} /> Edit
          </button>
        </div>

        <div className="border-b border-border p-5 text-sm text-body-text">
          {session.label} · {session.duration} min · {modeLabel}
        </div>

        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <p className="text-xs text-muted">Date</p>
            <p className="font-medium text-dark-text">{formatDisplayDate(date)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Time</p>
            <p className="font-medium text-dark-text">
              {timeSlot} – {endTime}
            </p>
          </div>
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="flex items-center gap-1 text-sm text-primary"
          >
            <Pencil size={14} /> Edit
          </button>
        </div>

        <div className="border-b border-border p-5 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Your details
          </p>
          <p className="mt-2 text-dark-text">{name}</p>
          <p className="text-body-text">+91 {phone} · {email}</p>
          <p className="text-body-text">Age {age}</p>
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Session fee
          </p>
          <div className="mt-3 flex justify-between font-semibold text-dark-text">
            <span>{session.label}</span>
            <span>₹{session.price}</span>
          </div>
          <p className="mt-2 text-xs text-muted">
            Payment details will be shared when we confirm your slot on WhatsApp.
          </p>
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-body-text">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-primary"
        />
        By proceeding, I agree to the Terms and Conditions and Consent to Therapy
      </label>

      <div className="mt-6">
        <Button
          variant="yellow"
          fullWidth
          onClick={handleWhatsAppConfirm}
          disabled={!agreed}
        >
          Confirm on WhatsApp →
        </Button>
      </div>
    </div>
  );
}
