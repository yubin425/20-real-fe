'use client';

import { useParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
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
import { useDeleteNoticeCommentMutation } from '@/queries/post/useDeleteNoticeCommentMutation';
import { useCreateNoticeCommentMutation } from '@/queries/post/useCreateNoticeCommentMutation';
import { useToggleNoticeLikeMutation } from '@/queries/post/useToggleNoticeLikeMutation';
import { useModal } from '@/stores/modalStore';

export default function NoticeDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: notice } = useNoticeDetailQuery(params.id)
  const { mutate: toggleLike } = useToggleNoticeLikeMutation()
  const { mutate: postComment } = useCreateNoticeCommentMutation()
  const { mutate: deleteComment } = useDeleteNoticeCommentMutation()
  const { data: comments, fetchNextPage, hasNextPage, isFetchingNextPage } = useNoticeCommentListInfinityQuery(params.id)
  const loadingRef = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const { openModal, closeModal } = useModal();
  const [comment, setComment] = useState('');

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    postComment({ noticeId: params.id, content: comment })
    setComment('');
  }

  // 댓글 삭제 버튼 클릭 시
  const handleDeleteComment = (commentId: number) => {
    openModal(
      '댓글을 삭제하시겠어요?',
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={closeModal}>
          취소
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            deleteComment({ noticeId: params.id, commentId: commentId.toString() });
            closeModal();
          }}
        >
          삭제
        </Button>
      </div>
    );
  }

  if (!notice) return null;

  return (
    <div className="flex justify-center items-center w-full">
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
            onClick={() => toggleLike({noticeId: params.id})}
            className={`flex items-center justify-center px-6 py-2 rounded-full ${notice.userLike ? 'bg-secondary-50 text-secondary-400' : 'bg-gray-100 text-gray-500'} transition-all`}
          >
            <Heart size={16} className={`mr-2 ${notice.userLike ? 'fill-secondary-500 text-secondary-400' : ''}`} />
            <span className="font-medium">{notice.likeCount}</span>
          </Button>
        </div>

        {/* 댓글 */}
        <div className="px-4 py-3 border-t border-gray-100 flex flex-col justify-between items-start gap-3">
          <div className="flex items-center text-gray-500">
            <MessageCircle size={16} className="mr-1" />
            <span className="text-sm font-medium">댓글 {notice.commentCount}</span>
          </div>

          <form onSubmit={handleSubmitComment} className='flex w-full gap-3 justify-center items-center'>
            <Input className='flex-1 rounded-xl' value={comment} onChange={e => setComment(e.target.value)}/>

            <Button variant='outline' size='icon' className='shrink-0' type='submit'>
              <ArrowUp size={18}/>
            </Button>
          </form>


        </div>

        {/* 댓글 부분 */}
        <div className="border-t border-gray-100">
          {comments && comments.map((comment) =>
            <PostCommentItem comment={comment} key={comment.id} onDelete={handleDeleteComment} />
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
