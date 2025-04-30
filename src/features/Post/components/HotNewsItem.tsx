import { News } from '@/features/Post/types/News';
import Image from 'next/image';

interface HotNewsItemProps {
  news: News;
  userRead: boolean;
}

export default function HotNewsItem({ news, userRead }: HotNewsItemProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden mt-1 transition-transform hover:translate-y-[-3px] hover:shadow-md"
    >
      <Image
        src={news.imageUrl ?? ''}
        alt={news.title}
        className="w-full h-32 object-cover"
        width={200}
        height={100}
      />
      <div className="p-4">
        <h3 className={`font-medium ${userRead ? "text-gray-400" : "text-gray-800"} line-clamp-2 h-12`}>{news.title}</h3>
      </div>
    </div>
  );
}
