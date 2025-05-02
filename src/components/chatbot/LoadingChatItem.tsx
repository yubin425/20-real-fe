import BotProfile from '@/components/chatbot/BotProfile';

export default function LoadingChatItem() {
  return (
    <div className="flex flex-row w-fit items-start gap-3 pb-2.5">
      <BotProfile/>
      <div className="flex gap-2 pt-2.5">
        <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce-dot [animation-delay:0s]" />
        <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce-dot [animation-delay:0.2s]" />
        <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce-dot [animation-delay:0.4s]" />
      </div>
    </div>
  )
}
