import type { CSSProperties } from "react";

/** Matches --hero-fade-duration in globals.css */
export const HERO_LAYER_FADE_MS = 1400;

/** Desktop hero video crossfade (slightly faster than imagery layers) */
export const HERO_VIDEO_FADE_MS = 1000;

export function heroThemeLayerStyle(
  visible: boolean,
  reducedMotion: boolean,
  durationMs: number = HERO_LAYER_FADE_MS
): CSSProperties {
  if (reducedMotion) {
    return { opacity: visible ? 1 : 0 };
  }

  return {
    opacity: visible ? 1 : 0,
    transition: `opacity ${durationMs}ms ease-in-out`,
  };
}
