import type { CSSProperties } from "react";

/** Matches --hero-fade-duration in globals.css */
export const HERO_LAYER_FADE_MS = 1400;

/** Keep desktop hero video in sync with fallback/imagery crossfade */
export const HERO_VIDEO_FADE_MS = HERO_LAYER_FADE_MS;

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
