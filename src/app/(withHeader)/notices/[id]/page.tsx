'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowUp, Heart, MessageCircle } from 'lucide-react';
import PostHeader from '@/components/post/PostHeader';
import PostSummary from '@/components/post/PostSummary';
import MarkdownViewer from '@/components/common/MarkdownViewer';
import ImageCarousel from '@/components/common/ImageCarousel';
import Button from '@/components/common/Button';
import PostCommentItem from '@/components/post/PostCommentItem';
import PostFileItem from '@/components/post/PostFileItem';
import Input from '@/components/common/Input';
import { useNoticeDetailQuery } from '@/queries/post/useNoticeDetailQuery';
import { useNoticeCommentListInfinityQuery } from '@/queries/post/useNoticeCommentListInfinityQuery';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import LoadingIndicator from '@/components/common/LoadingIndicator';

export default function NoticeDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: notice } = useNoticeDetailQuery(params.id)
  const { data: comments, fetchNextPage, hasNextPage, isFetchingNextPage } = useNoticeCommentListInfinityQuery(params.id)
  const loadingRef = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const [liked, setLiked] = useState(false);

  if (!notice) return null;

  return (
    <div className="flex justify-center items-center w-full pt-header">
      <div className="w-full max-w-app bg-white">

        <PostHeader
          tag={notice.tag}
          title={notice.title}
          author={notice.author}
          createdAt={notice.createdAt}
          platform={notice.platform}
        />

        <PostSummary summary={notice.summary} />

        <div className="px-4 pb-3">
          <MarkdownViewer text={notice.content} />

          {notice.images && (
            <ImageCarousel images={notice.images} />
          )}

          {notice.files && (
            notice.files.map((file) => (
              <div key={file.id}>
                <PostFileItem file={file} />
              </div>
            ))
          )}

        </div>

        {/* 좋아요 버튼 */}
        <div className="px-4 mb-4 flex justify-center">
          <Button
            variant="plain"
            onClick={() => setLiked(!liked)}
            className={`flex items-center justify-center px-6 py-2 rounded-full ${liked ? 'bg-pink-50 text-pink-500' : 'bg-gray-100 text-gray-500'} transition-all`}
          >
            <Heart size={16} className={`mr-2 ${liked ? 'fill-pink-500 text-pink-500' : ''}`} />
            <span className="font-medium">{liked ? 13 : 12}</span>
          </Button>
        </div>

        {/* 댓글 */}
        <div className="px-4 py-3 border-t border-gray-100 flex flex-col justify-between items-start gap-3">
          <div className="flex items-center text-gray-500">
            <MessageCircle size={16} className="mr-1" />
            <span className="text-sm font-medium">댓글 {notice.commentCount}</span>
          </div>

          <div className='flex w-full gap-3 justify-center items-center'>
            <Input className='flex-1 rounded-xl'/>

            <Button variant='outline' size='icon' className='shrink-0'>
              <ArrowUp size={18}/>
            </Button>
          </div>


        </div>

        {/* 댓글 부분 */}
        <div className="border-t border-gray-100">
          {comments && comments.map((comment) =>
            <PostCommentItem comment={comment} key={comment.id} />
          )}
        </div>

        <LoadingIndicator
          loadingRef={loadingRef}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );

}
