import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';

import { usePostChatbotQuestion } from '@/queries/chatbot/usePostChatbotQuestion';
import { useToastStore } from '@/stores/toastStore';
import { ChatMessage } from '@/types/chatbot/chatMessage';

export function useChatController() {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const { mutateAsync: postQuestion, isPending } = usePostChatbotQuestion();
  const { showToast } = useToastStore();

  const loadAnswer = async (text: string) => {
    setChats((prev) => [...prev, { id: uuidv4(), text, type: 'question' }]);
    setCurrentInput('');
    const res = await postQuestion(text);
    if (res?.data) {
      setChats((prev) => [...prev, { id: uuidv4(), text: res.data.answer, type: 'answer' }]);
    }
  };

  const handleInputChange = (value: string) => {
    if (value.length > 500) {
      showToast('메시지는 최대 500자까지 입력 가능합니다.', 'error', 'top');
      return;
    }
    setCurrentInput(value);
  };

  return {
    chats,
    currentInput,
    isPending,
    handleInputChange,
    setCurrentInput,
    loadAnswer,
  };
}
