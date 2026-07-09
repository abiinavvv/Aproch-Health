import type { ReactNode } from "react";
import GlassmorphismProfileCard from "@/components/ui/glassmorphism-profile-card";
import { getAllPsychologists } from "@/lib/psychologists";
import { cn } from "@/lib/utils";
import type { Psychologist } from "@/types";

const CARD_CLASS = "w-full max-w-none xl:max-w-[380px]";

/** Center incomplete last rows in a 4-column desktop grid. */
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

type PsychologistCardGridProps = {
  psychologists?: Psychologist[];
  wrapCard?: (
    card: ReactNode,
    psychologist: Psychologist,
    index: number,
    gridItemClass: string
  ) => ReactNode;
};

export default function PsychologistCardGrid({
  psychologists = getAllPsychologists(),
  wrapCard,
}: PsychologistCardGridProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:gap-8 xl:grid-cols-4">
      {psychologists.map((psychologist, index) => {
        const colStartClass = getColStartClass(index, psychologists.length);
        const card = (
          <GlassmorphismProfileCard psychologist={psychologist} className={CARD_CLASS} />
        );

        if (wrapCard) {
          return wrapCard(card, psychologist, index, cn("w-full", colStartClass));
        }

        return (
          <GlassmorphismProfileCard
            key={psychologist.slug}
            psychologist={psychologist}
            className={cn(CARD_CLASS, colStartClass)}
          />
        );
      })}
    </div>
  );
}
