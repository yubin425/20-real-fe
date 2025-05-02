type MyChatItemProps = {
  text: string;
}

export default function MyChatItem({text}: MyChatItemProps) {
  return (
    <div className="flex items-start justify-end animate-fadeIn">
      <div className="flex-1 max-w-[85%] flex justify-end">
        <div className="bg-primary-500 text-white py-2.5 px-3 rounded-2xl rounded-tr-none shadow-sm text-sm">
          {text}
        </div>
      </div>
    </div>
  )
}
