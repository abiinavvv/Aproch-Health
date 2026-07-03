"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

export type StackCardItem = {
  id: number | string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

export type StackCardProps = {
  cards: StackCardItem[];
  className?: string;
  /** Hint shown below the stack */
  hint?: string;
};

const OFFSET = 10;
const SCALE_STEP = 0.06;
const DIM_STEP = 0.15;
const STIFFNESS = 170;
const DAMPING = 26;
const BORDER_RADIUS = 16;

const spring: Transition = {
  type: "spring",
  stiffness: STIFFNESS,
  damping: DAMPING,
};

export default function StackCard({
  cards: initialCards,
  className,
  hint = "Drag the top card upward to reveal the next one",
}: StackCardProps) {
  const [cards, setCards] = useState(initialCards);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const moveToEnd = useCallback((index: number) => {
    setCards((prev) => [...prev.slice(index + 1), prev[index]]);
  }, []);

  const cycleNext = useCallback(() => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
  }, []);

  const stackGap =
    "var(--stack-gap, 2.25rem)";
  const stackTopSpace = `calc((${initialCards.length} - 1) * ${stackGap})`;

  return (
    <div
      className={cn("flex flex-col items-center", className)}
      style={{ paddingTop: stackTopSpace }}
    >
      <div className="relative aspect-[16/10] w-full max-w-[280px] overflow-visible sm:max-w-xs md:aspect-[4/3] md:max-w-md lg:max-w-lg">
        <ul className="relative m-0 h-full w-full p-0">
          {cards.map(({ id, src, alt, title, description }, i) => {
            const isFront = i === 0;
            const brightness = Math.max(0.35, 1 - i * DIM_STEP);
            const baseZ = cards.length - i;

            return (
              <motion.li
                key={id}
                className="theme-surface absolute h-full w-full list-none overflow-hidden rounded-2xl border-2 border-border bg-white shadow-[0_20px_40px_rgba(28,16,8,0.12)]"
                style={{
                  borderRadius: `${BORDER_RADIUS}px`,
                  cursor: isFront && !shouldReduceMotion ? "grab" : "auto",
                  touchAction: "none",
                  boxShadow:
                    i === 0
                      ? "0 20px 40px rgba(28, 16, 8, 0.14)"
                      : "0 10px 20px rgba(28, 16, 8, 0.08)",
                }}
                animate={{
                  top: `${i * -OFFSET}%`,
                  scale: 1 - i * SCALE_STEP,
                  filter: `brightness(${brightness})`,
                  zIndex: baseZ,
                }}
                transition={shouldReduceMotion ? { duration: 0 } : spring}
                drag={isFront && !shouldReduceMotion ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  if (info.offset.y < -40) moveToEnd(i);
                }}
                onClick={isFront && shouldReduceMotion ? cycleNext : undefined}
                whileDrag={
                  isFront && !shouldReduceMotion
                    ? {
                        zIndex: cards.length + 1,
                        cursor: "grabbing",
                        scale: 1 - i * SCALE_STEP + 0.04,
                        rotate: 2,
                      }
                    : undefined
                }
              >
                <img
                  src={src}
                  alt={alt}
                  className="pointer-events-none block h-full w-full object-cover"
                  draggable={false}
                />
                {(title || description) && (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c1008]/85 via-[#1c1008]/25 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white md:p-6">
                      {title && (
                        <p className="font-display text-base font-semibold text-white md:text-xl">
                          {title}
                        </p>
                      )}
                      {description && (
                        <p className="mt-1 text-xs leading-relaxed text-white/90 md:mt-2 md:text-sm">
                          {description}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>

      {hint && (
        <p className="mt-6 max-w-xs text-center text-xs leading-relaxed text-muted md:mt-10 md:max-w-sm md:text-sm">
          {hint}
        </p>
      )}
    </div>
  );
}
