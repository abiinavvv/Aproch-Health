"use client";

import Link from "next/link";
import { ArrowRight, Check, Leaf, MessageCircle } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import {
  homeBookingWorksLink,
  homeServiceCards,
  homeServicesIntro,
} from "@/lib/home-services";

const serviceIcons = {
  therapy: MessageCircle,
  nutrition: Leaf,
} as const;

export default function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative bg-hero-start px-4 pb-12 pt-28 md:px-6 md:pb-16 md:pt-24 lg:pb-20 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[900px]">
        <ScrollReveal>
          <h2 className="text-center font-display text-[clamp(1.85rem,4.5vw,3rem)] font-bold leading-tight tracking-tight text-dark-text">
            {homeServicesIntro.title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.06}>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-body-text md:mt-4 md:text-base md:leading-relaxed">
            {homeServicesIntro.subtitle}
          </p>
        </ScrollReveal>

        {/* Mobile only — pill entry to booking guide */}
        <ScrollReveal delay={0.1}>
          <Link
            href={homeBookingWorksLink.href}
            className="mt-5 flex items-center justify-between rounded-full border border-border bg-surface px-4 py-3.5 shadow-sm transition-colors active:bg-hero-cream/80 md:hidden"
          >
            <span className="text-sm font-semibold text-dark-text">
              {homeBookingWorksLink.title}
            </span>
            <ArrowRight size={18} className="shrink-0 text-muted" aria-hidden />
          </Link>
        </ScrollReveal>

        <div className="mt-5 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
          {homeServiceCards.map((card, i) => {
            const Icon = serviceIcons[card.id as keyof typeof serviceIcons];
            return (
              <motion.article
                key={card.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.12 + i * 0.08 }}
                className="flex flex-col rounded-2xl border border-border bg-white p-4 shadow-sm md:p-5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={18} strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-dark-text md:text-xl">
                    {card.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-body-text">
                  {card.tagline}
                </p>

                {card.pricing && (
                  <div className="mt-4 rounded-xl bg-hero-cream/60 px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {card.pricing.label}
                    </p>
                    <ul className="mt-1.5 space-y-1 text-sm font-medium text-dark-text">
                      {card.pricing.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="mt-4 flex flex-1 flex-col gap-2">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 rounded-xl bg-hero-cream/70 px-3 py-2.5 text-[13px] leading-relaxed text-body-text md:text-sm"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={card.learnMoreHref}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  Learn more
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
