import { cookies } from 'next/headers';

import { fetcher } from '@/api/fetcher';
import MarkdownViewer from '@/components/common/MarkdownViewer';
import SingleImage from '@/components/common/SingleImage';
import PostCommentForm from '@/components/post/PostCommentForm';
import PostCommentList from '@/components/post/PostCommentList';
import PostHeader from '@/components/post/PostHeader';
import PostLikeButton from '@/components/post/PostLikeButton';
import PostSummary from '@/components/post/PostSummary';
import { BaseResponse } from '@/types/common/base';
import { NewsDetail } from '@/types/post/newsDetail';
import { PostTypes } from '@/types/post/postType';

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const cookie = (await cookies()).toString();
  const { id } = await params;
  let news: NewsDetail | null = null;

  try {
    const { data } = await fetcher<BaseResponse<NewsDetail>>(`/v1/news/${id}`, {
      method: 'GET',
      headers: {
        Cookie: cookie,
      },
    });

    if (data) news = data;
  } catch (e) {
    console.error('fetch failed:', e);
  }

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
