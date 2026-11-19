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
// Dark mode feature commented out — schedule/override helpers unused while forced to day
// import {
//   isNightBySchedule,
//   readSessionThemeOverride,
//   resolveNightMode,
//   writeSessionThemeOverride,
// } from "@/lib/theme-schedule";

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
  // Dark mode disabled — always day
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    setIsNightMode(false);
    applyThemeToDocument(false);
    try {
      sessionStorage.setItem("theme-session-override", "day");
    } catch {
      /* ignore */
    }

    // Original schedule polling (commented — dark mode feature off):
    // const initialNight = resolveNightMode();
    // setIsNightMode(initialNight);
    // applyThemeToDocument(initialNight);
    // const intervalId = window.setInterval(() => {
    //   if (readSessionThemeOverride()) return;
    //   const nextNight = isNightBySchedule();
    //   setIsNightMode(nextNight);
    //   applyThemeToDocument(nextNight);
    // }, 60_000);
    // return () => window.clearInterval(intervalId);
  }, []);

  const setNightMode = useCallback((_value: boolean) => {
    // Dark mode disabled — ignore night requests
    setIsNightMode(false);
    applyThemeToDocument(false);
  }, []);

  const toggleNightMode = useCallback(() => {
    // Dark mode disabled — no-op
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
