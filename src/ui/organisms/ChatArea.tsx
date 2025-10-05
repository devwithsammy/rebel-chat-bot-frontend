"use client";
import { CiLocationArrow1 } from "react-icons/ci";
import { BsSendArrowUp } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";
import { useRef } from "react";
import { getRandomGreeting } from "@src/utils/rebelGreetings";
import rebelGreetings from "@src/data/rebelGreetings";

export default function ChatArea() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // const target = e.target as HTMLTextAreaElement;
    const el = textareaRef?.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };
  return (
    <div className="text-3xl px-4 bg-slate-100 text-gray-950 h-screen  overflow-y-scroll flex flex-col items-center  justify-center pt-10 pb-20">
      <div className="flex justify-center mt-auto">
        <h4 className="bg-slate-50 shadow-sm  mx-auto py-4 px-6 uppercase font-nunito font-bold tracking-[.15em] text-primary-600 rounded-full text-lg">
          {process.env.NEXT_PUBLIC_APP_NAME} 😒
        </h4>
      </div>
      <div className="text-xl md:text-2xl font-light text-gray-700/80 mt-8 font-nunito  tracking-wider">
        {getRandomGreeting(rebelGreetings)}
      </div>
      <div className="mt-20 mb-auto shadow-sm shadow-gray-300 w-full rounded-[15px] max-w-[650px] p-4 flex gap-4 items-baseline">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          rows={1}
          placeholder="Whats on your mind? "
          className="w-full text-base focus:outline-none resize-none bg-transparent max-h-40 overflow-y-auto font-nunito focus:ring-1 p-2 rounded-[10px] ring-slate-500/10 text-gray-700 tracking-wider"
        />
        <button className="translate-y-[2px] flex items-center justify-center h-10 w-10 border-none bg-primary-500 rounded-full transition-all cursor-pointer hover:ring-1 focus:ring-1 focus:outline-none ring-slate-500/50  ring-offset-2">
          <CiLocationArrow1 className="text-xl text-slate-100 " />
        </button>
      </div>
    </div>
  );
}
