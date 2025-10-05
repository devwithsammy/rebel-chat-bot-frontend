"use client";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { SidebarInterface, useSidebar } from "@src/contexts/SidebarContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import { format, isToday, isYesterday, parseISO, subDays } from "date-fns";
import useHistory from "@src/hooks/useHistory";
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
  const { handleOpenSidebar, openSidebar } = useSidebar() as SidebarInterface;
  const { groupedHistory, historyCount } = useHistory();
   
  if (!openSidebar) return null ; 
  return (
    <div className={`bg-slate-50 text-slate-800 h-screen p-4 w-[200px]`}>
      <div className="flex flex-row  justify-between items-baseline">
        <h2 className="bg-slate-50 uppercase font-nunito font-bold tracking-[.15em] text-primary-600 rounded-full text-lg">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h2>
        <button
          className="cursor-pointer  hover:outline-1 outline-offset-2 rounded-lg  outline-gray-300"
          title={"close sidebar"}
          onClick={() => handleOpenSidebar(!openSidebar)}
        >
          <TbLayoutSidebarRightExpand className="text-xl" />
        </button>
      </div>

      <div className="mt-16">
        <p className="font-semibold text-gray-800">Chat History</p>
        <div>
          Search
          {/* TODO */}
        </div>
        <div className="mt-4 px-2">
          <SearchSection title={"Today"} items={groupedHistory.today} />
          <SearchSection title={"Yesterday"} items={groupedHistory.yesterday} />
          <SearchSection
            title={"Last 30 Days"}
            items={groupedHistory.last30Days}
          />
          <SearchSection title={"Earlier"} items={groupedHistory.earlier} />
          {!historyCount && (
            <p className="text-gray-500 text-sm">
              No search history yet. Go ask something!
            </p>
          )}
        </div>
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
    <div className="mb-6">
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <div className="">
        {items.map((item, index) => (
          <p key={index} className="text-gray-700 text-sm ">
            <span>{item.query}</span>
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
