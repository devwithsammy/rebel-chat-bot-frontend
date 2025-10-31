"use client";
import { Sidebar } from "@src/ui/organisms/Sidebar";
import { useSidebar } from "@src/contexts/SidebarContext";
import { useDeviceInfo } from "@src/hooks/useDeviceInfo";
import { useAuth } from "@src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { AuthLoadingUI } from "@src/ui/atoms/authLoadingUI";
import { AuthSuccessUI } from "@src/ui/atoms/authSuccessUI";

export function ChatLayout({ children }: { children: ReactNode }) {
  const { sidebarPosition } = useSidebar();
  const { isMobile, innerWidth } = useDeviceInfo();
  const isLeftSidebar = sidebarPosition == "left";
  const isOnSmallDevice = isMobile || innerWidth < 768;

  const { loading: loadingAuth, isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loadingAuth) {
      if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        router.push("/login");
      } else {
        // Optional: Redirect to a different page if user doesn't have required permissions
      }
    }
  }, [loadingAuth, isAuthenticated, router]);

  if (loadingAuth) {
      return <AuthLoadingUI />;
}

  // Don't render the main content if not authenticated
  if (!isAuthenticated) {
      return <AuthSuccessUI />;
}

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
        {/* nav and chat area  */}
        {children}
      </div>
    </div>
  );
}
