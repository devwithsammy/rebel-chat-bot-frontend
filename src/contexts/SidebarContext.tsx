"use client";
import { useDeviceInfo } from "@src/hooks/useDeviceInfo";

import { createContext, useContext, useState, useEffect } from "react";

type TSidebarPosition = "left" | "right";
export interface ISidebar {
  sidebar: boolean;
  sidebarPosition: TSidebarPosition;
  openSidebar: () => void;
  closeSidebar: () => void;
  updateSidebarPosition: (a: TSidebarPosition) => void;
}

const SidebarContext = createContext<ISidebar | null>(null);

const SIDEBAR_POSITION_KEY = "sidebar-position";

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getInitialPosition = (): TSidebarPosition => {
    if (typeof window === "undefined") return "left";

    try {
      const savedPosition = localStorage.getItem(
        SIDEBAR_POSITION_KEY,
      ) as TSidebarPosition;
      return savedPosition || "left";
    } catch (error) {
      console.log("Error reading sidebar position from localStorage:", error);
      return "left";
    }
  };

  const { isMobile, innerWidth } = useDeviceInfo();
  const [sidebarPosition, setSidebarPosition] =
    useState<TSidebarPosition>(getInitialPosition);
  const [sidebar, setSidebar] = useState(
    isMobile || innerWidth < 768 ? false : true,
  );
  const openSidebar = () => {
    setSidebar(true);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_POSITION_KEY, sidebarPosition);
    } catch (error) {
      console.log("Error saving sidebar position to localStorage:", error);
    }
  }, [sidebarPosition]);
  const updateSidebarPosition = (position: TSidebarPosition) =>
    setSidebarPosition(position);
  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        openSidebar,
        closeSidebar,
        sidebarPosition,
        updateSidebarPosition,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
