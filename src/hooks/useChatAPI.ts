import { chatService, IChatData } from "@src/lib/chat-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const chatServiceKeys = {
  history: ["chat-history"] as const,
};

export const useConversationHistory = () => {
  return useQuery({
    queryKey: chatServiceKeys.history,
    queryFn: chatService.getConversationHistory,
  });
};

export const useGetConversationContext= (id?:string) => { 
    return useQuery({
        queryKey: [...chatServiceKeys.history,id],
        queryFn: () => chatService.getConversationContext(id||""),
        enabled:!!id
      }); 
}
export const useConversationMutation = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IChatData) => {
      return await chatService.chat(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: chatServiceKeys.history,
      });
    },
    onError: (error) => {
      console.error("❌ Error:", error.message || error);
    },
  });
};

export function useOpenRouterMutation() {}
