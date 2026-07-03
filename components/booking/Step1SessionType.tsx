"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import StepPsychologistPicker from "@/components/booking/StepPsychologistPicker";
import { useBooking } from "@/context/BookingContext";
import { getAllPsychologists, getPsychologistSessionFee } from "@/lib/psychologists";
import { sessionTypes } from "@/lib/sessions";
import type { SessionTypeId } from "@/types";

export default function Step1SessionType() {
  const {
    psychologistSlug,
    setPsychologistSlug,
    sessionType,
    setSessionType,
    nextStep,
  } = useBooking();

  const [phase, setPhase] = useState<"psychologist" | "session">(
    psychologistSlug ? "session" : "psychologist"
  );
  const [psychologistLocked] = useState(() => psychologistSlug !== null);

  useEffect(() => {
    if (psychologistSlug) setPhase("session");
  }, [psychologistSlug]);

  const select = (id: SessionTypeId) => setSessionType(id);
  const sessionFee = getPsychologistSessionFee(psychologistSlug);

  if (phase === "psychologist") {
    return (
      <StepPsychologistPicker
        psychologists={getAllPsychologists()}
        selectedSlug={psychologistSlug}
        onSelect={setPsychologistSlug}
        onContinue={() => setPhase("session")}
      />
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
        What kind of session are you looking for?
      </h2>

      {psychologistSlug && !psychologistLocked && (
        <button
          type="button"
          onClick={() => setPhase("psychologist")}
          className="mt-2 text-xs text-primary hover:underline md:text-sm"
        >
          ← Change psychologist
        </button>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-6">
        {sessionTypes.map((type) => (
          <Card
            key={type.id}
            selected={sessionType === type.id}
            onClick={() => select(type.id)}
            className="p-4 md:p-6"
          >
            <Badge variant="green">{type.duration} min</Badge>
            <h3 className="mt-3 text-base font-semibold text-dark-text md:mt-4 md:text-lg">
              {type.label}
            </h3>
            <p className="mt-1 text-xl font-bold text-primary md:text-2xl">
              ₹{sessionFee.toLocaleString("en-IN")}
            </p>
            <p className="mt-2 text-xs font-medium text-body-text md:text-sm">
              {type.tagline}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-body-text md:text-sm md:leading-[1.7]">
              {type.description}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-5 flex justify-end md:mt-8">
        <Button variant="yellow" onClick={nextStep} disabled={!sessionType} className="!px-4 !py-2.5 text-xs md:!px-6 md:!py-3 md:text-sm">
          NEXT →
        </Button>
      </div>
    </div>
  );
}
