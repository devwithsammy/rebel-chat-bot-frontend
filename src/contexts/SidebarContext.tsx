"use client";
import { useDeviceInfo } from "@src/hooks/useDeviceInfo";
import { createContext, useContext, useState } from "react";

export interface SidebarInterface {
  sidebar: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const sidebarContext = createContext<SidebarInterface | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isMobile, innerWidth } = useDeviceInfo();
console.log({isMobile, innerWidth})
  const [sidebar, setSidebar] = useState(
    isMobile || innerWidth < 768 ? false : true
  );
  const openSidebar = () => {
    setSidebar(true);
  };
  const closeSidebar = () => { 
    setSidebar(false)
  }
  
  return (
    <sidebarContext.Provider
      value={{
        sidebar,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </sidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(sidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
