import { getNoticesCommentList } from '@/api/post';
import { queryKeys } from '@/constatns/keys';
import { useInfiniteCursorQuery } from '@/queries/base/useInfiniteCursorQuery';
import { PostComment } from '@/types/post/postComment';

const useNoticeCommentListInfinityQuery = (noticeId: string, limit = 10) => {
  return useInfiniteCursorQuery<PostComment>({
    queryKey: [queryKeys.notice, queryKeys.comments, noticeId],
    queryFn: (pageParam) =>
      getNoticesCommentList({
        ...pageParam,
        noticeId,
        limit,
      }),
  });
};

export { useNoticeCommentListInfinityQuery };
