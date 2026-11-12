"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import HighlightHeading from "./HighlightHeading";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: 799, suffix: "", label: "Starting Price", prefix: "₹" },
  { value: 100, suffix: "%", label: "Online Sessions" },
  { value: 3, suffix: "+", label: "Years Experience" },
];

const missionWords = [
  { text: "We're" },
  { text: "reimagining", highlight: true },
  { text: "how" },
  { text: "people" },
  { text: "access" },
  { text: "mental", highlight: true },
  { text: "health", highlight: true },
  { text: "care" },
];

const missionBody = [
  "We make trusted online care easier to find and book — without the friction of outdated systems.",
  "We support students and young adults who want practical help with mental wellbeing and everyday nourishment.",
  "Sessions are fully online, so you can show up from wherever you are.",
  "Care on your terms: choose your professional, pick a time, and confirm on WhatsApp.",
];

function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
  active,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  active: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (shouldReduceMotion) return;

    const start = Date.now();
    let frame: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, shouldReduceMotion]);

  const display = !active ? 0 : shouldReduceMotion ? target : count;

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function MissionStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="theme-surface bg-white px-4 pt-14 pb-16 lg:px-6 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-[800px] text-center">
        <ScrollReveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">
            About Aproch Health
          </p>
        </ScrollReveal>

        <HighlightHeading
          words={missionWords}
          className="mx-auto mb-6 max-w-3xl font-display text-[clamp(1.85rem,4vw,3rem)] font-bold leading-tight tracking-tight"
          stagger={0.06}
        />

        <ScrollReveal delay={0.15}>
          <div className="mx-auto mb-12 max-w-2xl space-y-3 text-sm leading-relaxed text-body-text md:mb-14 md:text-base md:leading-[1.75]">
            {missionBody.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.1 * i}>
              <div className="rounded-3xl border border-border/80 bg-white px-2 py-5 text-center shadow-[0_8px_24px_rgba(26,26,26,0.04)] md:px-3 md:py-6">
                <p className="font-display text-xl font-bold text-primary sm:text-2xl md:text-4xl">
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    active={isInView}
                  />
                </p>
                <p className="mt-1.5 text-[11px] leading-tight text-body-text sm:text-xs md:mt-2 md:text-sm md:leading-normal">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
