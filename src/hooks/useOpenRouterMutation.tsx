'use client';

import { useMutation } from '@tanstack/react-query';
import { getOpenRouterResponse } from '@lib/ai';

export function useOpenRouterMutation() {
  return useMutation({
    mutationFn: async (prompt: string) => {
      return await getOpenRouterResponse(prompt);
    },
    onSuccess: (data) => {
      console.log('✅ Success:', data);
    },
    onError: (error) => {
      console.error('❌ Error:', error.message || error);
    },
  });
}
