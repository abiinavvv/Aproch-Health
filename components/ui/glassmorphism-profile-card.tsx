"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card-primitives";
import { cn } from "@/lib/utils";
import PsychologistPhoto from "@/components/ui/PsychologistPhoto";
import type { Psychologist } from "@/types";
import { getDefaultPsychologist, formatTherapyHours, formatSessionFee } from "@/lib/psychologists";
import { Calendar, Clock, UserRound } from "lucide-react";

export type GlassmorphismProfileCardProps = {
  psychologist?: Psychologist;
  statusText?: string;
  bookHref?: string;
  profileHref?: string;
  className?: string;
};

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
      setTimeText(`${hour12}:${m}${ampm}`);
    };

    updateClock();
    const id = window.setInterval(updateClock, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const subtitle = useMemo(
    () => `${psychologist.designation} · ${psychologist.credentials}`,
    [psychologist.designation, psychologist.credentials]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn("relative mx-auto w-full max-w-md", className)}
    >
      <Card className="glass-profile-card relative mx-auto w-full overflow-visible rounded-[20px] shadow-[0_20px_50px_rgba(28,16,8,0.12)]">
        <CardContent className="p-4 md:p-5 lg:p-6">
          <div className="mb-3 flex items-center justify-between text-xs text-muted md:mb-4 md:text-sm">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-success"
                aria-hidden
              />
              <span className="select-none">{statusText}</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Clock className="h-4 w-4" aria-hidden />
              <span className="tabular-nums">{timeText}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 md:gap-5">
            <div className="glass-profile-avatar relative h-32 w-32 shrink-0 overflow-hidden rounded-[20px] ring-2 ring-hero-accent/25 md:h-40 md:w-40 lg:h-44 lg:w-44">
              <PsychologistPhoto
                photo={psychologist.photo}
                photoWebp={psychologist.photoWebp}
                alt={psychologist.name}
                fill
                className="psychologist-photo"
              />
            </div>
            <div className="min-w-0 text-center">
              <p className="truncate font-display text-base font-semibold tracking-tight text-dark-text md:text-lg lg:text-xl">
                {psychologist.name}
              </p>
              <p className="mt-1 text-xs text-body-text md:text-sm">{subtitle}</p>
              <p className="mt-1 text-xs text-muted">
                {formatTherapyHours(psychologist.sessionHours)}
              </p>
              <p className="mt-1 text-xs text-muted">
                {formatSessionFee(psychologist.sessionFee)} per session · video or audio
              </p>
              {psychologist.rciNumber && (
                <p className="mt-1 text-xs text-muted">RCI · {psychologist.rciNumber}</p>
              )}
            </div>
          </div>

          <div className="mt-5 md:mt-6">
            <Link
              href={resolvedBookHref}
              className={cn(
                "inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 md:h-12 md:gap-3",
                "bg-white/60 text-xs font-semibold text-dark-text transition-colors md:text-sm",
                "hover:border-primary hover:bg-white/80 hover:text-primary"
              )}
            >
              <Calendar className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" aria-hidden />
              Book a Session
            </Link>
          </div>

          <div className="mt-2 md:mt-3">
            <Link
              href={resolvedProfileHref}
              className={cn(
                "inline-flex h-9 w-full items-center justify-center gap-2 rounded-2xl md:h-11",
                "text-xs font-semibold text-primary transition-colors hover:text-primary-dark md:text-sm"
              )}
            >
              <UserRound className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
              View full profile
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
