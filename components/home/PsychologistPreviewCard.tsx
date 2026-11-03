"use client";

import GlassmorphismProfileCard, {
  type ProfessionalPreview,
} from "@/components/ui/glassmorphism-profile-card";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { getAllPsychologists, formatSessionFee } from "@/lib/psychologists";
import { getDefaultNutritionist } from "@/lib/nutritionists";
import { formatNutritionFee } from "@/lib/nutrition";

const CARD_CLASS = "w-full max-w-none xl:max-w-[380px]";

function getColStartClass(index: number, total: number): string {
  const remainder = total % 4;
  if (remainder === 0 || remainder === 3 || index < total - remainder) {
    return "";
  }

  const lastRowIndex = index - (total - remainder);
  if (remainder === 1) return "xl:col-start-2";
  if (remainder === 2) {
    return lastRowIndex === 0 ? "xl:col-start-2" : "xl:col-start-3";
  }

  return "";
}

export default function PsychologistPreviewCard() {
  const psychologists = getAllPsychologists();
  const nutritionist = getDefaultNutritionist();

  const professionals: ProfessionalPreview[] = [
    ...psychologists.map((p) => ({
      name: p.name,
      photo: p.photo,
      photoWebp: p.photoWebp,
      designation: p.designation,
      credentials: p.credentials,
      hoursValue: p.sessionHours,
      hoursLabel: "hours of therapy experience",
      feeDisplay: formatSessionFee(p.sessionFee),
      feeNote: "per session · video or audio",
      tagline: p.tagline,
      bookHref: `/book?psychologist=${p.slug}`,
      profileHref: `/our-psychologist/${p.slug}`,
      bookLabel: "Book a Session",
    })),
    {
      name: nutritionist.name,
      photo: nutritionist.photo,
      photoWebp: nutritionist.photoWebp,
      designation: nutritionist.designation,
      credentials: nutritionist.credentials,
      hoursValue: nutritionist.sessionHours,
      hoursLabel: "hours of nutrition practice",
      feeDisplay: formatNutritionFee(nutritionist.sessionFee),
      feeNote: "consult from · packages available",
      tagline: nutritionist.tagline,
      bookHref: `/book?service=nutrition&nutritionist=${nutritionist.slug}`,
      profileHref: `/nutrition/${nutritionist.slug}`,
      bookLabel: "Book a consultation",
    },
  ];

  return (
    <section className="relative z-10 bg-hero-cream/30 px-4 py-10 md:py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal>
          <h2 className="relative z-20 mb-2 text-left font-display text-3xl font-semibold text-dark-text md:mb-3 md:text-center md:text-[clamp(2.5rem,5vw,4.5rem)]">
            Meet our professionals
          </h2>
          <p className="mb-8 text-left text-sm text-body-text md:mb-10 md:text-center md:text-base">
            Available for online sessions
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:gap-8 xl:grid-cols-4">
          {professionals.map((professional, index) => {
            const colStartClass = getColStartClass(index, professionals.length);
            return (
              <ScrollReveal
                key={`${professional.name}-${index}`}
                delay={0.05 * index}
                className={cn("w-full", colStartClass)}
              >
                <GlassmorphismProfileCard
                  professional={professional}
                  className={CARD_CLASS}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
