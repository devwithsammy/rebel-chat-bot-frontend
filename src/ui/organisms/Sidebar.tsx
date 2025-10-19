"use client";
import { IoSettingsOutline } from "react-icons/io5";
import { TbBoxAlignLeftFilled, TbBoxAlignRightFilled } from "react-icons/tb";

import { useSidebar } from "@src/contexts/SidebarContext";
import { FaPlus } from "react-icons/fa6";
import { format, parseISO } from "date-fns";

import { useModal } from "@src/contexts/ModalContext";
import { SettingsModal } from "./SettingsModal";
import { SidebarTogglerBtn } from "../atoms/sidebarButtons";
import { useDeviceInfo } from "@src/hooks/useDeviceInfo";
import { useAuth } from "@src/contexts/AuthContext";
import useHistory from "@src/hooks/useHistory";
import Image from "next/image";

// Function to format UTC timestamp
const formatTimestamp = (utcTimestamp: string) => {
  const date = parseISO(utcTimestamp); // Parse UTC timestamp
  return format(date, "h:mm a"); // e.g., "11:45 PM"
};

// Function to format full date for older entries
const formatFullDate = (utcTimestamp: string) => {
  const date = parseISO(utcTimestamp);
  return format(date, "MMM d, yyyy, h:mm a"); // e.g., "Sep 28, 2025, 2:15 PM"
};

