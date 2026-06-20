"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { isNightMode, toggleNightMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render day-mode icon on server/first paint to match SSR
  const showNightMode = mounted && isNightMode;

  return (
    <button
      type="button"
      onClick={toggleNightMode}
      className={`glass-btn-warm inline-flex h-10 w-10 items-center justify-center rounded-full ${className}`}
      aria-label={
        showNightMode
          ? "Switch to day mode for this visit"
          : "Switch to night mode for this visit"
      }
    >
      {showNightMode ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
