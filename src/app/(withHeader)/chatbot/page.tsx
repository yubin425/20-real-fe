'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@/features/chatbot/types/ChatMessage';
import MyChatItem from '@/features/chatbot/components/MyChatItem';
import ChatItem from '@/features/chatbot/components/ChatItem';
import { v4 as uuidv4 } from 'uuid';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Send } from 'lucide-react';
import LoadingChatItem from '@/features/chatbot/components/LoadingChatItem';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import SuggestQuestionItem from '@/features/chatbot/components/SuggestQuestionItem';

const suggestQuestions: string[] = [
  "5/6 임시 공휴일에 카테부도 쉬어?",
  "휴가 신청하는 법을 알려줘",
]

export default function ChatbotPage() {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 추천 검색어 클릭
  const handleSuggestQuestionClick = (text: string) => {
    loadAnswer(text)
  }

  // 채팅 전송 버튼 클릭
  const handleSendClick = (e: FormEvent) => {
    e.preventDefault();
    loadAnswer(currentInput)
  };

  // 현재 채팅을 chat 리스트에 등록하고, 답변 받아옴
  const loadAnswer = (text: string) => {
    setChats(prev => [
      ...prev,
      {
        id: uuidv4(),
        text: text,
        type: 'question',
      },
    ]);

    setCurrentInput('');
    setIsLoading(true);

    setTimeout(() => {
      setChats(prev => [
        ...prev,
        {
          id: uuidv4(),
          text: '반가워~~~',
          type: 'answer',
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }


  useEffect(() => {
    setTimeout(() => {
      // chat 갱신된다면, 제일 밑으로 스크롤
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [chats]);


  return (
    <div className="flex flex-col min-h-app">
      <div className="flex-1 flex flex-col gap-4 p-4 pt-10 pb-18 relative">
        {chats.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <Image src={logo} alt="logo" width={400} height={50} />
            {suggestQuestions.map((text) =>
              <SuggestQuestionItem key={text} text={text} onClick={handleSuggestQuestionClick}/>
            )}

          </div>
        )}

        {chats.map((chat) =>
          chat.type === 'question' ? (
            <MyChatItem key={chat.id} text={chat.text} />
          ) : (
            <ChatItem key={chat.id} text={chat.text} />
          ),
        )}

        {isLoading && <LoadingChatItem />}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="fixed bottom-0 left-0 right-0 bg-white flex flex-row items-center p-4  max-w-app mx-auto">
        <Input
          type="text"
          placeholder="질문을 입력하세요"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="shadow-md shadow-black/30"
          autoFocus={true}
        />
        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="ml-2 rounded-full shadow-md shadow-black/30"
          onClick={handleSendClick}
          disabled={isLoading}
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
