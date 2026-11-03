"use client";

import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import Tag from "@/components/ui/Tag";
import { useBooking } from "@/context/BookingContext";
import { getAllNutritionists } from "@/lib/nutritionists";
import { formatNutritionFee } from "@/lib/nutrition";
import { cn } from "@/lib/utils";

export default function Step1Nutritionist() {
  const { nutritionistSlug, setNutritionistSlug, nextStep } = useBooking();
  const nutritionists = getAllNutritionists();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
        Choose your dietitian
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-body-text md:text-base">
        Online nutrition support with clear plans and practical guidance.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4">
        {nutritionists.map((n) => {
          const selected = nutritionistSlug === n.slug;
          return (
            <button
              key={n.slug}
              type="button"
              onClick={() => setNutritionistSlug(n.slug)}
              className={cn(
                "flex gap-3 rounded-2xl border p-3 text-left transition-colors md:gap-4 md:p-4",
                selected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "border-border bg-white hover:border-primary/40"
              )}
            >
              <div className="psychologist-photo-avatar relative h-12 w-12 shrink-0 overflow-hidden rounded-xl md:h-16 md:w-16">
                <PsychologistPhoto
                  photo={n.photo}
                  photoWebp={n.photoWebp}
                  alt={n.name}
                  fill
                  className="psychologist-photo"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-dark-text md:text-base">{n.name}</p>
                <p className="text-xs text-muted">{n.designation}</p>
                <p className="mt-0.5 text-xs text-muted">
                  From {formatNutritionFee(n.sessionFee)} · consult or package
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {n.specialties.slice(0, 2).map((s) => (
                    <Tag key={s} className="!text-[10px]">
                      {s}
                    </Tag>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex justify-end md:mt-8">
        <button
          type="button"
          onClick={nextStep}
          disabled={!nutritionistSlug}
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:py-3 md:text-sm"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
