"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

/** Day hero video */
export const HERO_DAY_VIDEO = "/videos/Boy_reaching_for_glowing_hand_202606191256.mp4";

/** Night hero video */
export const HERO_NIGHT_VIDEO =
  "/videos/Boy_reaching_for_glowing_hand_202606191417.mp4";

export const HERO_FALLBACK_WEBP =
  "/videos/Gemini_Generated_Image_8iaulf8iaulf8iau.webp";

export const HERO_FALLBACK_IMAGE =
  "/videos/Gemini_Generated_Image_8iaulf8iaulf8iau.png";

export const HERO_NIGHT_FALLBACK_WEBP =
  "/videos/Gemini_Generated_Image_sr7ukusr7ukusr7u.webp";

export const HERO_NIGHT_FALLBACK_IMAGE =
  "/videos/Gemini_Generated_Image_sr7ukusr7ukusr7u.png";

/** Slow crossfade duration for day ↔ night hero videos */
const VIDEO_FADE_MS = 1000;

/** Prefer WebP with PNG fallback for hero background images */
export function heroFallbackBackground(webp: string, png: string) {
  return `image-set(url("${webp}") type("image/webp"), url("${png}") type("image/png"))`;
}

const DAY_GRADIENT =
  "linear-gradient(to right, rgba(248, 241, 232, 1) 0%, rgba(248, 241, 232, 1) 12%, rgba(248, 241, 232, 0.92) 28%, rgba(248, 241, 232, 0.55) 48%, rgba(248, 241, 232, 0) 62%)";

const NIGHT_GRADIENT =
  "linear-gradient(to right, rgba(18, 24, 21, 1) 0%, rgba(18, 24, 21, 1) 12%, rgba(18, 24, 21, 0.92) 28%, rgba(18, 24, 21, 0.55) 48%, rgba(18, 24, 21, 0) 62%)";

const MOBILE_DAY_GRADIENT =
  "linear-gradient(to bottom, rgba(248, 241, 232, 1) 0%, rgba(248, 241, 232, 0.9) 20%, rgba(248, 241, 232, 0.45) 55%, rgba(248, 241, 232, 0) 75%)";

const MOBILE_NIGHT_GRADIENT =
  "linear-gradient(to bottom, rgba(18, 24, 21, 1) 0%, rgba(18, 24, 21, 0.9) 20%, rgba(18, 24, 21, 0.45) 55%, rgba(18, 24, 21, 0) 75%)";

type HeroVideoProps = {
  variant?: "desktop" | "mobile";
};

function attemptPlay(video: HTMLVideoElement) {
  video.muted = true;
  video.playsInline = true;
  void video.play().catch(() => {});
}

function attachPlayback(
  video: HTMLVideoElement | null,
  onPlaying: () => void
): () => void {
  if (!video) return () => {};

  const markPlaying = () => onPlaying();
  const retry = () => {
    if (document.visibilityState !== "visible") return;
    attemptPlay(video);
  };

  attemptPlay(video);
  if (!video.paused && !video.ended) {
    markPlaying();
  }

  video.addEventListener("loadeddata", retry);
  video.addEventListener("canplay", retry);
  video.addEventListener("playing", markPlaying);
  window.addEventListener("pageshow", retry);
  document.addEventListener("visibilitychange", retry);

  return () => {
    video.removeEventListener("loadeddata", retry);
    video.removeEventListener("canplay", retry);
    video.removeEventListener("playing", markPlaying);
    window.removeEventListener("pageshow", retry);
    document.removeEventListener("visibilitychange", retry);
  };
}

function videoLayerStyle(visible: boolean, reducedMotion: boolean): CSSProperties {
  if (reducedMotion) {
    return { opacity: visible ? 1 : 0 };
  }

  return {
    opacity: visible ? 1 : 0,
    transition: `opacity ${VIDEO_FADE_MS}ms ease-in-out`,
  };
}

