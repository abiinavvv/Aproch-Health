"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useBooking } from "@/context/BookingContext";
import { getPsychologistBySlug, getDefaultPsychologist, formatSessionFee } from "@/lib/psychologists";
import { introductorySession, formatSessionEndTime } from "@/lib/sessions";
import { formatDisplayDate, buildGoogleCalendarUrl } from "@/lib/calendar";

export default function Step5Confirmation() {
  const { psychologistSlug, sessionType, date, timeSlot, sessionMode } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  const psychologist =
    (psychologistSlug && getPsychologistBySlug(psychologistSlug)) ||
    getDefaultPsychologist();

  const session = introductorySession;
  if (!date || !timeSlot) return null;

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

  const details = [
    { label: "Psychologist", value: psychologist.name },
    { label: "Date", value: formatDisplayDate(date) },
    { label: "Time", value: `${timeSlot} – ${endTime}` },
    { label: "Session", value: `${session.label} (${session.duration} min)` },
    { label: "Session fee", value: formatSessionFee(psychologist.sessionFee) },
    { label: "Mode", value: modeLabel },
  ];

  return (
    <div className="mx-auto max-w-[520px] text-center">
      <motion.div
        initial={shouldReduceMotion ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 md:h-20 md:w-20"
      >
        <svg className="h-8 w-8 text-primary md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <h2 className="mt-4 font-display text-xl font-bold text-dark-text md:mt-6 md:text-2xl">
        You&apos;re all set!
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-body-text md:text-base">
        Your booking request was sent on WhatsApp. We&apos;ll confirm your slot
        shortly.
      </p>

      <div className="mt-5 rounded-2xl border border-border bg-white p-4 text-left text-xs md:mt-8 md:p-6 md:text-sm">
        <dl className="space-y-2.5 md:space-y-3">
          {details.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-0.5 border-b border-border pb-2.5 last:border-0 last:pb-0 md:flex-row md:justify-between md:gap-4 md:border-0 md:pb-0"
            >
              <dt className="text-xs font-medium text-muted md:text-sm md:font-normal">{label}</dt>
              <dd className="text-sm text-dark-text md:text-right">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-body-text md:mt-6 md:text-sm">
        If you didn&apos;t send the WhatsApp message, you can reach us again from
        the booking page. Your Google Meet link will be shared about 30 minutes
        before your session once we confirm.
      </p>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center md:mt-8 md:gap-3">
        <Button
          variant="outline"
          href={calendarUrl}
          className="!inline-flex !px-4 !py-2.5 text-xs md:!px-6 md:!py-3 md:text-sm"
        >
          Add to Google Calendar
        </Button>
        <Button href="/" variant="primary" className="!px-4 !py-2.5 text-xs md:!px-6 md:!py-3 md:text-sm">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
