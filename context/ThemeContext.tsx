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

const THEME_STORAGE_KEY = "hero-video-mode";

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
  const [isNightMode, setIsNightMode] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.getAttribute("data-theme") === "night";
  });

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const isNight = saved === "night";
    setIsNightMode(isNight);
    applyThemeToDocument(isNight);
  }, []);

  const setNightMode = useCallback((value: boolean) => {
    setIsNightMode(value);
    localStorage.setItem(THEME_STORAGE_KEY, value ? "night" : "day");
    applyThemeToDocument(value);
  }, []);

  const toggleNightMode = useCallback(() => {
    setIsNightMode((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_STORAGE_KEY, next ? "night" : "day");
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
