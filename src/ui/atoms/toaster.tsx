"use client";
import { useSidebar } from "@src/contexts/SidebarContext";
import { Toaster } from "react-hot-toast";

export const ToasterModified = () => {
  const { sidebarPosition } = useSidebar();

  return (
    <Toaster
      position={sidebarPosition == "left" ? "top-right" : "top-left"}
      reverseOrder={false}
    />
  );
};
