"use client";
import { Metadata } from "next";
import Nav from "@ui/organisms/Nav";
import ChatArea from "@src/ui/organisms/ChatArea";
import { Sidebar } from "@src/ui/organisms/Sidebar";
import { defaultMeta } from "@src/shared/meta";
import { useSidebar } from "@src/contexts/SidebarContext";
import { useDeviceInfo } from "@src/hooks/useDeviceInfo";

export default function Home() {
  const { sidebarPosition } = useSidebar();
  const { isMobile, innerWidth } = useDeviceInfo();
  const isLeftSidebar = sidebarPosition == "left";
  const isOnSmallDevice = isMobile || innerWidth < 768;
  return (
    <div
      className={`grid grid-flow-row-dense  h-dvh max-h-dvh  ${
        isOnSmallDevice
          ? " grid-cols-1 "
          : isLeftSidebar
          ? " grid-cols-[min-content_1fr] "
          : "grid-cols-[1fr_min-content]"
      } `}
    >
      <div
        className={`h-full relative ${
          isLeftSidebar ? "col-start-1 col-end-2" : "col-start-2 col-end-3"
        } `}
      >
        <Sidebar />
      </div>
      <div className="relative h-full">
        <Nav />
        <ChatArea />
      </div>
    </div>
  );
}
