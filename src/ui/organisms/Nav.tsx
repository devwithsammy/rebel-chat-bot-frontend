"use client";
import { FaLightbulb, FaMoon } from "react-icons/fa6";

import { ThemeContextType, useTheme } from "@src/contexts/ThemeHandler";

export default function Nav() {
  const { theme, toggleTheme } = useTheme() as ThemeContextType;
  console.log("Current Theme in Nav:", theme);
  // Example function to handle theme toggle

  const _handleThemeToggle = () => {
    // Logic to toggle theme (light/dark)
    console.log("Theme toggled");
    toggleTheme();
  };
  // return null ;
  const darkMode = theme == "dark";
  return (
    <nav className="p-4 flex   fixed top-0 right-0">
      <button
        onClick={_handleThemeToggle}
        className="p-3 rounded-full cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transform "
        aria-label="Toggle theme"
      >
        {!darkMode ? <FaMoon /> : <FaLightbulb />}
      </button>
    </nav>
  );
}
