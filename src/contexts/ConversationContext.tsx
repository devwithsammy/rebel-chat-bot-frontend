"use client";
import { createContext, useContext, useState } from "react";
import { useConversationMutation } from "@src/hooks/useChatAPI";
import { IChatData } from "@src/lib/chat-service";
import { toast } from "react-hot-toast";

interface IMessage {
  role: "user" | "assistant";
  content: string;
}

interface IConversationContext {
  messages: IMessage[];
  conversationId?: string;
  sendMessage: (prompt: string) => void;
  isPending: boolean;
  updateConversationId: (id: string) => void;
  updateMessagges: (messages: IMessage[]) => void;
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
        console.log(err);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error((err as any)?.message || "Something went wrong");
      },
    });
  };
  const updateConversationId = (id: string) => setConversationId(id);

  const updateMessagges = (messages: IMessage[]) => {
    setMessages(messages);
  };

  return (
    <ConversationContext.Provider
      value={{
        messages,
        conversationId,
        sendMessage,
        isPending,
        updateConversationId,
        updateMessagges,
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
