import { PostPlatform } from '@/features/Post/types/PostPlatform';

interface PostHeaderProps {
  tag?: string | null;
  title: string;
  author: string;
  createdAt: string;
  platform: PostPlatform;
}

export default function PostHeader({ tag, title, author, createdAt, platform }: PostHeaderProps) {
  return (
    <>
      {tag && (
        <div className="px-4 pt-4 pb-2">
          <span
            className="inline-block bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-semibold">{tag}</span>
        </div>
      )}
      
      <div className="px-4 pb-2">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium text-primary-400">{author}</span>
            <span className="mx-1">•</span>
            <span>{createdAt}</span>
          </div>
          <div className="flex items-center px-3 py-1 bg-indigo-50 rounded-full">
              <span className="text-xs font-medium text-primary-500 flex items-center">
                {platform}
              </span>
          </div>
        </div>
      </div>
    </>
  );
}
