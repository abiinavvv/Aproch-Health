"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import MinimalHeader from "@/components/layout/MinimalHeader";
import StepIndicator from "@/components/booking/StepIndicator";
import Step1SessionType from "@/components/booking/Step1SessionType";
import Step2DateTime from "@/components/booking/Step2DateTime";
import Step3UserDetails from "@/components/booking/Step3UserDetails";
import Step4Review from "@/components/booking/Step4Review";
import Button from "@/components/ui/Button";
import { BookingProvider, useBooking } from "@/context/BookingContext";

function BookingContent() {
  const { currentStep, prevStep } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    <Step1SessionType key="1" />,
    <Step2DateTime key="2" />,
    <Step3UserDetails key="3" />,
    <Step4Review key="4" />,
  ];

  return (
    <>
      <MinimalHeader />
      <div className="min-h-screen bg-hero-cream/25">
        <StepIndicator />
        <div className="mx-auto max-w-[800px] px-4 py-8 lg:px-6 lg:py-12">
        {currentStep > 1 && currentStep < 5 && (
          <div className="mb-6">
            <Button variant="outline" onClick={prevStep} className="!px-4 !py-2">
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

export default function BookPage() {
  return (
    <BookingProvider>
      <BookingContent />
    </BookingProvider>
  );
}
