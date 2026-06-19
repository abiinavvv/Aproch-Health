"use client";

import { Check } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const steps = [
  { num: 1, label: "Type" },
  { num: 2, label: "Date & Time" },
  { num: 3, label: "Your Details" },
  { num: 4, label: "Review" },
  { num: 5, label: "Done" },
];

export default function StepIndicator() {
  const { currentStep } = useBooking();
  const progress = ((currentStep - 1) / 4) * 100;

  return (
    <div className="border-b border-border bg-white px-4 py-6">
      <div className="mx-auto max-w-[800px]">
        <p className="mb-3 text-center text-sm font-medium text-body-text lg:hidden">
          Step {currentStep} of 5
        </p>
        <div className="mb-4 h-1 rounded-full bg-border lg:hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
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
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      isComplete
                        ? "bg-primary text-white"
                        : isActive
                          ? "bg-primary text-white"
                          : "bg-border text-muted"
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
