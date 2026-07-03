"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/types";

interface FAQAccordionProps {
  items: FAQItem[];
  heading?: string;
}

import ScrollReveal from "./ScrollReveal";

export default function FAQAccordion({
  items,
  heading = "Common questions",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="theme-surface bg-white px-4 py-8 md:py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[800px]">
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-semibold text-dark-text md:mb-12 md:text-[2.25rem]">
            {heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-border bg-white overflow-hidden"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-4 text-left md:p-5"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="pr-4 text-sm font-medium text-dark-text md:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-[18px] w-[18px] shrink-0 text-muted transition-transform duration-300 md:h-5 md:w-5 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-4 pb-4 text-sm leading-relaxed text-body-text md:px-5 md:pb-5 md:text-base md:leading-[1.7]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
