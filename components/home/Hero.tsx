"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import HeroRotatingHeadline from "./HeroRotatingHeadline";
// import { ArrowRight } from "lucide-react";
// import HeroVideo from "@/components/home/HeroVideo";
// import { useTheme } from "@/context/ThemeContext";
// import { heroThemeLayerStyle } from "@/lib/hero-theme-fade";

// const MOBILE_HERO_DAY = "/videos/boy2.png";
// const MOBILE_HERO_NIGHT = "/videos/boy1.png";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = shouldReduceMotion ?? false;
  const themeFadeClass = reducedMotion ? "" : "hero-theme-fade";

  return (
    <section className="hero-theme-sync relative flex min-h-0 flex-col bg-hero-fade-peach">
      {/* Soft peach day surface — continues into feature strip fade */}
      <div className="pointer-events-none absolute inset-0 bg-hero-fade-peach" aria-hidden>
        <div
          className={`hero-bg-day hero-theme-day absolute inset-0 ${themeFadeClass}`}
        />
        <div
          className={`hero-bg-night hero-theme-night absolute inset-0 ${themeFadeClass}`}
        />
      </div>

      {/* Mobile boy illustration — commented for Headspace white hero
      <div className="pointer-events-none absolute inset-0 z-[1] md:hidden" aria-hidden>
        <div
          className="hero-mobile-bg absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{
            ...heroThemeLayerStyle(!isNightMode, reducedMotion),
            backgroundImage: `url("${MOBILE_HERO_DAY}")`,
          }}
        />
        <div
          className="hero-mobile-bg absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{
            ...heroThemeLayerStyle(isNightMode, reducedMotion),
            backgroundImage: `url("${MOBILE_HERO_NIGHT}")`,
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white/85 via-white/35 to-transparent"
          style={heroThemeLayerStyle(!isNightMode, reducedMotion)}
        />
        <div
          className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#121815]/80 via-[#121815]/30 to-transparent"
          style={heroThemeLayerStyle(isNightMode, reducedMotion)}
        />
      </div>
      */}

      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center px-6 pb-4 pt-24 text-center md:pb-6 md:pt-32">
        <HeroRotatingHeadline className="text-center" />

        <p className="mt-4 max-w-md text-base leading-relaxed text-hero-subtext md:mt-5 md:text-lg">
          Book your first conversation, let us handle the rest
        </p>

        <div className="mt-6 w-[148px] max-w-[42vw] md:mt-8 md:w-[200px] md:max-w-none lg:w-[220px]">
          <Link
            href="/book"
            className="hero-book-image-btn inline-block w-full rounded-2xl"
          >
            <img
              src="/images/hero-book-cat.png"
              alt="Book Appointment"
              width={640}
              height={200}
              className="h-auto w-full select-none"
              draggable={false}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
