import { ChatInput } from '@/components/chatbot/molecules/ChatInput';
import { SuggestedQuestions } from '@/components/chatbot/molecules/SuggestQuestions';
import { Chat } from '@/components/chatbot/organisms/ChatItem';
import { HeadlineBanner, HeadlineBannerSkeleton } from '@/components/chatbot/organisms/HeadlineBanner';
import useAutoScroll from '@/hooks/useAutoScroll';
import { useChatController } from '@/hooks/useChatController';
import { useHeadlineData } from '@/hooks/useGetHeadLine';

export function ChatbotPage() {
  const { headlines, isLoading: isHeadlineLoading } = useHeadlineData();
  const { chats, currentInput, isPending, handleInputChange, loadAnswer } = useChatController();

  const messagesEndRef = useAutoScroll([chats]);

  return (
    <div className="flex flex-col min-h-app bg-neutral-50">
      {/* 헤드라인 */}
      {isHeadlineLoading && chats.length === 0 && <HeadlineBannerSkeleton />}
      {!isHeadlineLoading && chats.length === 0 && headlines.length > 0 && <HeadlineBanner items={headlines} />}

      <div className="flex-1 flex flex-col gap-4 p-4 pb-16 relative">
        {/* 추천 질문 */}
        {chats.length === 0 && <SuggestedQuestions onSelect={loadAnswer} />}

        {/* 채팅 메시지 */}
        <div className="space-y-4">
          <Chat>
            {chats.map((chat) =>
              chat.type === 'question' ? (
                <Chat.UserMessage key={chat.id} text={chat.text} />
              ) : (
                <Chat.BotMessage key={chat.id} text={chat.text} />
              ),
            )}
            {isPending && <Chat.BotLoading />}
          </Chat>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <ChatInput
        value={currentInput}
        isLoading={isPending}
        onChange={handleInputChange}
        onSend={() => loadAnswer(currentInput)}
      />
    </div>
  );
}
