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
  { text: "Empowering" },
  { text: "young" },
  { text: "India" },
  { text: "with" },
  { text: "our" },
  { text: "therapist", highlight: true },
  { text: "through" },
  { text: "mental", highlight: true },
  { text: "wellness", highlight: true },
  { text: "support" },
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
            We are on a mission to provide comprehensive mental health support for
            students and young adults. Our passionate team is dedicated to
            fostering your well-being — one session at a time.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.1 * i}>
              <p className="font-display text-4xl font-bold text-primary md:text-5xl">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  active={isInView}
                />
              </p>
              <p className="mt-2 text-sm text-body-text">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
