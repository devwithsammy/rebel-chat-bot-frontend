"use client";
import { useDeviceInfo } from "@src/hooks/useDeviceInfo";
import { createContext, useContext, useState } from "react";

export interface SidebarInterface {
  openSidebar: boolean;
  handleOpenSidebar: (x: boolean) => void;
}

const sidebarContext = createContext<SidebarInterface | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isMobile, innerWidth } = useDeviceInfo();

  const [openSidebar, setOpensidebar] = useState(
    isMobile || innerWidth < 768 ? false : true
  );
  const handleOpenSidebar = (x: boolean) => {
    setOpensidebar(x);
  };
  return (
    <sidebarContext.Provider
      value={{
        openSidebar,
        handleOpenSidebar,
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
