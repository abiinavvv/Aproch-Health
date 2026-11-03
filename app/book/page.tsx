"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import MinimalHeader from "@/components/layout/MinimalHeader";
import StepIndicator from "@/components/booking/StepIndicator";
import StepServiceSelect from "@/components/booking/StepServiceSelect";
import Step1Psychologist from "@/components/booking/Step1Psychologist";
import Step1Nutritionist from "@/components/booking/Step1Nutritionist";
import StepNutritionOffer from "@/components/booking/StepNutritionOffer";
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
import {
  getDefaultNutritionist,
  isValidNutritionistSlug,
} from "@/lib/nutritionists";
import type { BookingState, BookingStep, ServiceId } from "@/types";

function BookingContent() {
  const { currentStep, prevStep, service, maxBookStep } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  if (!service) {
    return (
      <>
        <MinimalHeader />
        <div className="min-h-screen bg-hero-cream/25">
          <div className="border-b border-border bg-white px-4 py-4 md:py-5">
            <p className="mx-auto max-w-[800px] text-center text-sm font-medium text-body-text">
              Choose a service to get started
            </p>
          </div>
          <div className="mx-auto max-w-[800px] px-4 py-6 md:py-8 lg:px-6 lg:py-12">
            <StepServiceSelect />
          </div>
        </div>
      </>
    );
  }

  const therapySteps = [
    <Step1Psychologist key="t1" />,
    <Step2DateTime key="t2" />,
    <Step3UserDetails key="t3" />,
    <Step4Review key="t4" />,
  ];

  const nutritionSteps = [
    <StepNutritionOffer key="n1" />,
    <Step1Nutritionist key="n2" />,
    <Step2DateTime key="n3" />,
    <Step3UserDetails key="n4" />,
    <Step4Review key="n5" />,
  ];

  const steps = service === "nutrition" ? nutritionSteps : therapySteps;

  return (
    <>
      <MinimalHeader />
      <div className="min-h-screen bg-hero-cream/25">
        <StepIndicator />
        <div className="mx-auto max-w-[800px] px-4 py-6 md:py-8 lg:px-6 lg:py-12">
          {currentStep >= 1 && currentStep <= maxBookStep && (
            <div className="mb-4 md:mb-6">
              <Button
                variant="outline"
                onClick={prevStep}
                className="!px-3 !py-1.5 text-xs md:!px-4 md:!py-2 md:text-sm"
              >
                ← Back
              </Button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${service}-${currentStep}`}
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

function buildInitialState(searchParams: URLSearchParams): BookingState {
  const serviceParam = searchParams.get("service");
  const nutritionistParam = searchParams.get("nutritionist");
  const psychologistParam = searchParams.get("psychologist");

  const wantsNutrition =
    serviceParam === "nutrition" ||
    (nutritionistParam !== null && isValidNutritionistSlug(nutritionistParam));

  const wantsTherapy =
    serviceParam === "therapy" ||
    (psychologistParam !== null && isValidPsychologistSlug(psychologistParam));

  if (wantsNutrition) {
    const nutritionistSlug =
      nutritionistParam && isValidNutritionistSlug(nutritionistParam)
        ? nutritionistParam
        : getDefaultNutritionist().slug;

    return {
      ...defaultBookingState,
      service: "nutrition" satisfies ServiceId,
      sessionType: null,
      nutritionistSlug,
      psychologistSlug: null,
      currentStep: 1,
    };
  }

  if (wantsTherapy) {
    const psychologistSlug =
      psychologistParam && isValidPsychologistSlug(psychologistParam)
        ? psychologistParam
        : null;

    return {
      ...defaultBookingState,
      service: "therapy",
      sessionType: "introductory",
      psychologistSlug,
      currentStep: (psychologistSlug ? 2 : 1) as BookingStep,
    };
  }

  // Plain /book — ask user to pick Therapy or Nutrition first
  return {
    ...defaultBookingState,
    service: null,
    currentStep: 1,
  };
}

function BookPageInner() {
  const searchParams = useSearchParams();
  const initialState = buildInitialState(searchParams);

  return (
    <BookingProvider initialState={initialState}>
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
