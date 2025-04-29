import BotProfile from '@/features/chatbot/components/BotProfile';

type ChatItemProps = {
  text?: string;
}

export default function ChatItem({text}: ChatItemProps) {
  return (
    <div className="flex items-start animate-fadeIn">
      <div className="mr-2">
        <BotProfile/>
      </div>
      <div className="max-w-[85%]">
        <div className="bg-primary-100 text-gray-800 py-2.5 px-3 rounded-2xl rounded-tl-none shadow-sm text-sm">
          {text}
        </div>
      </div>
    </div>
  )
}
