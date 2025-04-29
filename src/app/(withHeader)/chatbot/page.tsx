'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@/features/chatbot/types/ChatMessage';
import MyChatItem from '@/features/chatbot/components/MyChatItem';
import ChatItem from '@/features/chatbot/components/ChatItem';
import { v4 as uuidv4 } from 'uuid';
import { HEADER_HEIGHT } from '@/constatns/ui';
import { Input } from '@/components/Input';
import Button from '@/components/Button';
import { Send } from 'lucide-react';
import LoadingChatItem from '@/features/chatbot/components/LoadingChatItem';

export default function ChatbotPage() {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendClick = (e: FormEvent) => {
    e.preventDefault();
    setCurrentInput('');
    setChats(prev => [
      ...prev,
      {
        id: uuidv4(),
        text: currentInput,
        type: 'question',
      },
    ]);

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
  };

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [chats]);


  return (
    <div className="flex flex-col" style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
      <div className="flex-1 flex flex-col gap-4 p-4 pt-10 pb-18">
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
        className={`fixed bottom-0 left-0 right-0 flex flex-row items-center p-4 bg-white border-t max-w-app border-gray-200 mx-auto`}>
        <Input
          type="text"
          placeholder="질문을 입력하세요"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="shadow-md shadow-black/30"
        />
        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="ml-2 rounded-full shadow-md shadow-black/30"
          onClick={handleSendClick}
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
