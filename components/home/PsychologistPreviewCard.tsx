"use client";

import PsychologistCardGrid from "@/components/psychologists/PsychologistCardGrid";
import ScrollReveal from "./ScrollReveal";

export default function PsychologistPreviewCard() {
  return (
    <section className="relative z-10 -mt-20 bg-hero-cream/30 px-4 pb-12 pt-52 md:mt-0 md:py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal>
          <h2 className="relative z-20 mb-8 text-center font-display text-3xl font-semibold text-dark-text md:mb-10 md:text-[clamp(3rem,5vw,5rem)]">
            Meet our psychologists
          </h2>
        </ScrollReveal>

        <PsychologistCardGrid
          wrapCard={(card, psychologist, index, gridItemClass) => (
            <ScrollReveal key={psychologist.slug} delay={0.05 * index} className={gridItemClass}>
              {card}
            </ScrollReveal>
          )}
        />
      </div>
    </section>
  );
}
