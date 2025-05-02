import Image from 'next/image';
import choon from '@/assets/choon.png';

export default function BotProfile() {
  return (
    <Image
      src={choon}
      alt="프로필 이미지"
      width={32}
      height={32}
      className="rounded-full object-cover border-gray-400 border-1"
    />
  );
}
