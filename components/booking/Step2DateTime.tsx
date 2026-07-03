"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useBooking } from "@/context/BookingContext";
import {
  availableDays,
  availableTimeSlots,
  unavailableSlots,
  getSessionById,
  formatSessionEndTime,
} from "@/lib/sessions";

function toISODate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function Step2DateTime() {
  const { date, timeSlot, sessionType, setDateTime, nextStep } = useBooking();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const session = sessionType ? getSessionById(sessionType) : null;

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const isDateAvailable = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const dayOfWeek = d.getDay();
    if (!availableDays.includes(dayOfWeek)) return false;
    const iso = toISODate(viewYear, viewMonth, day);
    const todayIso = toISODate(today.getFullYear(), today.getMonth(), today.getDate());
    return iso >= todayIso;
  };

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = Array(firstDayOfWeek).fill(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [firstDayOfWeek, daysInMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const selectDate = (day: number) => {
    if (!isDateAvailable(day)) return;
    setDateTime(toISODate(viewYear, viewMonth, day), timeSlot || "");
  };

  const selectSlot = (slot: string) => {
    if (!date || unavailableSlots.includes(slot)) return;
    setDateTime(date, slot);
  };

  const selectedDateLabel = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <div>
      {/* ⚠️ Slots to be managed manually by Anirudh — update this array weekly */}
      <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
        When would you like your session?
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 md:mt-8 md:gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-4 md:p-6">
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <button type="button" onClick={prevMonth} aria-label="Previous month">
              <ChevronLeft size={18} className="text-body-text md:h-5 md:w-5" />
            </button>
            <span className="text-sm font-medium text-dark-text md:text-base">{monthLabel}</span>
            <button type="button" onClick={nextMonth} aria-label="Next month">
              <ChevronRight size={18} className="text-body-text md:h-5 md:w-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-muted md:gap-1 md:text-xs">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="py-1.5 font-medium md:py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5 md:gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const available = isDateAvailable(day);
              const iso = toISODate(viewYear, viewMonth, day);
              const selected = date === iso;
              return (
                <button
                  key={day}
                  type="button"
                  disabled={!available}
                  onClick={() => selectDate(day)}
                  className={`aspect-square rounded-full text-xs transition-colors md:text-sm ${
                    selected
                      ? "bg-primary text-white"
                      : available
                        ? "hover:ring-2 hover:ring-primary text-dark-text"
                        : "text-muted cursor-not-allowed opacity-40"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          {date ? (
            <>
              <h3 className="text-sm font-medium text-dark-text md:text-base">
                Available times on {selectedDateLabel}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2 md:mt-4 md:gap-3">
                {availableTimeSlots.map((slot) => {
                  const unavailable = unavailableSlots.includes(slot);
                  const selected = timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={unavailable}
                      onClick={() => selectSlot(slot)}
                      className={`rounded-full px-3 py-2 text-xs font-medium transition-colors md:px-4 md:py-2.5 md:text-sm ${
                        selected
                          ? "bg-primary text-white"
                          : unavailable
                            ? "bg-border text-muted cursor-not-allowed"
                            : "border border-border hover:border-primary text-body-text"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {session && timeSlot && (
                <p className="mt-3 text-xs text-muted md:mt-4 md:text-sm">
                  Each session is {session.duration} min. Your session ends at{" "}
                  {formatSessionEndTime(timeSlot, session.duration)}.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-body-text">Select a date to see available times.</p>
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-end md:mt-8">
        <Button variant="yellow" onClick={nextStep} disabled={!date || !timeSlot} className="!px-4 !py-2.5 text-xs md:!px-6 md:!py-3 md:text-sm">
          NEXT →
        </Button>
      </div>
    </div>
  );
}
