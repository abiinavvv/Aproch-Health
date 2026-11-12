"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const PHRASES = [
  "Start where you are.",
  "You matter. Your wellbeing matters.",
  "A little closer to a healthier you.",
] as const;

const HOLD_MS = 3500;

interface HeroRotatingHeadlineProps {
  className?: string;
}

export default function HeroRotatingHeadline({
  className = "",
}: HeroRotatingHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, [shouldReduceMotion]);

  const textClass =
    "font-display text-[34px] font-extrabold leading-[1.15] tracking-tight text-hero-brown md:text-[48px] lg:text-[56px]";

  if (shouldReduceMotion) {
    return (
      <h1 className={`${textClass} ${className}`.trim()}>{PHRASES[0]}</h1>
    );
  }

  return (
    <h1
      className={`relative min-h-[2.4em] md:min-h-[2.3em] ${className}`.trim()}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={PHRASES[index]}
          className={`absolute inset-x-0 top-0 block ${textClass}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {PHRASES[index]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible tallest phrase reserves space so layout doesn’t jump */}
      <span className={`invisible block ${textClass}`} aria-hidden>
        You matter. Your wellbeing matters.
      </span>
    </h1>
  );
}
