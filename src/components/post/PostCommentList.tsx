'use client';

import { LoadingIndicator } from '@/components/atoms/LoadingIndicator';
import PostCommentItem from '@/components/post/PostCommentItem';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { EventName } from '@/lib/firebase/eventNames';
import { firebaseLogging } from '@/lib/firebase/logEvent';
import { useDeleteNewsCommentMutation } from '@/queries/news/useDeleteNewsCommentMutation';
import { useNewsCommentListInfinityQuery } from '@/queries/news/useNewsCommentListInfinityQuery';
import { useDeleteNoticeCommentMutation } from '@/queries/post/useDeleteNoticeCommentMutation';
import { useNoticeCommentListInfinityQuery } from '@/queries/post/useNoticeCommentListInfinityQuery';
import { useModal } from '@/stores/modalStore';
import { usePostCommentCountStore } from '@/stores/postCommentCountStore';
import { PostTypes } from '@/types/post/postType';

interface PostCommentListProps {
  type: PostTypes;
  postId: number;
}

export default function PostCommentList({ type, postId }: PostCommentListProps) {
  const { mutate: deleteNoticeComment } = useDeleteNoticeCommentMutation();
  const { mutate: deleteNewsComment } = useDeleteNewsCommentMutation();

  const noticeQuery = useNoticeCommentListInfinityQuery(postId.toString());
  const newsQuery = useNewsCommentListInfinityQuery(postId.toString());

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = type === PostTypes.Notice ? noticeQuery : newsQuery;

  const loadingRef = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const { decrement } = usePostCommentCountStore();
  const { openModal, closeModal } = useModal();

  // 댓글 삭제 버튼 클릭 시
  const handleDeleteComment = (commentId: number) => {
    openModal({
      title: '댓글을 삭제하시겠어요?',
      actions: [
        { label: '취소', variant: 'ghost', autoClose: true },
        {
          label: '삭제',
          variant: 'destructive',
          onClick: () => {
            firebaseLogging(EventName.POST_COMMENT_DELETE_CLICK, {
              description: `${type}-${postId}`,
            });
            if (type === PostTypes.Notice) {
              deleteNoticeComment(
                { noticeId: postId.toString(), commentId: commentId.toString() },
                { onSuccess: () => decrement() },
              );
            } else if (type === PostTypes.News) {
              deleteNewsComment(
                { newsId: postId.toString(), commentId: commentId.toString() },
                { onSuccess: () => decrement() },
              );
            }
            closeModal();
          },
        },
      ],
    });
  };

  return (
    <>
      <div className="border-t border-gray-100">
        {comments &&
          comments.map((comment) => (
            <PostCommentItem comment={comment} key={comment.id} onDelete={handleDeleteComment} />
          ))}
      </div>

      <LoadingIndicator loadingRef={loadingRef} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />
    </>
  );
}
