"use client";

import { Check } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const therapySteps = [
  { num: 1, label: "Psychologist" },
  { num: 2, label: "Date & Time" },
  { num: 3, label: "Your Details" },
  { num: 4, label: "Review" },
  { num: 5, label: "Done" },
];

const nutritionSteps = [
  { num: 1, label: "Offer" },
  { num: 2, label: "Dietitian" },
  { num: 3, label: "Date & Time" },
  { num: 4, label: "Your Details" },
  { num: 5, label: "Review" },
  { num: 6, label: "Done" },
];

export default function StepIndicator() {
  const { currentStep, service, doneStep } = useBooking();
  if (!service) return null;

  const steps = service === "nutrition" ? nutritionSteps : therapySteps;
  const total = doneStep;
  const progress = ((currentStep - 1) / (total - 1)) * 100;

  return (
    <div className="border-b border-border bg-white/90 px-4 py-4 backdrop-blur-sm md:py-6">
      <div className="mx-auto max-w-[800px]">
        <p className="mb-2 text-center text-xs font-semibold text-body-text md:mb-3 md:text-sm lg:hidden">
          Step {Math.min(currentStep, total)} of {total}
        </p>
        <div className="mb-3 h-1.5 rounded-full bg-border md:mb-4 lg:hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        <div className="hidden items-center justify-between lg:flex">
          {steps.map((step, i) => {
            const isComplete = currentStep > step.num;
            const isActive = currentStep === step.num;
            return (
              <div key={step.num} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold shadow-sm ${
                      isComplete
                        ? "bg-primary text-white shadow-[0_6px_16px_rgba(255,107,53,0.3)]"
                        : isActive
                          ? "bg-primary text-white shadow-[0_6px_16px_rgba(255,107,53,0.3)]"
                          : "bg-hero-cream text-muted"
                    }`}
                  >
                    {isComplete ? <Check size={18} /> : step.num}
                  </div>
                  <span
                    className={`mt-2 text-xs ${
                      isActive ? "font-semibold text-primary" : "text-muted"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      currentStep > step.num ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
