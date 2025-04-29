import Image from 'next/image';

export default function LoadingChatItem() {
  return (
    <div className="flex flex-row w-fit max-w-[500px] items-start gap-3">
      <Image
        src="https://i.ibb.co/q3dGhGZc/image.png"
        alt="프로필 이미지"
        width={32}
        height={32}
        className="rounded-full object-cover border-gray-400 border-1"
      />
      <div className="flex gap-2 pt-2.5">
        <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce-dot [animation-delay:0s]" />
        <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce-dot [animation-delay:0.2s]" />
        <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce-dot [animation-delay:0.4s]" />
      </div>
    </div>
  )
}
