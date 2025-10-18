"use client";
import { CiLocationArrow1 } from "react-icons/ci";
import { BsSendArrowUp } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";
import { useMemo, useRef } from "react";
import { getRandomString } from "@src/utils/string";
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
  const randomGreeting = useMemo(() => getRandomString(rebelGreetings), []);
  return (
    <div className="text-3xl px-4 bg-slate-100 dark:bg-zinc-700 text-gray-950 h-screen  overflow-y-scroll flex flex-col items-center  justify-center pt-10 pb-20">
      <div className="flex justify-center mt-auto">
        <h4 className="bg-slate-50 dark:bg-zinc-700  shadow-sm dark:border-primary-700 mx-auto py-4 px-6 uppercase font-nunito font-bold tracking-[.15em]  text-primary-600 dark:text-white rounded-full text-lg">
          {process.env.NEXT_PUBLIC_APP_NAME} 😒
        </h4>
      </div>
      <div className="text-xl md:text-2xl font-light text-gray-700/80 dark:text-slate-200 mt-8 font-nunito  tracking-wider text-center">
        {randomGreeting}
      </div>
      <div className="mt-20 mb-auto flex-col shadow-sm shadow-gray-300 dark:shadow-none border-1  border-transparent dark:border-neutral-500 w-full rounded-[15px] max-w-[650px] p-4 flex gap-4 items-baseline bg-gray-50 dark:bg-zinc-600">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          rows={1}
          placeholder="Whats on your mind? "
          className="w-full text-base focus:outline-none resize-none bg-transparent max-h-40 overflow-y-auto font-nunito focus:ring-1 p-2 rounded-[10px] ring-slate-500/10 text-gray-700 dark:text-slate-200 tracking-wider"
        />
        <button className="self-end translate-y-[2px] flex items-center justify-center h-10 w-10 border-none bg-primary-500 rounded-full transition-all cursor-pointer hover:ring-1 focus:ring-1 focus:outline-none ring-slate-500/50  ring-offset-2">
          <CiLocationArrow1 className="text-xl text-slate-100 " />
        </button>
      </div>
    </div>
  );
}
