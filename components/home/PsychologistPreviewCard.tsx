"use client";

import GlassmorphismProfileCard from "@/components/ui/glassmorphism-profile-card";
import ScrollReveal from "./ScrollReveal";

export default function PsychologistPreviewCard() {
  return (
    <section className="bg-hero-cream/30 px-4 py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <h2 className="relative z-20 mb-10 text-center font-display text-[2.25rem] font-semibold text-dark-text">
            Meet your psychologist
          </h2>
        </ScrollReveal>

        <GlassmorphismProfileCard />
      </div>
    </section>
  );
}
