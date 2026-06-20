"use client";

import type { Psychologist } from "@/types";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import Tag from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

type StepPsychologistPickerProps = {
  psychologists: Psychologist[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  onContinue: () => void;
};

export default function StepPsychologistPicker({
  psychologists,
  selectedSlug,
  onSelect,
  onContinue,
}: StepPsychologistPickerProps) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-dark-text">
        Choose your psychologist
      </h2>
      <p className="mt-2 text-body-text">
        All our psychologists are RCI-registered and experienced with students and young adults.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {psychologists.map((p) => {
          const selected = selectedSlug === p.slug;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => onSelect(p.slug)}
              className={cn(
                "flex gap-4 rounded-2xl border p-4 text-left transition-colors",
                selected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "border-border bg-white hover:border-primary/40"
              )}
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <PsychologistPhoto
                  photo={p.photo}
                  photoWebp={p.photoWebp}
                  alt={p.name}
                  fill
                  className="psychologist-photo !object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-dark-text">{p.name}</p>
                <p className="text-xs text-muted">{p.designation}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.specialties.slice(0, 2).map((s) => (
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

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedSlug}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
