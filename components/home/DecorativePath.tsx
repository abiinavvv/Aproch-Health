"use client";

import { motion, useReducedMotion } from "framer-motion";

const SQUIGGLE_PATH =
  "M-40 120 C 80 40, 160 200, 280 100 S 480 20, 620 140 S 820 260, 960 80 S 1100 0, 1240 120";

interface DecorativePathProps {
  className?: string;
  variant?: "light" | "dark";
  animateOnMount?: boolean;
}

export default function DecorativePath({
  className = "",
  variant = "light",
  animateOnMount = false,
}: DecorativePathProps) {
  const shouldReduceMotion = useReducedMotion();
  const color = variant === "light" ? "text-white" : "text-primary";

  const motionProps = shouldReduceMotion
    ? { pathLength: 1, opacity: 0.35 }
    : animateOnMount
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 0.35 },
          transition: { duration: 1.2, ease: "easeInOut" as const },
        }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 0.35 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 1.2, ease: "easeInOut" as const },
        };

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-visible ${color} ${className}`}
      viewBox="0 0 1200 240"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.path
        d={SQUIGGLE_PATH}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...motionProps}
      />
    </svg>
  );
}
