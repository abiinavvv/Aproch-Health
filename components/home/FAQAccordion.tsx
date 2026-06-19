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
    <section className="theme-surface bg-white px-4 py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[800px]">
        <ScrollReveal>
          <h2 className="mb-12 text-center font-display text-[2.25rem] font-semibold text-dark-text">
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
                  className="flex w-full items-center justify-between p-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-medium text-dark-text pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-muted transition-transform duration-300 ${
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
                      <p className="px-5 pb-5 leading-[1.7] text-body-text">
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
