"use client";

import GlassmorphismProfileCard, {
  type ProfessionalPreview,
} from "@/components/ui/glassmorphism-profile-card";
import ScrollReveal from "./ScrollReveal";
import { getAllPsychologists, formatSessionFee } from "@/lib/psychologists";
import { getDefaultNutritionist } from "@/lib/nutritionists";
import { formatNutritionFee } from "@/lib/nutrition";

const CARD_CLASS = "w-full max-w-[380px]";

function ProfessionalGrid({ cards }: { cards: ProfessionalPreview[] }) {
  // Single card (e.g. dietitian) — center under the heading
  if (cards.length === 1) {
    return (
      <div className="flex w-full justify-center">
        <ScrollReveal className="flex w-full max-w-[380px]">
          <GlassmorphismProfileCard
            professional={cards[0]}
            className={CARD_CLASS}
          />
        </ScrollReveal>
      </div>
    );
  }

  // Multiple cards — fill left-to-right; leftover last-row cards stay left-aligned
  return (
    <div className="grid grid-cols-1 items-stretch justify-items-center gap-6 sm:grid-cols-2 md:gap-8 xl:grid-cols-4">
      {cards.map((professional, index) => (
        <ScrollReveal
          key={`${professional.name}-${index}`}
          delay={0.05 * index}
          className="flex h-full w-full justify-center"
        >
          <GlassmorphismProfileCard
            professional={professional}
            className={CARD_CLASS}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function PsychologistPreviewCard() {
  const psychologists = getAllPsychologists();
  const nutritionist = getDefaultNutritionist();

  const therapyCards: ProfessionalPreview[] = psychologists.map((p) => ({
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
    ctaTone: "therapy",
  }));

  const nutritionCards: ProfessionalPreview[] = [
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
      ctaTone: "nutrition",
    },
  ];

  return (
    <section className="relative z-10 bg-white px-4 py-14 md:py-16 lg:px-6 lg:py-24">
      <div className="mx-auto max-w-[1400px] space-y-16 md:space-y-20">
        <div>
          <ScrollReveal>
            <h2 className="relative z-20 mb-3 text-center font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-dark-text">
              Our Psychologists
            </h2>
            <p className="mb-10 text-center text-base text-body-text md:mb-12 md:text-lg">
              Online therapy with trained psychologists
            </p>
          </ScrollReveal>
          <ProfessionalGrid cards={therapyCards} />
        </div>

        <div>
          <ScrollReveal>
            <h2 className="relative z-20 mb-3 text-center font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-dark-text">
              Food & Nutrition
            </h2>
            <p className="mb-10 text-center text-base text-body-text md:mb-12 md:text-lg">
              Clinical dietitian support for lasting habits
            </p>
          </ScrollReveal>
          <ProfessionalGrid cards={nutritionCards} />
        </div>
      </div>
    </section>
  );
}
