import Image from 'next/image';

type ChatItemProps = {
  text?: string;
}

export default function ChatItem({text}: ChatItemProps) {
  return (
    <div className="flex flex-row w-fit max-w-[500px] items-start gap-3">
      <Image
        src="https://i.ibb.co/q3dGhGZc/image.png"
        alt="프로필 이미지"
        width={32}
        height={32}
        className="rounded-full object-cover border-gray-400 border-1"
      />

      <p className="pt-1 animate-fade-in text-sm">{text}</p>
    </div>
  )
}
