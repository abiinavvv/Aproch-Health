"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Compassionate Care",
    description:
      "A warm, judgment-free space where you’re heard with care — so opening up feels a little easier.",
    href: "/therapy",
    cta: "Explore therapy",
    fill: "bg-[#FFB4D9]",
    icon: "/images/feature-compassionate-care.jpg",
    iconAlt: "Smiling heart icon",
  },
  {
    title: "Personalized Support",
    description:
      "Plans and sessions shaped around your goals, pace, and daily life — not a one-size-fits-all script.",
    href: "/book",
    cta: "Book a session",
    fill: "bg-[#FFE566]",
    icon: "/images/feature-personalized-support.jpg",
    iconAlt: "Smiling plant icon",
  },
  {
    title: "Evidence-Based",
    description:
      "Guidance grounded in proven approaches, delivered by trained professionals who stay with you.",
    href: "/how-it-works",
    cta: "How it works",
    fill: "bg-[#9EE8C4]",
    icon: "/images/feature-evidence-based.jpg",
    iconAlt: "Smiling book with checkmark icon",
  },
  {
    title: "Safe & Confidential",
    description:
      "Your conversations stay private. We protect your information so you can focus on feeling better.",
    href: "/book",
    cta: "Get started",
    fill: "bg-[#A8D4F5]",
    icon: "/images/feature-safe-confidential.jpg",
    iconAlt: "Smiling shield with lock icon",
  },
] as const;

export default function HeroFeatureStrip() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollLeft = scroller.scrollLeft;
    let closest = 0;
    let closestDist = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const dist = Math.abs(card.offsetLeft - scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateActiveIndex();
    scroller.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      scroller.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIndex(index);
  };

  return (
    <section className="hero-feature-fade pb-12 pt-2 md:pb-16 md:pt-3 lg:pb-20">
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6">
        <h2 className="text-center font-display text-[clamp(1.85rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-dark-text">
          Why people choose Aproch
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-body-text md:text-lg">
          Care that feels human — clear, private, and built around you.
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pl-5 pr-4 md:mt-10 md:gap-5 md:pl-8 md:pr-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {features.map((feature, i) => (
          <article
            key={feature.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`flex min-h-[420px] w-[78vw] shrink-0 snap-start flex-col items-center rounded-[2.5rem] p-8 text-center md:min-h-[520px] md:w-[min(520px,48vw)] md:rounded-[2.75rem] md:p-12 lg:min-h-[560px] lg:w-[560px] ${feature.fill}`}
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-3xl bg-white/70 shadow-[0_8px_20px_rgba(26,26,26,0.08)] md:h-24 md:w-24">
              <Image
                src={feature.icon}
                alt={feature.iconAlt}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-7 font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-dark-text md:mt-8 md:text-[2.15rem]">
              {feature.title}
            </h3>
            <p className="mt-4 max-w-[28rem] flex-1 text-base leading-relaxed text-dark-text/75 md:mt-5 md:text-lg">
              {feature.description}
            </p>
            <Link
              href={feature.href}
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#1a1a1a] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(26,26,26,0.18)] transition-colors hover:bg-black md:mt-10 md:px-8 md:py-3.5 md:text-base"
            >
              {feature.cta}
            </Link>
          </article>
        ))}
        <div className="w-4 shrink-0 md:w-6" aria-hidden />
      </div>

      <div
        className="mt-5 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Feature cards"
      >
        {features.map((feature, i) => (
          <button
            key={feature.title}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`Show ${feature.title}`}
            onClick={() => scrollToCard(i)}
            className={`h-2 rounded-full transition-all ${
              activeIndex === i
                ? "w-5 bg-[#1a1a1a]"
                : "w-2 bg-[#1a1a1a]/25 hover:bg-[#1a1a1a]/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
