import { api } from "./api";

export interface IConversationHistory {
  conversationId: string;
  lastUserMessage: string;
  lastAssistantMessage: string;
  createdAt: string;
  updatedAt: string;
}
export interface IChatData {
  prompt: string;
  conversationId?: string;
}

export interface IMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  _id: string;
}
export interface IConversationResponse {
  conversationId: string;
  reply: string;
  context: IMessage[];
}

export const chatService = {
  getConversationHistory: async (): Promise<IConversationHistory[]> => {
    const res = await api.get<IConversationHistory[]>("/conversation/user");
    return res.data;
  },
  getConversationContext: async (id:string): Promise<IMessage[]> => {
    if (!id) return [];
    const res = await api.get<IMessage[]>(`/conversation/${id}`);
    return res.data;
  },
  chat: async (data: IChatData): Promise<IConversationResponse> => {
    const res = await api.post<IConversationResponse>("/conversation", data);
    return res.data;
  },
};
