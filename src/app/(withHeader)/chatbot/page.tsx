'use client';

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@/types/chatbot/chatMessage';
import MyChatItem from '@/components/chatbot/MyChatItem';
import ChatItem from '@/components/chatbot/ChatItem';
import { v4 as uuidv4 } from 'uuid';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { Send } from 'lucide-react';
import LoadingChatItem from '@/components/chatbot/LoadingChatItem';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { useToastStore } from '@/stores/toastStore';
import HeadlineBanner from '@/components/chatbot/HeadlineBanner';
import { usePostChatbotQuestion } from '@/queries/chatbot/usePostChatbotQuestion';
import { useHeadlineData } from '@/hooks/useGetHeadLine';
import HeadlineBannerSkeleton from '@/components/chatbot/HeadlineBannerSkeleton';

const suggestQuestions: string[] = [
  "휴가 신청하는 법을 알려줘.",
  "유료 구독료 지원 일정을 알려줘."
]

export default function ChatbotPage() {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  // 상단 헤드라인 배너 가져오기
  const { headlines, isLoading: isHeadlineLoading } = useHeadlineData();

  const { mutateAsync: postQuestion, isPending } = usePostChatbotQuestion()

  const { showToast } = useToastStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 추천 검색어 클릭
  const handleSuggestQuestionClick = (text: string) => {
    loadAnswer(text)
  }

  // 채팅 입력
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    if (newValue.length > 500) {
      showToast('메시지는 최대 500자까지 입력 가능합니다.', 'error', 'top');
      return;
    }
    setCurrentInput(newValue);
  }

  // 채팅 전송 버튼 클릭
  const handleSendClick = (e: FormEvent) => {
    e.preventDefault();
    loadAnswer(currentInput)
  };

  // 현재 채팅을 chat 리스트에 등록하고, 답변 받아옴
  const loadAnswer = async (text: string) => {
    setChats(prev => [
      ...prev,
      {
        id: uuidv4(),
        text: text,
        type: 'question',
      },
    ]);

    setCurrentInput('');
    const answer = await postQuestion(text)

    setChats(prev => [
      ...prev,
      {
        id: uuidv4(),
        text: answer.data.answer,
        type: 'answer',
      },
    ]);
  }


  useEffect(() => {
    setTimeout(() => {
      // chat 갱신된다면, 제일 밑으로 스크롤
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [chats]);


  return (
    <div className="flex flex-col min-h-app bg-neutral-50">
      {/* 최신 공지와 뉴스 */}
      {isHeadlineLoading && chats.length === 0 && <HeadlineBannerSkeleton/>}
      {!isHeadlineLoading && chats.length === 0 && headlines.length > 0 && (
        <HeadlineBanner items={headlines}/>
      )}

      <div className="flex-1 flex flex-col gap-4 p-4 pb-16 relative">
        {/* 로고와 추천 질문 */}
        {chats.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="mb-2 transform hover:scale-105 transition-transform duration-300 px-3">
              <Image src={logo} alt="logo" width={400} height={50} priority className="drop-shadow-md" />
            </div>

            <div className="w-full max-w-md space-y-3">
              {suggestQuestions.map((text) => (
                <div
                  key={text}
                  onClick={() => handleSuggestQuestionClick(text)}
                  className="bg-white border border-gray-200 p-3 rounded-2xl text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-300 cursor-pointer shadow-sm transition-all duration-200"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 채팅 메시지 */}
        <div className="space-y-4">
          {chats.map((chat) =>
            chat.type === 'question' ? (
              <MyChatItem key={chat.id} text={chat.text} />
            ) : (
              <ChatItem key={chat.id} text={chat.text} />
            ),
          )}

          {isPending && <LoadingChatItem />}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <form className="relative bottom-0 w-full max-w-app">
        <div className="bg-white p-4 border-t border-gray-100  rounded-t-3xl">
          <div className="flex items-center bg-white rounded-full pr-2 gap-2 shadow-md">

            <Input
              type="text"
              placeholder="질문을 입력하세요"
              value={currentInput}
              onChange={handleInputChange}
              className="flex-1 text-gray-700 rounded-full"
              autoFocus={true}
            />

            <Button
              type="submit"
              size="icon"
              className={`text-white shrink-0 ${
                isPending || currentInput === '' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSendClick}
              disabled={isPending || currentInput === ''}
            >
              <Send size={18} />
            </Button>
          </div>

          {/*<p className="text-xs text-center text-gray-400 mt-2">*/}
          {/*  2025년 4월 7까지 업데이트된 챗봇입니다.*/}
          {/*</p>*/}
        </div>
      </form>
    </div>
  );
}
