'use client';

import { useParams } from 'next/navigation';

import { ImageViewer } from '@/components/common/molecules/ImageViewer';
import { MarkdownViewer } from '@/components/common/molecules/MarkdownViewer';
import { NotFoundPage } from '@/components/common/pages/NotFoundPage';
import { PostHeader } from '@/components/post/molecules/PostHeader';
import { PostSummary } from '@/components/post/molecules/PostSummary';
import { PostCommentSection } from '@/components/post/organisms/PostCommentSection';
import { PostReaction } from '@/components/post/organisms/PostReaction/PostReaction';
import { useNewsDetailQuery } from '@/queries/news/useNewsDetailQuery';
import { PostTypes } from '@/types/post/postType';

export function NewsDetailPage() {
  const params = useParams();
  const id: string = params?.id as string;
  const { data: news, isLoading } = useNewsDetailQuery(id);

  if (isLoading) return null;
  // if (response?.code === 401 || response?.code === 403) return <RedirectWithLoginModalPage/>
  if (!news) return <NotFoundPage />;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-app bg-white">
        <PostHeader tags={[news.tag]} title={news.title} viewCount={news.viewCount} createdAt={news.createdAt} />

        <PostSummary summary={news.summary} />

        <div className="px-4 pb-3">
          <MarkdownViewer text={news.content} />

          <ImageViewer imageUrl={news.imageUrl} />
        </div>

        <PostReaction type={PostTypes.News} postId={news.id} userLike={news.userLike} likeCount={news.likeCount} />

        <PostCommentSection type={PostTypes.News} postId={news.id} commentCount={news.commentCount} />
      </div>
    </div>
  );
}
