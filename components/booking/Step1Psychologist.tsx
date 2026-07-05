"use client";

import StepPsychologistPicker from "@/components/booking/StepPsychologistPicker";
import { useBooking } from "@/context/BookingContext";
import { getAllPsychologists } from "@/lib/psychologists";

export default function Step1Psychologist() {
  const { psychologistSlug, setPsychologistSlug, setSessionType, nextStep } =
    useBooking();

  const handleContinue = () => {
    setSessionType("introductory");
    nextStep();
  };

  return (
    <StepPsychologistPicker
      psychologists={getAllPsychologists()}
      selectedSlug={psychologistSlug}
      onSelect={setPsychologistSlug}
      onContinue={handleContinue}
    />
  );
}
