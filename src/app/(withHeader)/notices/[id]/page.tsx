import { cookies } from 'next/headers';

import { fetcher } from '@/api/fetcher';
import { ImageCarousel } from '@/components/common/molecules/ImageCarousel';
import { MarkdownViewer } from '@/components/common/molecules/MarkdownViewer';
import { NotFoundPage } from '@/components/common/pages/NotFoundPage';
import { RedirectWithLoginModalPage } from '@/components/common/pages/RedirectWithLoginModalPage';
import { PostFileItem } from '@/components/post/molecules/PostFileItem';
import { PostHeader } from '@/components/post/molecules/PostHeader';
import { PostSummary } from '@/components/post/molecules/PostSummary';
import { PostCommentSection } from '@/components/post/organisms/PostCommentSection';
import { PostReaction } from '@/components/post/organisms/PostReaction/PostReaction';
import { NoticeDetail } from '@/types/post/noticeDetail';
import { PostTypes } from '@/types/post/postType';

interface NoticeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const cookie = (await cookies()).toString();
  const { id } = await params;
  let notice: NoticeDetail | null = null;

  try {
    const res = await fetcher<NoticeDetail>(`/v1/notices/${id}`, {
      method: 'GET',
      headers: {
        Cookie: cookie,
      },
    });

    if (res?.code === 401 || res?.code === 403) {
      return <RedirectWithLoginModalPage />;
    }

    if (res) notice = res.data;
  } catch (e) {
    console.error('fetch failed:', e);
  }

  if (!notice) return <NotFoundPage />;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-app bg-white">
        <PostHeader
          tags={[notice.tag]}
          title={notice.title}
          author={notice.author}
          createdAt={notice.createdAt}
          platform={notice.platform}
          originalUrl={notice.originalUrl}
        />

        <PostSummary summary={notice.summary} />

        <div className="px-4 pb-3">
          <MarkdownViewer text={notice.content} />

          {notice.images.length > 0 && <ImageCarousel images={notice.images} />}

          {notice.files.length > 0 &&
            notice.files.map((file) => (
              <div key={file.id}>
                <PostFileItem file={file} />
              </div>
            ))}
        </div>

        <PostReaction
          type={PostTypes.Notice}
          postId={notice.id}
          userLike={notice.userLike}
          likeCount={notice.likeCount}
        />

        <PostCommentSection type={PostTypes.Notice} postId={notice.id} commentCount={notice.commentCount} />
      </div>
    </div>
  );
}
