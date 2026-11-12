"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";

const WARM_ACCENT = "#FF6B35";
const WARM_ACCENT_SOFT = "rgba(255,107,53,0.1)";

const steps = [
  {
    icon: "/images/step-choose-psychologist.jpg",
    iconAlt: "Smiling calendar icon",
    number: "Step 1",
    title: "Choose your psychologist",
    description: "Browse available professionals and select the right fit.",
  },
  {
    icon: "/images/step-pick-datetime.jpg",
    iconAlt: "Smiling clock icon",
    number: "Step 2",
    title: "Pick a date & time",
    description: "Select a slot that works for you.",
  },
  {
    icon: "/images/step-confirm-whatsapp.jpg",
    iconAlt: "Smiling chat bubble icon",
    number: "Step 3",
    title: "Confirm on WhatsApp",
    description: "Send your booking request and we’ll confirm your slot.",
  },
] as const;

function StepCard({
  step,
  className = "",
}: {
  step: (typeof steps)[number];
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <div
          className="relative h-[68px] w-[68px] overflow-hidden rounded-full border-2 md:h-[88px] md:w-[88px] lg:h-[96px] lg:w-[96px]"
          style={{
            borderColor: WARM_ACCENT,
            backgroundColor: WARM_ACCENT_SOFT,
          }}
        >
          <Image
            src={step.icon}
            alt={step.iconAlt}
            fill
            sizes="96px"
            className="rounded-full object-cover"
          />
        </div>

        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Check size={11} color="white" />
        </div>
      </div>

      <span
        className="mt-2 text-[10px] font-medium uppercase tracking-wider md:mt-4 md:text-[11px] md:tracking-widest"
        style={{ color: WARM_ACCENT }}
      >
        {step.number}
      </span>

      <span className="mt-2 text-center text-xs font-semibold leading-tight text-dark-text md:mt-1.5 md:text-base lg:text-lg">
        {step.title}
      </span>
      <span className="mt-1.5 max-w-[11rem] text-center text-[11px] leading-snug text-body-text md:mt-2 md:max-w-[14rem] md:text-sm">
        {step.description}
      </span>
    </div>
  );
}

function HorizontalConnector() {
  return (
    <div className="relative mx-0.5 mt-[34px] h-[2px] min-w-[8px] max-w-[24px] flex-1 overflow-hidden bg-border md:mx-2 md:mt-[44px] md:min-w-[32px] md:max-w-[100px] lg:mt-[48px] lg:max-w-[120px]">
      <div className="absolute inset-y-0 left-0 w-full bg-primary" />
    </div>
  );
}

export default function HowItWorksSteps() {
  return (
    <section className="theme-surface min-h-0 bg-white px-4 py-14 md:min-h-[520px] md:py-20 lg:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="mb-3 text-left text-xs font-medium uppercase tracking-widest text-primary md:text-center">
          Simple process
        </p>

        <h2 className="mb-3 text-center font-display text-[clamp(1.85rem,4vw,3rem)] font-bold leading-tight tracking-tight text-dark-text">
          Book your first session in 3 steps
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-body-text md:mb-14 md:text-base lg:mb-20">
          From choosing a professional to confirming on WhatsApp — clear steps,
          no guesswork.
        </p>

        <div className="flex w-full items-start justify-center">
          {steps.map((step, i) => (
            <div key={step.number} className="flex min-w-0 flex-1 items-start md:flex-none">
              <StepCard
                step={step}
                className="w-full min-w-0 md:w-[240px] lg:w-[280px]"
              />
              {i < steps.length - 1 && <HorizontalConnector />}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-16 lg:mt-20">
          <Button href="/book" variant="primary">
            Book a Session
          </Button>
        </div>
      </div>
    </section>
  );
}
