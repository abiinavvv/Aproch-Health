"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

// ─── TUNING GUIDE ────────────────────────────────────────────────────────────
//
// RING SPEEDS (RING_META):
//   0.06 = outermost ring barely drifts — feels very distant
//   0.32 = innermost ring drifts most — feels close
//
// RING SIZING (computed on resize):
//   Outer ring ≈ 98% of min(viewport width, 90vh)
//   Inner ring ≈ 18% of outer diameter
//   Equal gap between all 4 ring diameters: (outer - inner) / 3
//   Adjust OUTER_SCALE (0.98) or INNER_RATIO (0.18) to tune fill
//
// RING BORDER OPACITY:
//   0.20 → 0.38 (outer to inner)
//
// SCROLL RANGE:
//   scrollRange = window.innerHeight * 0.9 (matches min-h-[90vh])
// ─────────────────────────────────────────────────────────────────────────────

const OUTER_SCALE = 0.98;
const INNER_RATIO = 0.18;

const RING_META = [
  { borderOpacity: 0.2, speed: 0.06 },
  { borderOpacity: 0.26, speed: 0.12 },
  { borderOpacity: 0.32, speed: 0.2 },
  { borderOpacity: 0.38, speed: 0.32, filled: true },
] as const;

function computeRingSizes(viewportWidth: number, viewportHeight: number) {
  const maxDiameter = Math.min(viewportWidth, viewportHeight * 0.9) * OUTER_SCALE;
  const minDiameter = maxDiameter * INNER_RATIO;
  const gap = (maxDiameter - minDiameter) / (RING_META.length - 1);

  return RING_META.map((_, index) => maxDiameter - gap * index);
}

function useHeroMetrics() {
  const [metrics, setMetrics] = useState({
    scrollRange: 900,
    ringSizes: computeRingSizes(1200, 900),
  });

  useEffect(() => {
    const update = () => {
      const viewportHeight = window.innerHeight;
      setMetrics({
        scrollRange: viewportHeight * 0.9,
        ringSizes: computeRingSizes(window.innerWidth, viewportHeight),
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return metrics;
}

function useParallaxDrift(
  scrollY: MotionValue<number>,
  scrollRange: number,
  speed: number
) {
  const maxDrift = scrollRange * speed;
  return useTransform(scrollY, [0, scrollRange], [0, -maxDrift]);
}

function Ring({
  size,
  borderOpacity,
  speed,
  filled = false,
  scrollRange,
  scrollY,
  tone = "default",
}: {
  size: number;
  borderOpacity: number;
  speed: number;
  filled?: boolean;
  scrollRange: number;
  scrollY: MotionValue<number>;
  tone?: "default" | "light";
}) {
  const shouldReduce = useReducedMotion();
  const drift = useParallaxDrift(scrollY, scrollRange, speed);
  const y = useTransform(drift, (v) => `calc(-50% + ${v}px)`);

  const borderColor =
    tone === "light"
      ? `rgba(255,255,255,${borderOpacity})`
      : `rgba(46,204,139,${borderOpacity})`;
  const fillColor =
    tone === "light" ? "rgba(255,255,255,0.08)" : "rgba(46,204,139,0.06)";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 origin-center rounded-full"
      style={{
        width: size,
        height: size,
        x: "-50%",
        y: shouldReduce ? "-50%" : y,
        border: `${size < 200 ? 1.75 : 1.25}px solid ${borderColor}`,
        background: filled ? fillColor : "transparent",
      }}
    />
  );
}

export function HeroParallaxLayers({ tone = "default" }: { tone?: "default" | "light" }) {
  const { scrollRange, ringSizes } = useHeroMetrics();
  const { scrollY } = useScroll();

  return (
    <>
      {RING_META.map((ring, i) => (
        <Ring
          key={i}
          {...ring}
          size={ringSizes[i]}
          scrollRange={scrollRange}
          scrollY={scrollY}
          tone={tone}
        />
      ))}
    </>
  );
}
