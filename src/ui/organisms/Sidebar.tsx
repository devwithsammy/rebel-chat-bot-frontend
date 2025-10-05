"use client";
import { useState } from "react";

export const Sidebar = () => {
  const [openSidebar, setOpensiebar] = useState(true);

  return (
    <div className="bg-slate-200 text-white h-screen p-4">
      <div className="flex flex-row  justify-between">
        <h2 className="bg-slate-50 shadow-sm  mx-auto py-4 px-6 uppercase font-nunito font-bold tracking-[.15em] text-primary-600 rounded-full text-lg">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h2>
        <button className="">close</button>
      </div>
    </div>
  );
};
