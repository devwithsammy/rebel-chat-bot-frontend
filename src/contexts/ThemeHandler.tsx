"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(
    !(typeof window !== undefined && "matchMedia" in window)
      ? "light"
      : window?.matchMedia("(prefers-color-scheme: dark)")?.matches
      ? "dark"
      : "light"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;

    if (stored) {
      setThemeState(stored);
      applyTheme(stored);
    } else {
      // Use system preference
      const systemDark = window?.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      applyTheme(systemDark ? "dark" : "light");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Add this simple toggle function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const applyTheme = (themeToApply: Theme) => {
    const root = document.documentElement;
    if (themeToApply === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Listen for system theme changes when using system preference
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const systemDark = window?.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      applyTheme(systemDark ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {" "}
      {/* Add toggleTheme here */}
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
