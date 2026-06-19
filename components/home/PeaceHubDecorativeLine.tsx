"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/** Vector stroke path from public/images/peacehub_decorative_line_green.svg */
const HERO_LINE_PATH = `
  M -50 40
  C 120 40, 120 340, 260 340
  C 320 340, 330 220, 430 220
  C 530 220, 540 340, 620 340
  L 820 340
  C 930 340, 980 260, 980 180
  C 980 90, 860 70, 860 150
  C 860 250, 1050 250, 1050 170
  C 1050 80, 1180 80, 1260 120
`;

export type PeaceHubLineMode = "load" | "scroll";

interface PeaceHubDecorativeLineProps {
  mode?: PeaceHubLineMode;
  triggerRef?: RefObject<HTMLElement | null>;
  className?: string;
  delay?: number;
  duration?: number;
  fit?: "cover" | "contain";
}

export default function PeaceHubDecorativeLine({
  mode = "load",
  triggerRef,
  className = "",
  delay = 0.35,
  duration = 2.8,
  fit = "cover",
}: PeaceHubDecorativeLineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();

      if (reducedMotion) {
        gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0, opacity: 0.7 });
        return;
      }

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });

      if (mode === "load") {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration,
          delay,
          ease: "power2.inOut",
        });
        return;
      }

      const trigger = triggerRef?.current ?? svgRef.current?.parentElement;
      if (!trigger) return;

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top 90%",
          end: "top 25%",
          scrub: 0.6,
        },
      });
    },
    { scope: svgRef, dependencies: [mode, delay, duration, reducedMotion, triggerRef] }
  );

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 1200 400"
      fill="none"
      className={className}
      preserveAspectRatio={fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
    >
      <path
        ref={pathRef}
        d={HERO_LINE_PATH}
        stroke="currentColor"
        strokeWidth={40}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-primary opacity-70"
      />
    </svg>
  );
}
