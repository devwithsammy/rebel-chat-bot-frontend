"use client";
import { useDeviceInfo } from "@src/hooks/useDeviceInfo";

import { createContext, useContext, useState } from "react";


type TSidebarPosition= "left"| "right"
export interface ISidebar {
  sidebar: boolean;
  sidebarPosition : TSidebarPosition;
  openSidebar: () => void;
  closeSidebar: () => void;
  updateSidebarPosition:(a: TSidebarPosition) => void;
}

const SidebarContext = createContext<ISidebar | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isMobile, innerWidth } = useDeviceInfo();
  const [sidebarPosition , setSidebarPosition]  = useState<TSidebarPosition>("left")
  const [sidebar, setSidebar] = useState(
    isMobile || innerWidth < 768 ? false : true
  );
  const openSidebar = () => {
    setSidebar(true);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };
const updateSidebarPosition = (position: TSidebarPosition) => setSidebarPosition(position); 
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
  if (!context ) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
