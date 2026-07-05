"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import MinimalHeader from "@/components/layout/MinimalHeader";
import StepIndicator from "@/components/booking/StepIndicator";
import Step1Psychologist from "@/components/booking/Step1Psychologist";
import Step2DateTime from "@/components/booking/Step2DateTime";
import Step3UserDetails from "@/components/booking/Step3UserDetails";
import Step4Review from "@/components/booking/Step4Review";
import Button from "@/components/ui/Button";
import {
  BookingProvider,
  defaultBookingState,
  useBooking,
} from "@/context/BookingContext";
import { isValidPsychologistSlug } from "@/lib/psychologists";

function BookingContent() {
  const { currentStep, prevStep } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    <Step1Psychologist key="1" />,
    <Step2DateTime key="2" />,
    <Step3UserDetails key="3" />,
    <Step4Review key="4" />,
  ];

  return (
    <>
      <MinimalHeader />
      <div className="min-h-screen bg-hero-cream/25">
        <StepIndicator />
        <div className="mx-auto max-w-[800px] px-4 py-6 md:py-8 lg:px-6 lg:py-12">
          {currentStep > 1 && currentStep < 5 && (
            <div className="mb-4 md:mb-6">
              <Button variant="outline" onClick={prevStep} className="!px-3 !py-1.5 text-xs md:!px-4 md:!py-2 md:text-sm">
                ← Back
              </Button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep - 1]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function BookPageInner() {
  const searchParams = useSearchParams();
  const slugParam = searchParams.get("psychologist");
  const psychologistSlug =
    slugParam && isValidPsychologistSlug(slugParam) ? slugParam : null;

  return (
    <BookingProvider
      initialState={{
        ...defaultBookingState,
        psychologistSlug,
        currentStep: psychologistSlug ? 2 : 1,
      }}
    >
      <BookingContent />
    </BookingProvider>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookPageInner />
    </Suspense>
  );
}
