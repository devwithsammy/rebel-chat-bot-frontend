"use client";
import { CiLocationArrow1 } from "react-icons/ci";
import { useEffect, useMemo, useRef } from "react";
import { getRandomString } from "@src/utils/string";
import rebelGreetings from "@src/data/rebelGreetings";
import { toast } from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { useConversationContext } from "@src/contexts/ConversationContext";
import { useGetConversationContext } from "@src/hooks/useChatAPI";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const UserMsg = ({ content }: { content: string }) => {
  return (
    <div className="w-full px-4 py-2 rounded-t-xl rounded-bl-xl whitespace-pre-wrap bg-primary-500 text-white text-base tracking-wide">
      {content}
    </div>
  );
};
const AssistantMsg = ({ content }: { content: string }) => {
  return (
    <div className="w-full px-4 py-4 rounded-t-xl rounded-br-xl whitespace-pre-wrap bg-gray-200 text-zinc-950 dark:bg-neutral-800 dark:text-white text-base tracking-wide">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-2 mb-2">{children}</h3>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-primary-400">
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside ml-3 ">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside ml-3 ">{children}</ol>
          ),
          code: ({ children }) => (
            <code className="bg-zinc-700 px-1 py-[1px] rounded text-sm">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const ChatResponseLoadingAnimation = () => {
  return (
    <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-nunito">
      <span className="text-base font-medium tracking-wide">Thinking</span>
      <div className="flex gap-[3px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[6px] h-[6px] bg-zinc-700 dark:bg-zinc-300 rounded-full animate-pulse-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

interface InputFieldProps {
  onSendMessage: (message: string) => void;
  isPending: boolean;
  isLoading?: boolean;
  hasMessages?: boolean;
}

function InputField({
  onSendMessage,
  isPending,
  isLoading = false,
  hasMessages = false,
}: InputFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = textareaRef?.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  const handleSend = async () => {
    const prompt = textareaRef?.current?.value;
    if (!prompt?.trim()) {
      toast.error("Prompt cannot be empty");
      return;
    }

    onSendMessage(prompt);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      // Reset height after clearing
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div
      className={`
         flex-row shadow-sm shadow-gray-300 dark:shadow-none border-1 border-transparent dark:border-neutral-500 w-[90vw] md:w-full rounded-[15px] max-w-[650px] 
          p-4 flex gap-4 items-baseline bg-gray-50 dark:bg-zinc-600
          ${hasMessages ? "fixed bottom-10 z-2 " : "mt-10"}
        `}
    >
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="What's on your mind?"
        className="w-full text-base focus:outline-none resize-none bg-transparent max-h-40 overflow-y-auto font-nunito ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-200 shadow-sm dark:shadow-zinc-500 p-2 rounded-[10px] ring-slate-200/80 dark:ring-zinc-500 text-gray-700 dark:text-slate-200 tracking-wider"
        disabled={isPending || isLoading}
      />
      <button
        type="button"
        disabled={isPending || isLoading}
        onClick={handleSend}
        className="disabled:cursor-not-allowed self-start text-slate-100 flex items-center justify-center min-h-[35px] min-w-[35px] h-8 w-8 border-none bg-primary-500 rounded-full transition-all cursor-pointer hover:ring-1 focus:ring-1 focus:outline-none ring-slate-500/50 ring-offset-2"
      >
        {isPending || isLoading ? (
          <CgSpinnerTwo className="animate-spin text-xl" />
        ) : (
          <CiLocationArrow1 className="text-xl flex-shrink-0" />
        )}
      </button>
    </div>
  );
}

export default function ChatArea({
  conversationId,
}: {
  conversationId?: string;
}) {
  const {
    sendMessage,
    messages,
    isPending,
    updateMessages,
    conversationId: contextConversationId,
  } = useConversationContext();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error } = useGetConversationContext(conversationId);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isPending]);

  useEffect(() => {
    // updateMessages([]); //reset messages when component unmounts
    if (data && Array.isArray(data) && data.length > 0) {
      updateMessages(
        data.map((x) => ({
          role: x.role,
          content: x.content,
        }))
      );
    }
  }, [data, conversationId]);

  //   useEffect(() => {
  //     if (isError) {
  //       showToast(error?.message || "An error occurred. Try again.");
  //     }
  //   }, [isError, error]);

  const randomGreeting = useMemo(() => getRandomString(rebelGreetings), []);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };
//   console.log(conversationId, contextConversationId, messages.length);
  return (
    <div className="text-3xl px-4 bg-slate-100 dark:bg-zinc-700 text-gray-950 h-screen  overflow-y-scroll flex flex-col items-center  justify-center pt-20 md:pt-10 pb-10">
      {messages.length > 0
        ? null
        : (!conversationId || !contextConversationId) && (
            <div>
              {/* header  */}
              <div className="flex justify-center">
                <h4 className="bg-slate-50 dark:bg-zinc-700  shadow-sm dark:border-primary-700 mx-auto py-4 px-6 uppercase font-nunito font-bold tracking-[.15em]  text-primary-600 dark:text-white rounded-full text-lg">
                  {process.env.NEXT_PUBLIC_APP_NAME} 😒
                </h4>
              </div>
              <div className="text-xl md:text-2xl font-light text-gray-700/80 dark:text-slate-200 mt-8 font-nunito  tracking-wider text-center">
                {randomGreeting}
              </div>
            </div>
          )}

      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto px-4 pt-10 pb-50 flex flex-col gap-3 w-full max-w-[900px] gradient-scrollbar">
          {/* Chat Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%]  ${
                msg.role === "user" ? "self-end " : "self-start"
              }`}
            >
              {msg.role == "user" ? (
                <UserMsg content={msg.content} />
              ) : (
                <AssistantMsg content={msg.content} />
              )}
            </div>
          ))}
          {isPending && <ChatResponseLoadingAnimation />}
          <div ref={messagesEndRef} />
        </div>
      )}

      <InputField
        onSendMessage={handleSendMessage}
        isPending={isPending}
        isLoading={isLoading}
        hasMessages={messages.length > 0}
      />
    </div>
  );
}
