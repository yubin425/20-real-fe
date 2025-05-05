import { fetcher } from '@/api/fetcher';
import { BaseResponse } from '@/types/common/base';

interface ChatbotQuestionResponse {
  answer: string;
}

const postChatbotQuestion = async (question: string): Promise<BaseResponse<ChatbotQuestionResponse>> => {
  return await fetcher(`/v1/chatbots`, {
    method: 'POST',
    body: JSON.stringify({question})
  });
}

export { postChatbotQuestion };
