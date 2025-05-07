import { PostPlatform } from '@/types/post/postPlatform';
import { formatTime, isRecent } from '@/utils/times';

interface PostHeaderProps {
  tags?: string[];
  title: string;
  author?: string | null;
  viewCount?: number | null;
  createdAt: string;
  platform?: PostPlatform | null;
  originalUrl?: string | null;
}

export default function PostHeader({
  tags = [],
  title,
  author,
  viewCount,
  createdAt,
  originalUrl,
  platform,
}: PostHeaderProps) {
  const displayTags = isRecent(createdAt) ? ['최신', ...tags] : tags;

  return (
    <>
      {displayTags.length > 0 && (
        <div className="flex flex-row px-4 pt-4 pb-2 gap-2">
          {displayTags.map((tag) => (
            <div
              key={tag}
              className={`inline-block ${tag === '최신' ? 'bg-primary-50 text-primary-500' : 'bg-neutral-100 text-neutral-600'}  rounded-full px-3 py-1 text-xs font-semibold`}
            >
              {tag}
            </div>
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
          {originalUrl && platform && (
            <div className="flex items-center px-3 py-1 bg-indigo-50 rounded-full">
              <a href={originalUrl} className="text-xs font-medium text-primary-500 flex items-center">
                {platform}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
