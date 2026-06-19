"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { isNightMode, toggleNightMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleNightMode}
      className={`glass-btn-warm inline-flex h-10 w-10 items-center justify-center rounded-full ${className}`}
      aria-label={isNightMode ? "Switch to day mode" : "Switch to night mode"}
      aria-pressed={isNightMode}
    >
      {isNightMode ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
