"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sprout, ArrowRight } from "lucide-react";
import RealisticFogBackground from "@/components/ui/realistic-fog-background";
import HeroVideo, {
  HERO_FALLBACK_IMAGE,
  HERO_NIGHT_FALLBACK_IMAGE,
} from "@/components/home/HeroVideo";
import HeroFeatureStrip from "./HeroFeatureStrip";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [showCat, setShowCat] = useState(true);
  const heroMainRef = useRef<HTMLDivElement>(null);

  const mobileFadeClass = shouldReduceMotion ? "" : "hero-theme-fade";

  return (
    <section className="hero-theme-sync relative flex min-h-screen flex-col">
      {/* Synced solid background — same crossfade as video gradient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className={`hero-bg-day hero-theme-day absolute inset-0 ${mobileFadeClass}`}
        />
        <div
          className={`hero-bg-night hero-theme-night absolute inset-0 ${mobileFadeClass}`}
        />
      </div>

      {/* Mobile illustration overlay */}
      <div className="pointer-events-none absolute inset-0 md:hidden" aria-hidden>
        <div
          className={`hero-mobile-bg hero-theme-day absolute inset-0 bg-cover bg-center ${mobileFadeClass}`}
          style={{ backgroundImage: `url('${HERO_FALLBACK_IMAGE}')` }}
        />
        <div
          className={`hero-mobile-bg hero-theme-night absolute inset-0 bg-cover bg-center ${mobileFadeClass}`}
          style={{ backgroundImage: `url('${HERO_NIGHT_FALLBACK_IMAGE}')` }}
        />
      </div>

      <div ref={heroMainRef} className="relative flex min-h-0 flex-1 flex-col md:flex-row">
        <RealisticFogBackground
          trackRef={heroMainRef}
          reducedMotion={shouldReduceMotion ?? false}
          className="z-[5] hidden md:block"
        />

        {/* Left content zone — 40% */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 pb-8 pt-24 md:w-[40%] md:max-w-[520px] md:px-12 md:pb-0 md:pt-28 lg:pl-16 lg:pr-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-playfair text-[40px] font-extrabold leading-[1.08] text-hero-brown md:text-[60px] lg:text-[64px]">
              It only needs
              <br />
              <span className="text-hero-accent">a single touch.</span>
            </h1>

            <div className="my-5 flex items-center gap-3 md:my-6">
              <Sprout size={24} className="text-hero-accent" strokeWidth={2} aria-hidden />
              <div className="h-px w-[160px] bg-hero-accent md:w-[180px]" aria-hidden />
            </div>

            <p className="max-w-[300px] text-lg leading-relaxed text-hero-subtext md:text-xl md:leading-relaxed">
              Aproch Health is here to walk with you, at your pace.
            </p>

            <div className="relative mt-9 inline-block w-full md:mt-10 md:w-auto">
              {/* ⚠️ Replace with real cat PNG at public/images/cat.png before launch */}
              {showCat && (
                <img
                  src="/images/cat.png"
                  alt=""
                  className="pointer-events-none absolute -top-14 left-2 z-10 h-16 w-auto object-contain md:-top-16 md:left-4 md:h-20"
                  onError={() => setShowCat(false)}
                />
              )}
              <Link
                href="/book"
                className="btn-3d-warm relative inline-flex w-full items-center justify-center rounded-2xl px-10 py-5 text-xl font-semibold md:w-auto"
              >
                Book Appointment →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right video zone — 60% */}
        <div className="relative z-0 hidden flex-1 overflow-hidden md:block">
          <HeroVideo />
          <Link
            href="/how-it-works"
            className="glass-btn-warm absolute bottom-[8%] right-[4%] z-20 inline-flex items-center justify-center gap-2 rounded-2xl px-10 py-5 text-xl font-semibold"
          >
            How it works
            <ArrowRight size={22} aria-hidden />
          </Link>
        </div>
      </div>

      <HeroFeatureStrip />
    </section>
  );
}
