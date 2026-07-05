"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RealisticFogBackground from "@/components/ui/realistic-fog-background";
import HeroVideo from "@/components/home/HeroVideo";
import HeroFeatureStrip from "./HeroFeatureStrip";
import { useTheme } from "@/context/ThemeContext";
import { heroThemeLayerStyle } from "@/lib/hero-theme-fade";

const MOBILE_HERO_DAY = "/videos/boy2.png";
const MOBILE_HERO_NIGHT = "/videos/boy1.png";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { isNightMode } = useTheme();
  const [showFog, setShowFog] = useState(false);
  const heroMainRef = useRef<HTMLDivElement>(null);
  const reducedMotion = shouldReduceMotion ?? false;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowFog(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    [MOBILE_HERO_DAY, MOBILE_HERO_NIGHT].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const themeFadeClass = reducedMotion ? "" : "hero-theme-fade";
  const dayLayerStyle = heroThemeLayerStyle(!isNightMode, reducedMotion);
  const nightLayerStyle = heroThemeLayerStyle(isNightMode, reducedMotion);

  return (
    <section className="hero-theme-sync relative flex min-h-0 flex-col md:min-h-screen">
      {/* Synced solid background — same crossfade as video gradient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className={`hero-bg-day hero-theme-day absolute inset-0 ${themeFadeClass}`}
        />
        <div
          className={`hero-bg-night hero-theme-night absolute inset-0 ${themeFadeClass}`}
        />
      </div>

      {/* Mobile boy illustration — background overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] md:hidden" aria-hidden>
        <div
          className="hero-mobile-bg absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{
            ...dayLayerStyle,
            backgroundImage: `url("${MOBILE_HERO_DAY}")`,
          }}
        />
        <div
          className="hero-mobile-bg absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{
            ...nightLayerStyle,
            backgroundImage: `url("${MOBILE_HERO_NIGHT}")`,
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-hero-cream/80 via-hero-cream/30 to-transparent"
          style={dayLayerStyle}
        />
        <div
          className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#121815]/80 via-[#121815]/30 to-transparent"
          style={nightLayerStyle}
        />
      </div>

      <div ref={heroMainRef} className="relative flex min-h-0 flex-1 flex-col md:flex-row">
        {showFog && (
          <RealisticFogBackground
            trackRef={heroMainRef}
            reducedMotion={shouldReduceMotion ?? false}
            className="z-[5]"
          />
        )}

        {/* Mobile hero */}
        <div className="relative z-10 flex min-h-[min(88vh,720px)] flex-col items-start px-6 pb-32 pt-24 text-left md:hidden">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex w-full max-w-[420px] flex-col items-start"
          >
            <h1 className="font-playfair text-[40px] font-extrabold leading-[1.08] text-hero-brown">
              It only needs
              <br />
              <span className="text-hero-accent">a single touch.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="absolute bottom-[24%] right-3 z-30 w-[148px] max-w-[38vw]"
          >
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
          </motion.div>
        </div>

        {/* Desktop left content zone — 40% */}
        <div className="relative z-10 hidden w-full flex-col justify-center px-6 pb-8 pt-24 md:flex md:w-[40%] md:max-w-[520px] md:px-12 md:pb-0 md:pt-28 lg:pl-16 lg:pr-8">
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
