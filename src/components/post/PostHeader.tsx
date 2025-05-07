import { PostPlatform } from '@/types/post/postPlatform';
import { useEffect } from 'react';
import { formatTime, isRecent } from '@/utils/times';

interface PostHeaderProps {
  tags?: string[];
  title: string;
  author?: string | null;
  viewCount?: number | null;
  createdAt: string;
  platform?: PostPlatform | null;
}

export default function PostHeader({ tags = [], title, author, viewCount, createdAt, platform }: PostHeaderProps) {
  useEffect(() => {
    if (isRecent(createdAt)) {
      tags?.push('최신')
    }
  }, [createdAt]);

  return (
    <>
      {tags?.length > 0 && (
        <div className="px-4 pt-4 pb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>
      )}

      <div className="px-4 pb-2">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-sm text-gray-500">
            {author && (
              <>
                <span className="font-medium text-primary-500">{author}</span>
                <span className="mx-1">•</span>
              </>
            )}
            {viewCount && (
              <>
                <span className="font-medium text-primary-500">조회수 {viewCount}</span>
                <span className="mx-1">•</span>
              </>
            )}
            <span>{formatTime(createdAt)}</span>
          </div>
          {platform && (
            <div className="flex items-center px-3 py-1 bg-indigo-50 rounded-full">
              <span className="text-xs font-medium text-primary-500 flex items-center">
                {platform}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
