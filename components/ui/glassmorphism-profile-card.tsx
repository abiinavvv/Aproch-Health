"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import type { Psychologist } from "@/types";
import { getDefaultPsychologist, formatSessionFee } from "@/lib/psychologists";
import { Calendar, Clock, Heart, IndianRupee, User, UserRound } from "lucide-react";

export type GlassmorphismProfileCardProps = {
  psychologist?: Psychologist;
  statusText?: string;
  bookHref?: string;
  profileHref?: string;
  className?: string;
};

function LotusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("h-3.5 w-3.5 text-dark-text md:h-4 md:w-4", className)}
    >
      <path d="M12 3c1.2 2.2 2.8 3.8 5 5-2.2 1.2-3.8 2.8-5 5-1.2-2.2-2.8-3.8-5-5 2.2-1.2 3.8-2.8 5-5zm-6.5 7c1 1.8 2.3 3.1 4 4-1.7.9-3 2.2-4 4-.9-1.8-2.2-3.1-4-4 1.8-.9 3.1-2.2 4-4zm13 0c1 1.8 2.3 3.1 4 4-1.7.9-3 2.2-4 4-.9-1.8-2.2-3.1-4-4 1.8-.9 3.1-2.2 4-4zM12 14.5c.8 1.4 1.8 2.4 3 3.2-1.2.7-2.2 1.7-3 3.2-.8-1.5-1.8-2.5-3-3.2 1.2-.8 2.2-1.8 3-3.2z" />
    </svg>
  );
}

function StatIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/80 bg-surface text-dark-text md:h-8 md:w-8">
      {children}
    </div>
  );
}

export default function GlassmorphismProfileCard({
  psychologist = getDefaultPsychologist(),
  statusText = "Available for online sessions",
  bookHref,
  profileHref,
  className,
}: GlassmorphismProfileCardProps) {
  const [timeText, setTimeText] = useState("");

  const resolvedBookHref = bookHref ?? `/book?psychologist=${psychologist.slug}`;
  const resolvedProfileHref =
    profileHref ?? `/our-psychologist/${psychologist.slug}`;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const hour12 = ((h + 11) % 12) + 1;
      const ampm = h >= 12 ? "PM" : "AM";
      setTimeText(`${hour12}:${m} ${ampm}`);
    };

    updateClock();
    const id = window.setInterval(updateClock, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn("relative mx-auto w-full max-w-[380px]", className)}
    >
      <article className="psychologist-profile-card theme-surface relative w-full overflow-visible rounded-[20px] border border-border/80 p-4 md:p-5 lg:p-6">
        <div className="mb-3 flex items-center justify-between gap-2 rounded-full border border-border/80 px-2.5 py-1.5 text-[10px] text-body-text md:mb-4 md:px-3 md:py-2 md:text-xs">
          <div className="flex min-w-0 items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-success"
              aria-hidden
            />
            <span className="truncate select-none">{statusText}</span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 border-l border-border/80 pl-2 md:pl-2.5">
            <Clock className="h-3 w-3 opacity-70 md:h-3.5 md:w-3.5" aria-hidden />
            <span className="tabular-nums">{timeText}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-border/80 md:h-40 md:w-40 lg:h-44 lg:w-44">
            <PsychologistPhoto
              photo={psychologist.photo}
              photoWebp={psychologist.photoWebp}
              alt={psychologist.name}
              fill
              className="psychologist-photo psychologist-profile-photo"
            />
          </div>

          <div className="mt-3 w-full text-center md:mt-4">
            <h3 className="font-display text-base font-bold leading-tight text-dark-text md:text-lg lg:text-xl">
              {psychologist.name}
            </h3>
            <div className="mt-1 flex justify-center">
              <LotusMark />
            </div>
            <p className="mt-1.5 text-[9px] font-medium uppercase leading-snug tracking-wide text-body-text md:text-[10px]">
              {psychologist.designation}
            </p>
            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-muted md:text-[10px]">
              {psychologist.credentials}
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-xl border border-border/80 md:mt-4">
          <div className="flex items-center gap-2 border-r border-border/80 p-2 md:p-2.5">
            <StatIcon>
              <User className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={1.75} aria-hidden />
            </StatIcon>
            <div className="min-w-0 text-left leading-tight">
              <p className="text-xs font-bold text-dark-text md:text-sm">
                {psychologist.sessionHours}
              </p>
              <p className="text-[9px] leading-tight text-muted md:text-[10px]">
                hours of therapy experience
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 md:p-2.5">
            <StatIcon>
              <IndianRupee className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={1.75} aria-hidden />
            </StatIcon>
            <div className="min-w-0 text-left leading-tight">
              <p className="text-xs font-bold text-dark-text md:text-sm">
                {formatSessionFee(psychologist.sessionFee)}
              </p>
              <p className="text-[9px] leading-tight text-muted md:text-[10px]">
                per session · video or audio
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-4 px-1 md:mt-5">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/80 bg-surface p-0.5">
            <Heart className="h-2.5 w-2.5 fill-dark-text text-dark-text md:h-3 md:w-3" aria-hidden />
          </div>
          <p className="rounded-full border border-border/80 px-3 py-2 text-center font-display text-xs italic text-dark-text md:px-4 md:py-2.5 md:text-sm">
            — {psychologist.tagline} —
          </p>
        </div>

        <div className="mt-4 md:mt-4">
          <Link
            href={resolvedBookHref}
            className="psychologist-profile-cta inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl text-xs font-semibold transition-colors md:h-9 md:rounded-xl md:text-xs"
          >
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Book a Session
          </Link>
        </div>

        <div className="mt-2 md:mt-2">
          <Link
            href={resolvedProfileHref}
            className="inline-flex h-9 w-full items-center justify-center gap-2 text-xs font-semibold text-dark-text transition-colors hover:text-primary md:h-8 md:text-xs"
          >
            <UserRound className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
            View full profile
          </Link>
        </div>
      </article>
    </motion.div>
  );
}
