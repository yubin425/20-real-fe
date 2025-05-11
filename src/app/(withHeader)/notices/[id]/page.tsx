import { cookies } from 'next/headers';

import { fetcher } from '@/api/fetcher';
import ImageCarousel from '@/components/common/ImageCarousel';
import MarkdownViewer from '@/components/common/MarkdownViewer';
import PostCommentForm from '@/components/post/PostCommentForm';
import PostCommentList from '@/components/post/PostCommentList';
import PostFileItem from '@/components/post/PostFileItem';
import PostHeader from '@/components/post/PostHeader';
import PostLikeButton from '@/components/post/PostLikeButton';
import PostSummary from '@/components/post/PostSummary';
import { BaseResponse } from '@/types/common/base';
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
    const { data } = await fetcher<BaseResponse<NoticeDetail>>(`/v1/notices/${id}`, {
      method: 'GET',
      headers: {
        Cookie: cookie,
      },
    });

    if (data) notice = data;
  } catch (e) {
    console.error('fetch failed:', e);
  }

  if (!notice) return null;

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
                <a href={file.fileUrl} download target="_blank" rel="noopener noreferrer">
                  <PostFileItem file={file} />
                </a>
              </div>
            ))}
        </div>

        <PostLikeButton
          type={PostTypes.Notice}
          postId={notice.id}
          userLike={notice.userLike}
          likeCount={notice.likeCount}
        />

        <PostCommentForm type={PostTypes.Notice} postId={notice.id} commentCount={notice.commentCount} />

        <PostCommentList type={PostTypes.Notice} postId={notice.id} />
      </div>
    </div>
  );
}
