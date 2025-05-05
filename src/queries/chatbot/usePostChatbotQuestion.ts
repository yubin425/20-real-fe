import { useMutation } from '@tanstack/react-query';
import { postChatbotQuestion } from '@/api/chatbot';

export function usePostChatbotQuestion() {
  return useMutation({
    mutationFn: (question: string) =>
      postChatbotQuestion(question),
  })
}
