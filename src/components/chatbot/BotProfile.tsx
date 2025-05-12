import choon from '@/assets/choon.png';
import SafeImage from '@/components/common/SafeImage';

export default function BotProfile() {
  return (
    <SafeImage
      src={choon}
      alt="프로필 이미지"
      width={32}
      height={32}
      className="rounded-full object-cover border-gray-400 border-1"
    />
  );
}
