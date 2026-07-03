"use client";

import type { Psychologist } from "@/types";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import Tag from "@/components/ui/Tag";
import { formatSessionFee } from "@/lib/psychologists";
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
      <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
        Choose your psychologist
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-body-text md:text-base">
        All our psychologists are RCI-registered and experienced with students and young adults.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4">
        {psychologists.map((p) => {
          const selected = selectedSlug === p.slug;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => onSelect(p.slug)}
              className={cn(
                "flex gap-3 rounded-2xl border p-3 text-left transition-colors md:gap-4 md:p-4",
                selected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "border-border bg-white hover:border-primary/40"
              )}
            >
              <div className="psychologist-photo-avatar relative h-12 w-12 shrink-0 overflow-hidden rounded-xl md:h-16 md:w-16">
                <PsychologistPhoto
                  photo={p.photo}
                  photoWebp={p.photoWebp}
                  alt={p.name}
                  fill
                  className="psychologist-photo"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-dark-text md:text-base">{p.name}</p>
                <p className="text-xs text-muted">{p.designation}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {p.sessionHours} therapy hours · {formatSessionFee(p.sessionFee)} per session
                </p>
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

      <div className="mt-5 flex justify-end md:mt-8">
        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedSlug}
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:py-3 md:text-sm"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
