"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import HighlightHeading from "./HighlightHeading";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: 500, suffix: "", label: "Starting Price", prefix: "₹" },
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
  { text: "healthcare.", highlight: true },
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
    <section ref={ref} className="theme-surface bg-white px-4 pt-8 pb-16 lg:px-6 lg:pt-10 lg:pb-20">
      <div className="mx-auto max-w-[900px] text-center">
        <ScrollReveal>
          <Heart
            className="mx-auto mb-5 text-hero-accent/70"
            size={44}
            strokeWidth={1.5}
            aria-hidden
          />
        </ScrollReveal>

        <HighlightHeading
          words={missionWords}
          className="mx-auto mb-6 max-w-3xl font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight"
          stagger={0.06}
        />

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mb-14 max-w-2xl text-base leading-[1.75] text-body-text">
            aproch is building a modern mental health ecosystem that helps people discover
            trusted therapist, book sessions through confidence and access thoughtful care
            all in one place
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-10">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.1 * i}>
              <p className="font-display text-2xl font-bold text-primary sm:text-3xl md:text-5xl">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  active={isInView}
                />
              </p>
              <p className="mt-1 text-[11px] leading-tight text-body-text sm:text-xs md:mt-2 md:text-sm md:leading-normal">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
