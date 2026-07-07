"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const DESKTOP_MQ = "(min-width: 768px)";
const FINE_POINTER_MQ = "(pointer: fine)";

function useGlowEffectsEnabled(shouldReduceMotion: boolean | null) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setEnabled(false);
      return;
    }

    const desktopMq = window.matchMedia(DESKTOP_MQ);
    const update = () => setEnabled(desktopMq.matches);
    update();
    desktopMq.addEventListener("change", update);
    return () => desktopMq.removeEventListener("change", update);
  }, [shouldReduceMotion]);

  return enabled;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "orange",
  size = "md",
  width,
  height,
  customSize = true,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const glowEnabled = useGlowEffectsEnabled(shouldReduceMotion);

  useEffect(() => {
    if (!glowEnabled) return;

    const finePointerMq = window.matchMedia(FINE_POINTER_MQ);
    if (!finePointerMq.matches) return;

    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, [glowEnabled]);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return "";
    return sizeMap[size];
  };

  const sharedClassName = cn(
    "glow-card",
    getSizeClasses(),
    !customSize && "aspect-[3/4]",
    "relative grid grid-rows-[1fr_auto] gap-4 rounded-2xl p-4",
    className
  );

  if (!glowEnabled) {
    return <div className={sharedClassName}>{children}</div>;
  }

  const getInlineStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      ["--base" as string]: base,
      ["--spread" as string]: spread,
      ["--radius" as string]: "14",
      ["--border" as string]: "3",
      ["--backdrop" as string]: "var(--glow-backdrop)",
      ["--backup-border" as string]: "var(--glow-backup-border)",
      ["--size" as string]: "200",
      ["--outer" as string]: "1",
      ["--border-size" as string]: "calc(var(--border, 2) * 1px)",
      ["--spotlight-size" as string]: "calc(var(--size, 150) * 1px)",
      ["--hue" as string]: "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: "var(--backdrop, transparent)",
      backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
      backgroundPosition: "50% 50%",
      backgroundAttachment: "fixed",
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative",
    };

    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    return baseStyles;
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={getInlineStyles()}
      className={cn(
        sharedClassName,
        "shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px]"
      )}
    >
      <div data-glow aria-hidden />
      {children}
    </div>
  );
}
