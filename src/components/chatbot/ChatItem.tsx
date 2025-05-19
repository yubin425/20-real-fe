import BotProfile from '@/components/chatbot/BotProfile';
import { MarkdownViewer } from '@/components/molecules/MarkdownViewer';

type ChatItemProps = {
  text: string;
};

export default function ChatItem({ text }: ChatItemProps) {
  return (
    <div className="flex items-start animate-fadeIn">
      <div className="mr-2">
        <BotProfile />
      </div>
      <div className="w-fit max-w-[85%] bg-primary-100 text-gray-800 pt-2.5 px-3 rounded-2xl rounded-tl-none shadow-sm text-sm break-words">
        <MarkdownViewer text={text} />
      </div>
    </div>
  );
}
