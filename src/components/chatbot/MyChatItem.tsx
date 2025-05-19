import { MarkdownViewer } from '@/components/molecules/MarkdownViewer';

type MyChatItemProps = {
  text: string;
};

export default function MyChatItem({ text }: MyChatItemProps) {
  return (
    <div className="flex-1 flex justify-end">
      <div className="bg-primary-500 rounded-2xl rounded-tr-none shadow-sm w-fit max-w-[85%] break-words">
        <MarkdownViewer text={text} className="text-white pt-2 px-3" />
      </div>
    </div>
  );
}
