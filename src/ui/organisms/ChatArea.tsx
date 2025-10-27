"use client";
import { CiLocationArrow1 } from "react-icons/ci";
import { useEffect, useMemo, useRef } from "react";
import { getRandomString } from "@src/utils/string";
import rebelGreetings from "@src/data/rebelGreetings";
import { toast } from "react-hot-toast";
import { useConversationMutation } from "@src/hooks/useChatAPI";
import { CgSpinnerTwo } from "react-icons/cg";
import { IChatData } from "@src/lib/chat-service";

export default function ChatArea() {
  const { mutate, data, isPending, isError, error } = useConversationMutation();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const hasShownErrorRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // const target = e.target as HTMLTextAreaElement;
    const el = textareaRef?.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };
  const showToast = (message: string, type: "error" | "success" = "error") => {
    // Prevent showing the same error multiple times in a short period
    if (hasShownErrorRef.current && type === "error") return;
    hasShownErrorRef.current = true;
    toast[type](message);
    setTimeout(() => {
      hasShownErrorRef.current = false;
    }, 2000); // reset after 2s
  };

  const handleAPICall = async () => {
    const prompt = textareaRef?.current?.value;
    console.log(prompt, "prompt VALUE");
    if (!prompt?.trim()) {
      toast.error("prompt cannot be empty");
      return;
    }
    try {
      const requestData: IChatData = {
        prompt,
      };
      if (data?.conversationId) {
        requestData.conversationId = data?.conversationId;
      }
      mutate(requestData);
      //
    } catch (error) {
      console.error("Error generating response:", error);
      showToast("Failed to generate response. Please try again.");
    }
  };

  useEffect(() => {
    if (isError) {
      showToast(error?.message || "An error occurred. Try again.");
    }
  }, [isError, error]);

  console.log(
    { data, isPending, isError, error },
    "OPEN ROUTER MUTATION STATE"
  );
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
          className="w-full text-base focus:outline-none resize-none bg-transparent max-h-40 overflow-y-auto font-nunito ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-200 shadow-sm dark:shadow-zinc-500  p-2 rounded-[10px] ring-slate-200/80 dark:ring-zinc-500 text-gray-700 dark:text-slate-200 tracking-wider"
        />
        <button
          type="button"
          disabled={isPending}
          onClick={handleAPICall}
          className="disabled:cursor-not-allowed self-end translate-y-[2px] text-slate-100 flex items-center justify-center h-10 w-10 border-none bg-primary-500 rounded-full transition-all cursor-pointer hover:ring-1 focus:ring-1 focus:outline-none ring-slate-500/50  ring-offset-2"
        >
          {isPending ? (
            <CgSpinnerTwo className="animate-spin text-xl " />
          ) : (
            <CiLocationArrow1 className="text-xl  " />
          )}
        </button>
      </div>
    </div>
  );
}
