type MyChatItemProps = {
  text: string;
}

export default function MyChatItem({text}: MyChatItemProps) {
  return (
    <div className="w-full flex justify-end">
      <div className="w-fit p-4 rounded-xl bg-primary-200 text-sm">
        {text}
      </div>
    </div>
  )
}
