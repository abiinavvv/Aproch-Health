"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import {
  homeBookingWorksLink,
  homeServiceCards,
  homeServicesIntro,
} from "@/lib/home-services";

const serviceImages = {
  therapy: {
    src: "/images/service-therapy.jpg",
    alt: "Therapy session illustration",
  },
  nutrition: {
    src: "/images/service-nutrition.jpg",
    alt: "Nutrition bowl illustration",
  },
} as const;

export default function WhatWeDo() {
  return (
    <section className="relative bg-white px-4 pb-16 pt-10 md:px-6 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
      <div className="relative mx-auto w-full max-w-[980px]">
        <ScrollReveal>
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-dark-text">
            {homeServicesIntro.title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.06}>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-body-text md:text-lg">
            {homeServicesIntro.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Link
            href={homeBookingWorksLink.href}
            className="mx-auto mt-6 flex max-w-md items-center justify-between rounded-full border border-border bg-white px-5 py-3.5 shadow-sm transition-colors hover:border-primary/30 md:hidden"
          >
            <span className="text-sm font-semibold text-dark-text">
              {homeBookingWorksLink.title}
            </span>
            <ArrowRight size={18} className="shrink-0 text-primary" aria-hidden />
          </Link>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          {homeServiceCards.map((card) => {
            const image = serviceImages[card.id as keyof typeof serviceImages];
            return (
              <article
                key={card.id}
                className="flex flex-col rounded-[28px] border border-border/80 bg-white p-5 shadow-[0_12px_40px_rgba(26,26,26,0.04)] md:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f5f2] ring-1 ring-border/60 md:h-16 md:w-16">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain p-1"
                    />
                  </span>
                  <h3 className="font-display text-xl font-bold text-dark-text md:text-2xl">
                    {card.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-body-text md:text-base">
                  {card.tagline}
                </p>

                {card.pricing && (
                  <div className="mt-5 rounded-2xl bg-white px-4 py-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {card.pricing.label}
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm font-semibold text-dark-text">
                      {card.pricing.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 rounded-2xl bg-white px-3.5 py-3 text-[13px] leading-relaxed text-body-text md:text-sm"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={card.learnMoreHref}
                  className="btn-coral mt-5 inline-flex items-center gap-1.5 self-start px-6 py-3 text-sm font-semibold"
                >
                  Learn more
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
