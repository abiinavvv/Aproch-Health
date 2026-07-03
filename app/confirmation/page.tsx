"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MinimalHeader from "@/components/layout/MinimalHeader";
import StepIndicator from "@/components/booking/StepIndicator";
import Step5Confirmation from "@/components/booking/Step5Confirmation";
import {
  BookingProvider,
  loadBookingFromSession,
} from "@/context/BookingContext";
import type { BookingState } from "@/types";

function getSavedBooking(): BookingState | null {
  const complete = sessionStorage.getItem("bookingComplete") === "true";
  if (!complete) return null;
  const saved = loadBookingFromSession();
  if (!saved?.sessionType || !saved.date || !saved.timeSlot) return null;
  return { ...saved, currentStep: 5 };
}

function ConfirmationInner() {
  return (
    <>
      <MinimalHeader />
      <div className="min-h-screen bg-hero-cream/25">
        <StepIndicator />
        <div className="mx-auto max-w-[800px] px-4 py-6 md:py-8 lg:px-6 lg:py-12">
          <Step5Confirmation />
        </div>
      </div>
    </>
  );
}

export default function ConfirmationPage() {
  const router = useRouter();
  const [saved, setSaved] = useState<BookingState | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const data = getSavedBooking();
    if (!data) router.replace("/book");
    else {
      // Reading sessionStorage on mount — client-only bootstrap
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync external store (sessionStorage) into React state
      setSaved(data);
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;
  if (!saved) return null;

  return (
    <BookingProvider initialState={saved}>
      <ConfirmationInner />
    </BookingProvider>
  );
}
