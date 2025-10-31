"use client";
import { createContext, useContext, useState } from "react";
import { useConversationMutation } from "@src/hooks/useChatAPI";
import { IChatData } from "@src/lib/chat-service";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IMessage {
  role: "user" | "assistant";
  content: string;
}

interface IConversationContext {
  messages: IMessage[];
  conversationId?: string;
  sendMessage: (prompt: string) => void;
  isPending: boolean;
  updateConversationId: (id: string | undefined) => void;
  updateMessages: (messages: IMessage[]) => void;
  handleNewChat: () => void;
}

const ConversationContext = createContext<IConversationContext | null>(null);

export const ConversationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const { mutate, isPending } = useConversationMutation();

  const sendMessage = (prompt: string) => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty");
      return;
    }

    // Immediately show user message
    const userMsg = { role: "user" as const, content: prompt };
    setMessages((prev) => [...prev, userMsg]);

    const requestData: IChatData = { prompt, conversationId };

    mutate(requestData, {
      onSuccess: (res) => {
        // Example expected res structure: { reply: "...", conversationId: "..." }
        if (res.conversationId) setConversationId(res.conversationId);

        const aiMsg = { role: "assistant" as const, content: res.reply };
        setMessages((prev) => [...prev, aiMsg]);
      },
      onError: (err) => {
        // console.log(err);

        toast.error(
          (
            err as {
              data?: {
                response?: {
                  message?: string;
                };
              };
            }
          )?.data?.response?.message || "Something went wrong"
        );
      },
    });
  };
  const updateConversationId = (id: string | undefined) =>
    setConversationId(() => (id ? id : undefined));

  const updateMessages = (messages: IMessage[]) => {
    setMessages(messages);
  };

  const router = useRouter();
  const handleNewChat = () => {
    setMessages([]);
    setConversationId(undefined);
    router.push("/");
  };

  return (
    <ConversationContext.Provider
      value={{
        messages,
        conversationId,
        sendMessage,
        isPending,
        updateConversationId,
        updateMessages,
        handleNewChat,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversationContext = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversationContext can only be used in a ConversationProvider"
    );
  }
  return context;
};
