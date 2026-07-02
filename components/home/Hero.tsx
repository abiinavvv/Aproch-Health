"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sprout, ArrowRight } from "lucide-react";
import RealisticFogBackground from "@/components/ui/realistic-fog-background";
import HeroVideo from "@/components/home/HeroVideo";
import HeroFeatureStrip from "./HeroFeatureStrip";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [showFog, setShowFog] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const heroMainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      const matches = mq.matches;
      setIsDesktop(matches);
      setShowFog(matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

      {!isDesktop && (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden"
          aria-hidden
        >
          <HeroVideo variant="mobile" />
        </div>
      )}

      <div ref={heroMainRef} className="relative flex min-h-0 flex-1 flex-col md:flex-row">
        {showFog && (
          <RealisticFogBackground
            trackRef={heroMainRef}
            reducedMotion={shouldReduceMotion ?? false}
            className="z-[5]"
          />
        )}

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

            <div className="relative mt-9 inline-block w-full md:mt-10 md:w-auto">
              <Link
                href="/book"
                className="hero-book-image-btn inline-block w-full max-w-[260px] rounded-2xl md:max-w-[320px]"
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
          </motion.div>
        </div>

        {/* Right video zone — 60% */}
        <div className="relative z-0 hidden flex-1 overflow-hidden md:block">
          {isDesktop && <HeroVideo variant="desktop" />}
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
