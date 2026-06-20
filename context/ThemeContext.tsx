"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  isNightBySchedule,
  readSessionThemeOverride,
  resolveNightMode,
  writeSessionThemeOverride,
} from "@/lib/theme-schedule";

type ThemeContextValue = {
  isNightMode: boolean;
  toggleNightMode: () => void;
  setNightMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDocument(isNight: boolean) {
  document.documentElement.setAttribute("data-theme", isNight ? "night" : "day");
  document.documentElement.style.colorScheme = isNight ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const initialNight = resolveNightMode();
    setIsNightMode(initialNight);
    applyThemeToDocument(initialNight);

    const intervalId = window.setInterval(() => {
      if (readSessionThemeOverride()) return;
      const nextNight = isNightBySchedule();
      setIsNightMode(nextNight);
      applyThemeToDocument(nextNight);
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const setNightMode = useCallback((value: boolean) => {
    writeSessionThemeOverride(value ? "night" : "day");
    setIsNightMode(value);
    applyThemeToDocument(value);
  }, []);

  const toggleNightMode = useCallback(() => {
    setIsNightMode((prev) => {
      const next = !prev;
      writeSessionThemeOverride(next ? "night" : "day");
      applyThemeToDocument(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ isNightMode, toggleNightMode, setNightMode }),
    [isNightMode, toggleNightMode, setNightMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
