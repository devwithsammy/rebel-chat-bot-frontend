"use client";

import { ThemeContextType, useTheme } from "@src/contexts/ThemeHandler";

export default function Nav() {
  const { theme ,toggleTheme} = useTheme() as ThemeContextType;
  console.log("Current Theme in Nav:", theme);
  // Example function to handle theme toggle

  const _handleThemeToggle = () => {
    // Logic to toggle theme (light/dark)
    console.log("Theme toggled");
    const newTheme = theme === "light" ? "dark" : "light";
    toggleTheme();
  };
  return (
    <nav className="p-4 flex  bg-slate-200 text-gray-800 dark:bg-gray-800 dark:text-white ">
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>

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
