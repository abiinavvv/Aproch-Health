"use client";

import Link from "next/link";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import ScrollReveal from "./ScrollReveal";
import { sessionTypes } from "@/lib/sessions";
import { psychologist } from "@/lib/psychologist";

const listItems = [
  {
    title: "Full Session",
    description: "60 minutes for deeper therapeutic work",
    href: "/book",
  },
  {
    title: "How booking works",
    description: "Simple steps from session pick to confirmation",
    href: "/how-it-works",
  },
];

export default function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();
  const introSession = sessionTypes[0];

  return (
    <section
      ref={ref}
      className="relative bg-hero-start px-4 py-16 lg:px-6 lg:py-20"
    >
      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ScrollReveal>
              <SectionTag># What we do</SectionTag>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-tight text-dark-text">
                Our mental health services
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-4 max-w-md text-base leading-[1.75] text-body-text">
                Online therapy designed for young India — affordable,
                confidential, and built around your schedule.
              </p>
            </ScrollReveal>

            <div className="mt-8 space-y-0 border-t border-border">
              {listItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between border-b border-border py-5 transition-colors hover:text-primary"
                  >
                    <div>
                      <p className="font-semibold text-dark-text group-hover:text-primary">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-body-text">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="theme-surface relative overflow-hidden rounded-3xl bg-white shadow-md"
          >
            <div className="relative aspect-[4/5] w-full sm:aspect-[5/4]">
              <PsychologistPhoto
                photo={psychologist.photo}
                photoWebp={psychologist.photoWebp}
                alt={psychologist.name}
                fill
                priority
                className="psychologist-photo px-4 pt-4"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-text/75 via-dark-text/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6">
                <div className="text-left">
                  <p className="text-2xl font-semibold text-white">
                    {introSession.label}
                  </p>
                  <p className="mt-1 text-sm text-white/80">
                    {introSession.duration} min · ₹{introSession.price}
                  </p>
                </div>
                <Button
                  href="/book"
                  variant="primary"
                  className="what-we-do-cta !bg-dark-text !border-dark-text hover:!bg-dark-text/90 shrink-0"
                >
                  Get Started →
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
