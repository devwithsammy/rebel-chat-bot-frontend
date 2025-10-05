"use client";

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
  return null ; 
  return (
    <nav className="p-4 flex  bg-[#f7f7f7] text-gray-800 dark:bg-primary-900 dark:text-foreground-dark ">
      <button
        className="ml-auto p-2 bg-gray-700 rounded hover:bg-gray-600"
        onClick={_handleThemeToggle}
      >
        {/* theme toggle button  */}
        Toggle Theme
      </button>
    </nav>
  );
}
