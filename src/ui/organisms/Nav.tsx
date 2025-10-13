"use client";
import { FaLightbulb, FaMoon } from "react-icons/fa6";

import { ThemeContextType, useTheme } from "@src/contexts/ThemeHandler";
import { useSidebar } from "@src/contexts/SidebarContext";
import { SidebarTogglerBtn } from "../atoms/sidebarButtons";
import { useDeviceInfo } from "@src/hooks/useDeviceInfo";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  const { sidebarPosition, sidebar, openSidebar, closeSidebar } = useSidebar();
  const {isMobile, innerWidth} = useDeviceInfo() ; 
  const isLeftSidebar = sidebarPosition == "left";
  const _handleThemeToggle = () => {
    // Logic to toggle theme (light/dark)
    console.log("Theme toggled");
    toggleTheme();
  };
  // return null ;
  const darkMode = theme == "dark";
  const isOnSmallDevice = isMobile || innerWidth<768
  return (
    <nav>
      <div
        className={`p-4 flex   fixed top-0  ${
          isLeftSidebar ? " right-0" : " left-0 "
        }`}
      >
        <button
          onClick={_handleThemeToggle}
          className={`p-3 rounded-full cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transform `}
          aria-label="Toggle theme"
        >
          {!darkMode ? <FaMoon /> : <FaLightbulb />}
        </button>
      </div>
      <div
        className={`p-4 flex   fixed top-0  ${
          isLeftSidebar ? " left-0" : " right-0 "
        }`}
      >
        {!sidebar && isOnSmallDevice ? (
          <SidebarTogglerBtn
            variant="open"
            clickHandler={openSidebar}
            title={"open sidebar"}
          />
        ) : null}
      </div>
    </nav>
  );
}
