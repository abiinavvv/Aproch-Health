"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useBooking } from "@/context/BookingContext";
import { psychologist } from "@/lib/psychologist";
import { getSessionById, formatSessionEndTime } from "@/lib/sessions";
import { formatDisplayDate, buildGoogleCalendarUrl } from "@/lib/calendar";

export default function Step5Confirmation() {
  const { sessionType, date, timeSlot, sessionMode } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  const session = sessionType ? getSessionById(sessionType) : null;
  if (!session || !date || !timeSlot) return null;

  const endTime = formatSessionEndTime(timeSlot, session.duration);
  const modeLabel =
    sessionMode === "video"
      ? "Video call (Google Meet)"
      : "Audio call (Google Meet)";

  const calendarUrl = buildGoogleCalendarUrl({
    psychologistName: psychologist.name,
    date,
    timeSlot,
    durationMinutes: session.duration,
  });

  return (
    <div className="mx-auto max-w-[520px] text-center">
      <motion.div
        initial={shouldReduceMotion ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
      >
        <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <h2 className="mt-6 font-display text-2xl font-bold text-dark-text">
        You&apos;re all set!
      </h2>
      <p className="mt-2 text-body-text">
        Your booking request was sent on WhatsApp. We&apos;ll confirm your slot
        shortly.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-white p-6 text-left text-sm">
        <dl className="space-y-3">
          <div className="flex justify-between">
            <dt className="text-muted">Psychologist</dt>
            <dd className="text-dark-text">{psychologist.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Date</dt>
            <dd className="text-dark-text">{formatDisplayDate(date)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Time</dt>
            <dd className="text-dark-text">{timeSlot} – {endTime}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Session</dt>
            <dd className="text-dark-text">{session.label} ({session.duration} min)</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Mode</dt>
            <dd className="text-dark-text">{modeLabel}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-6 text-sm text-body-text">
        If you didn&apos;t send the WhatsApp message, you can reach us again from
        the booking page. Your Google Meet link will be shared about 30 minutes
        before your session once we confirm.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          variant="outline"
          href={calendarUrl}
          className="!inline-flex"
        >
          Add to Google Calendar
        </Button>
        <Button href="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