export const Sidebar = () => {
  const {
    sidebar,
    closeSidebar,
    openSidebar,
    updateSidebarPosition,
    sidebarPosition,
  } = useSidebar();
  const { isMobile, innerWidth } = useDeviceInfo();
  const { groupedHistory, historyCount } = useHistory();

  const { modal, updateModal, closeModal } = useModal();

  const isOnSmallDevice = isMobile || innerWidth < 768;

  const isLeftSidebar = sidebarPosition == "left";
  console.log(isOnSmallDevice, "is on small device");
  return (
    <>
      {isOnSmallDevice && sidebar && (
        <div
          onClick={closeSidebar}
          className="
            fixed inset-0 z-[90]  top-0 left-0
            w-dvw h-dvh
            backdrop-blur-sm bg-black/30
            transition-opacity duration-300 ease-in-out
          "
        ></div>
      )}
      <div
        className={`
        bg-slate-50 dark:bg-zinc-800 border-r border-r-zinc-300 dark:border-r-zinc-600
        flex flex-col dark:text-slate-100 text-slate-800 h-dvh max-h-dvh px-4 pb-8
        transition-all duration-300 ease-in-out
        ${isOnSmallDevice ? " fixed top-0 z-[100] " : " relative "}
        ${
          sidebar
            ? isOnSmallDevice
              ? ` w-[80vw] ${isLeftSidebar ? "left-0" : "right-0"} `
              : " w-[250px] "
            : isOnSmallDevice
            ? `w-0 overflow-hidden ${
                isLeftSidebar ? "-left-[80vw]" : "-right-[80vw]"
              }`
            : "w-fit overflow-hidden"
        }
      `}
      >
        {modal.showModal && (
          <SettingsModal
            closeModal={() => closeModal()}
            variant={modal.variant}
          />
        )}
        {!sidebar && (
          <div className="pt-4">
            <SidebarTogglerBtn
              title="open sidebaar"
              variant="open"
              clickHandler={openSidebar}
            />
          </div>
        )}
        {sidebar && (
          <div className="flex flex-col">
            <div
              className={`flex  justify-between items-center sticky top-0 left-0 bg-slate-50 dark:bg-zinc-800 py-2 pt-4 ${
                sidebarPosition == "right" ? " flex-row-reverse " : " flex-row "
              }`}
            >
              {/* header  */}
              <h2 className=" uppercase font-nunito font-bold tracking-[.15em] text-primary-600 rounded-full text-lg">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h2>

              <SidebarTogglerBtn
                variant="close"
                clickHandler={closeSidebar}
                title={"close sidebar"}
              />
            </div>

            <button className="p-3 py-2 rounded-md cursor-pointer tracking-wide font-semibold w-full my-8 flex  gap-2 items-center  justify-center dark:bg-zinc-800 text-gray-600 dark:text-gray-300 transition-all duration-300 focus:outline-none hover-focus:ring-2 hover-focus:ring-blue-500 shadow-lg hover:shadow-xl transform ">
              <FaPlus />
              <span>New Chat</span>
            </button>
            <div className="font-semibold text-gray-700 dark:text-zinc-300 font-nunito mb-4">
              Sidebar Position
            </div>
            <div className="flex justify-between">
              {[
                {
                  label: "Left",
                  Icon: TbBoxAlignLeftFilled,
                  isActive: sidebarPosition == "left",
                  handler: () =>
                    sidebarPosition == "left"
                      ? null
                      : updateSidebarPosition("left"),
                },
                {
                  label: "Right",
                  Icon: TbBoxAlignRightFilled,
                  isActive: sidebarPosition == "right",
                  handler: () =>
                    sidebarPosition == "right"
                      ? null
                      : updateSidebarPosition("right"),
                },
              ].map(({ label, Icon, handler, isActive }, i) => {
                return (
                  <button
                    key={`${label} ${i}`}
                    onClick={handler}
                    className={`p-3 py-2 rounded-lg cursor-pointer tracking-wide font-semibold flex flex-row gap-2 items-center  dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isActive ? "ring-2" : ""
                    } ring-blue-500 shadow-lg hover:shadow-xl transform `}
                  >
                    <span>{label}</span>
                    <Icon className="text-primary-500" />
                  </button>
                );
              })}
            </div>
            <div className="mt-16">
              {/* chat history */}
              <p className="font-semibold text-gray-700 dark:text-zinc-300 font-nunito">
                Chat History
              </p>

              <div className="mt-4 px-2 h-[58vh] overflow-y-scroll glass-scrollbar ">
                <SearchSection title={"Today"} items={groupedHistory.today} />
                <SearchSection
                  title={"Yesterday"}
                  items={groupedHistory.yesterday}
                />
                <SearchSection
                  title={"Last 30 Days"}
                  items={groupedHistory.last30Days}
                />
                <SearchSection
                  title={"Earlier"}
                  items={groupedHistory.earlier}
                />
                {!historyCount && (
                  <p className="text-gray-600  my-4">
                    No search history yet. Go ask something!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {sidebar && (
          <div className=" pt-4 flex flex-col gap-2 absolute bottom-0 left-0 w-full px-4 py-4">
            <SidebarCtaButton
              variant="settings"
              handler={() =>
                updateModal({
                  showModal: !modal.showModal,
                  variant: !modal.variant ? "general-settings" : null,
                })
              }
            />
            <SidebarCtaButton
              variant="profile"
              handler={() =>
                updateModal({
                  showModal: !modal.showModal,
                  variant: !modal.variant ? "profile-settings" : null,
                })
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

const SearchSection = ({
  title,
  items,
}: {
  title: string;
  items: Array<{ query: string; timestamp: string }>;
}) => {
  if (!items.length) return null;
  return (
    <div className="mb-6 font-nunito text-gray-700 dark:text-zinc-200 ">
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <div className="space-y-1">
        {items.map((item, index) => (
          <p key={index} className="text-sm  ">
            <span className="block truncate">{item.query}</span>
            <span className="block text-gray-400 text-xs">
              {title === "Earlier"
                ? formatFullDate(item.timestamp)
                : formatTimestamp(item.timestamp)}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

const SidebarCtaButton = (p: {
  handler: () => void;
  variant: "profile" | "settings";
}) => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div
      onClick={p.handler}
      className={`w-full cursor-pointer flex items-center border  dark:border-zinc-700 border-zinc-300  shadow-sm  hover-focus:border-primary-500  rounded-full gap-4 font-nunito
        py-2 px-3 max-w-[130px] mx-auto
          `}
    >
      <div className="w-6 h-6 overflow-hidden rounded-full flex items-center justify-center">
        {p.variant == "settings" ? (
          <IoSettingsOutline className="text-xl" />
        ) : (
          <Image
            src={`/images/sampleUser.jpg`}
            alt={user?.firstName || ""}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div>
        <div className="font-semibold tracking-wide text-sm text-left">
          {p.variant == "settings" ? "Settings" : user?.firstName || "Profile"}
        </div>
      </div>
    </div>
  );
};