export default function HeroVideo({ variant = "desktop" }: HeroVideoProps) {
  const dayVideoRef = useRef<HTMLVideoElement>(null);
  const nightVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const { isNightMode } = useTheme();
  const isMobile = variant === "mobile";

  const videoClassName = isMobile
    ? "hero-video-cover hero-video-cover-mobile"
    : "hero-video-cover";

  const videoPreload = isMobile ? "auto" : "metadata";

  useEffect(() => {
    if (reducedMotion) {
      setIsPlaying(false);
      return;
    }

    const day = dayVideoRef.current;
    const night = nightVideoRef.current;

    if (isMobile) {
      const active = isNightMode ? night : day;
      const inactive = isNightMode ? day : night;
      inactive?.pause();
      setIsPlaying(false);
      return attachPlayback(active, () => setIsPlaying(true));
    }

    const cleanupDay = attachPlayback(day, () => {});
    const cleanupNight = attachPlayback(night, () => {});
    return () => {
      cleanupDay();
      cleanupNight();
    };
  }, [reducedMotion, isNightMode, isMobile]);

  const fadeClass = reducedMotion ? "" : "hero-theme-fade";

  const rootClassName = [
    "absolute inset-0 overflow-hidden",
    isMobile ? "hero-video-root--mobile" : "",
    isMobile && isPlaying ? "hero-video-root--playing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      {/* Fallback images — crossfade tied to data-theme */}
      <div
        className={`hero-video-fallback hero-theme-day absolute inset-0 ${fadeClass}`}
        style={{
          backgroundImage: heroFallbackBackground(
            HERO_FALLBACK_WEBP,
            HERO_FALLBACK_IMAGE
          ),
        }}
        aria-hidden
      />
      <div
        className={`hero-video-fallback hero-theme-night absolute inset-0 ${fadeClass}`}
        style={{
          backgroundImage: heroFallbackBackground(
            HERO_NIGHT_FALLBACK_WEBP,
            HERO_NIGHT_FALLBACK_IMAGE
          ),
        }}
        aria-hidden
      />

      {!reducedMotion && (
        <>
          <div
            className="hero-video-layer"
            style={videoLayerStyle(!isNightMode, reducedMotion)}
            aria-hidden
          >
            <video
              ref={dayVideoRef}
              src={HERO_DAY_VIDEO}
              poster={HERO_FALLBACK_WEBP}
              className={videoClassName}
              autoPlay
              muted
              loop
              playsInline
              preload={videoPreload}
            />
          </div>
          <div
            className="hero-video-layer"
            style={videoLayerStyle(isNightMode, reducedMotion)}
            aria-hidden
          >
            <video
              ref={nightVideoRef}
              src={HERO_NIGHT_VIDEO}
              poster={HERO_NIGHT_FALLBACK_WEBP}
              className={videoClassName}
              autoPlay
              muted
              loop
              playsInline
              preload={videoPreload}
            />
          </div>
        </>
      )}

      {isMobile ? (
        <>
          <div
            className={`hero-theme-day pointer-events-none absolute inset-0 z-[1] ${fadeClass}`}
            style={{ background: MOBILE_DAY_GRADIENT }}
            aria-hidden
          />
          <div
            className={`hero-theme-night pointer-events-none absolute inset-0 z-[1] ${fadeClass}`}
            style={{ background: MOBILE_NIGHT_GRADIENT }}
            aria-hidden
          />
        </>
      ) : (
        <>
          <div
            className={`hero-theme-day pointer-events-none absolute inset-0 z-[1] ${fadeClass}`}
            style={{ background: DAY_GRADIENT }}
            aria-hidden
          />
          <div
            className={`hero-theme-night pointer-events-none absolute inset-0 z-[1] ${fadeClass}`}
            style={{ background: NIGHT_GRADIENT }}
            aria-hidden
          />
        </>
      )}
    </div>
  );
}
