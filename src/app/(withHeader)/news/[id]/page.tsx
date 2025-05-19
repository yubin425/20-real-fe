import { cookies } from 'next/headers';

import { fetcher } from '@/api/fetcher';
import { ImageViewer } from '@/components/molecules/ImageViewer';
import { MarkdownViewer } from '@/components/molecules/MarkdownViewer';
import { PostHeader } from '@/components/molecules/PostHeader';
import { PostSummary } from '@/components/molecules/PostSummary';
import { PostCommentSection } from '@/components/organisms/PostCommentSection';
import { PostReaction } from '@/components/organisms/PostReaction/PostReaction';
import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { RedirectWithLoginModalPage } from '@/components/pages/RedirectWithLoginModalPage';
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
    const res = await fetcher<NewsDetail>(`/v1/news/${id}`, {
      method: 'GET',
      headers: {
        Cookie: cookie,
      },
    });

    if (res?.code === 401 || res?.code === 403) {
      return <RedirectWithLoginModalPage />;
    }

    if (res) news = res.data;
  } catch (e) {
    console.error('fetch failed:', e);
  }

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
