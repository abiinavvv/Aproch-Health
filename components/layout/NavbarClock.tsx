"use client";

import { useEffect, useState } from "react";
import {
  formatLiveClock,
  formatLiveClockIso,
} from "@/lib/theme-schedule";

type NavbarClockProps = {
  className?: string;
};

export default function NavbarClock({ className = "" }: NavbarClockProps) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());

    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const formatted = mounted && now ? formatLiveClock(now) : "--:--:--";
  const iso = mounted && now ? formatLiveClockIso(now) : undefined;

  return (
    <time
      dateTime={iso}
      className={`glass-btn-warm inline-flex h-10 min-w-[6.75rem] items-center justify-center rounded-full px-3 text-sm font-medium tabular-nums sm:min-w-[7.25rem] ${className}`}
      aria-label={
        mounted && now
          ? `Current time in India: ${formatted}`
          : "Current time in India"
      }
    >
      {formatted}
    </time>
  );
}
