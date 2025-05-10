'use client';

import { useParams } from 'next/navigation';

import MarkdownViewer from '@/components/common/MarkdownViewer';
import SingleImage from '@/components/common/SingleImage';
import PostCommentForm from '@/components/post/PostCommentForm';
import PostCommentList from '@/components/post/PostCommentList';
import PostHeader from '@/components/post/PostHeader';
import PostLikeButton from '@/components/post/PostLikeButton';
import PostSummary from '@/components/post/PostSummary';
import { useNewsDetailQuery } from '@/queries/news/useNewsDetailQuery';
import { PostTypes } from '@/types/post/postType';

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: news } = useNewsDetailQuery(params.id);

  if (!news) return null;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-app bg-white">
        <PostHeader tags={[news.tag]} title={news.title} viewCount={news.viewCount} createdAt={news.createdAt} />

        <PostSummary summary={news.summary} />

        <div className="px-4 pb-3">
          <MarkdownViewer text={news.content} />

          <SingleImage imageUrl={news.imageUrl} />
        </div>

        <PostLikeButton type={PostTypes.News} postId={news.id} userLike={news.userLike} likeCount={news.likeCount} />

        <PostCommentForm type={PostTypes.News} postId={news.id} commentCount={news.commentCount} />

        <PostCommentList type={PostTypes.News} postId={news.id} />
      </div>
    </div>
  );
}
