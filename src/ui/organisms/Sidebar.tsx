"use client";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { SidebarInterface, useSidebar } from "@src/contexts/SidebarContext";
import { FaArrowLeftLong, FaSpaghettiMonsterFlying } from "react-icons/fa6";
import { useState } from "react";
import { format, isToday, isYesterday, parseISO, subDays } from "date-fns";
import useHistory from "@src/hooks/useHistory";
import Image from "next/image";
import { IconType } from "react-icons";
import { BiLogOut, BiUser } from "react-icons/bi";
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
  const { sidebar, closeSidebar, openSidebar } =
    useSidebar() as SidebarInterface;
  const { groupedHistory, historyCount } = useHistory();

  const [settingsModal, setSettingsModal] = useState(false);
    console.log(sidebar, 'SIDEBAR ON MOUNT')
  return (
    <div
      className={`bg-slate-50 dark:bg-zinc-800 border-r border-r-zinc-300 flex flex-col dark:text-slate-100 text-slate-800 h-dvh max-h-dvh px-4 pb-8 overflow-y-scroll glass-scrollbar  ${
        sidebar ? "w-[250px] " : "w-min"
      } `}
    >
      {!sidebar && (
        <div className="pt-4 flex justify-center">
          <SidebarTogglerBtn
            title="open sidebaar"
            variant="open"
            clickHandler={openSidebar}
          />
        </div>
      )}
      {sidebar && (
        <div>
          <div className="flex flex-row  justify-between items-baseline sticky top-0 left-0 bg-slate-50 dark:bg-zinc-800 py-2 pt-4">
            <h2 className=" uppercase font-nunito font-bold tracking-[.15em] text-primary-600 rounded-full text-lg">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h2>

            <SidebarTogglerBtn
              variant="close"
              clickHandler={closeSidebar}
              title={"close sidebar"}
            />
          </div>

          <div className="mt-16">
            {/* chat history */}
            <p className="font-semibold text-gray-700 dark:text-zinc-300 font-nunito">
              Chat History
            </p>

            <div className="mt-4 px-2">
              <SearchSection title={"Today"} items={groupedHistory.today} />
              <SearchSection
                title={"Yesterday"}
                items={groupedHistory.yesterday}
              />
              <SearchSection
                title={"Last 30 Days"}
                items={groupedHistory.last30Days}
              />
              <SearchSection title={"Earlier"} items={groupedHistory.earlier} />
              {!historyCount && (
                <p className="text-gray-600  my-4">
                  No search history yet. Go ask something!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mt-auto pt-4 flex flex-col gap-2">
        <SettingsCtaButton handler={() => setSettingsModal(true)} />
        <UserAccountCta
          logout={() => console.log("clicked logout")}
          openSettingsModal={() => setSettingsModal(true)}
        />
      </div>
    </div>
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

const SidebarTogglerBtn = ({
  clickHandler,
  variant,
  title,
}: {
  clickHandler: () => void;
  variant: "open" | "close";
  title: string;
}) => (
  <button
    className="cursor-pointer  hover:outline-1 outline-offset-2 rounded-lg  outline-gray-400 w-min "
    title={title}
    onClick={clickHandler}
  >
    <TbLayoutSidebarRightExpand
      className={`text-2xl ${variant == "open" ? "rotate-180" : ""}`}
    />
  </button>
);

const SettingsCtaButton = (p: { handler: () => void }) => {
    const { sidebar } = useSidebar() as SidebarInterface;

  return (
    <div
      onClick={p.handler}
        className={`w-full cursor-pointer flex items-center border-2  dark:shadow-zinc-700 border-transparent shadow-sm  hover-focus:border-primary-500  rounded-3xl gap-2 font-nunito
        ${sidebar ? " px-2 py-1 " : ""}
        `}    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full  shadow-sm shadow-zinc-400 dark:shadow-slate-300">
        <IoSettingsOutline className="text-xl" />
      </div>
     {sidebar&& <div>
        <span className="font-semibold tracking-wide">Settings</span>
      </div>}
    </div>
  );
};

const UserAccountCta = (p: {
  openSettingsModal: () => void;
  logout: () => void;
}) => {
  const [dropdown, setDropdown] = useState(false);
  const { sidebar } = useSidebar() as SidebarInterface;
  return (
    <div className="">
      <button
        onClick={() => setDropdown((x) => !x)}
        className={`w-full cursor-pointer flex items-center border-2  dark:shadow-zinc-700 border-transparent shadow-sm  hover-focus:border-primary-500  rounded-3xl gap-2 font-nunito
            ${sidebar ? " px-2 py-1 " : ""}
            `}
      >
        <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm shadow-zinc-800 dark:shadow-slate-300">
          <Image
            src={require("@assets/sampleUser.jpg")}
            alt={"Sample- user"}
            className="h-full w-full object-cover"
          />
        </div>
        {sidebar && (
          <div className="flex flex-col items-start">
            <span className="font-semibold tracking-wide">Andrew Jackson</span>
          </div>
        )}
      </button>
      {true && (
        <div className="fixed top-0 right-0 w-[400px] p-4 rounded-sm border-1 translate-y-[-100px] translate-x-[400px] z-10 flex flex-col bg-red-500">
          <UserAccountDropDownBtn
            Icon={BiUser}
            label="sampleuser@gmail.com"
            title="Sample-user"
            handler={() => {}}
          />{" "}
          <UserAccountDropDownBtn
            Icon={BiLogOut}
            label="logout"
            title="logout profile"
            handler={() => {}}
          />{" "}
        </div>
      )}
    </div>
  );
};

const UserAccountDropDownBtn = (p: {
  Icon: IconType;
  label: string;
  handler: () => void;
  title?: string;
}) => {
  return (
    <button onClick={p.handler} title={p.title}>
      <p.Icon />
      <span>{p.label}</span>
    </button>
  );
};
