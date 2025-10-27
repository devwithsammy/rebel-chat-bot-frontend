"use client"
import { useSidebar } from "@src/contexts/SidebarContext";
import { TbLayoutSidebarRightExpand ,} from "react-icons/tb";

export const SidebarTogglerBtn = ({
  clickHandler,
  variant,
  title,
}: {
    clickHandler: () => void;
    variant: "open" | "close";
    title: string;
}) => {
    const {sidebarPosition} = useSidebar() ;

    return (
  <button
    className={`cursor-pointer p-1 dark:text-slate-100 text-slate-800 hover:outline-1 outline-offset-2 rounded-lg  outline-gray-400 w-min ${sidebarPosition=='right' ? 'rotate-180':''}`}
    title={title}
    onClick={clickHandler}
  >
    <TbLayoutSidebarRightExpand
      className={`text-2xl ${variant == "open" ? "rotate-180" : ""}`}
    />
  </button>
);}