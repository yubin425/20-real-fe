import { News } from '@/features/Post/types/News';
import Image from 'next/image';

interface HotNewsItemProps {
  news: News;
}

export default function HotNewsItem({ news }: HotNewsItemProps) {
  return (
    <div
      className="grow shrink basis-0 bg-white rounded-xl shadow-sm overflow-hidden mt-1 transition-transform hover:translate-y-[-3px] hover:shadow-md"
    >
      <Image
        src={news.imageUrl ?? ''}
        alt={news.title}
        className="w-full h-32 object-cover"
        width={200}
        height={100}
      />
      <div className="p-4">
        <h3 className="font-medium text-gray-800 line-clamp-2 h-12">{news.title}</h3>
      </div>
    </div>
  );
}
