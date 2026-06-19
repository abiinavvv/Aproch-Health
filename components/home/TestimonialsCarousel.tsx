"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Testimonial } from "@/types";
import ScrollReveal from "./ScrollReveal";

// ⚠️ Replace with real testimonials from Anirudh before launch
const testimonials: Testimonial[] = [
  {
    quote:
      "I didn't know what to expect, but my first session left me feeling genuinely heard.",
    name: "Rahul",
    city: "Mumbai",
  },
  {
    quote:
      "Finally found someone who understands academic burnout without judgment.",
    name: "Anjali",
    city: "Bangalore",
  },
  {
    quote:
      "The booking process was so easy, and the session fit my hostel schedule perfectly.",
    name: "Kiran",
    city: "Pune",
  },
  {
    quote:
      "I was skeptical about online therapy but this changed my mind completely.",
    name: "Meera",
    city: "Hyderabad",
  },
  {
    quote: "Affordable, private, and actually helpful. Highly recommend.",
    name: "Arjun",
    city: "Chennai",
  },
];

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const next = useCallback(() => {
    setActive((i) => (i + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next, shouldReduceMotion]);

  return (
    <section className="bg-hero-start px-4 py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <h2 className="mb-12 text-center font-display text-[2.25rem] font-semibold text-dark-text">
            What students say
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            className="overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <motion.div
              drag={shouldReduceMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) next();
                else if (info.offset.x > 50)
                  setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
              }}
              className="flex justify-center"
            >
              <div className="w-full max-w-lg rounded-2xl border border-border bg-white p-8 shadow-[0_8px_32px_rgba(28,16,8,0.06)]">
                <p className="text-lg leading-[1.7] text-body-text italic">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-dark-text">
                  — {testimonials[active].name}, {testimonials[active].city}
                </p>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === active ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
