import { News } from '@/features/Post/types/News';
import { ChevronRight } from 'lucide-react';
import { differenceInHours, parse } from 'date-fns';
import { formatTime } from '@/utils/formatTime';

interface NewsListItemProps {
  news: News;
}

export default function NewsListItem({ news }: NewsListItemProps) {
  const isRecent = differenceInHours(new Date(), parse(news.createdAt, 'yyyy.MM.dd HH:mm:ss', new Date())) < 24;

  return (
    <div className="bg-white rounded-xl shadow-sm mb-3 hover:shadow-md transition-shadow">
      <div className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 mr-1">
            {isRecent && (
              <span className="bg-secondary-300 text-white text-xs py-0.5 px-2 rounded-full">NEW</span>
            )}
            <h3 className="font-medium text-gray-800 line-clamp-1">{news.title}</h3>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span>{formatTime(news.createdAt)}</span>
            {news.commentCount > 0 && (
              <span className="ml-2 text-primary-500 font-medium">
              댓글 {news.commentCount}
            </span>
            )}
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-400" />
      </div>
    </div>
  );
}
