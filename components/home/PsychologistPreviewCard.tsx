"use client";

import GlassmorphismProfileCard from "@/components/ui/glassmorphism-profile-card";
import { getAllPsychologists } from "@/lib/psychologists";
import ScrollReveal from "./ScrollReveal";

export default function PsychologistPreviewCard() {
  const psychologists = getAllPsychologists();

  return (
    <section className="relative z-10 -mt-20 bg-hero-cream/30 px-4 pb-12 pt-52 md:mt-0 md:py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal>
          <h2 className="relative z-20 mb-8 text-center font-display text-[2.25rem] font-semibold text-dark-text md:mb-10">
            Meet our psychologists
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {psychologists.map((p, i) => (
            <ScrollReveal
              key={p.slug}
              delay={0.05 * i}
              className={
                i === psychologists.length - 1 && psychologists.length % 4 !== 0
                  ? "xl:col-span-4 xl:flex xl:justify-center"
                  : undefined
              }
            >
              <GlassmorphismProfileCard
                psychologist={p}
                className="w-full max-w-none xl:max-w-[320px]"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
