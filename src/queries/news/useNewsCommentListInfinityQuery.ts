import { getNewsCommentList } from '@/api/news';
import { queryKeys } from '@/constatns/keys';
import { useInfiniteCursorQuery } from '@/queries/base/useInfiniteCursorQuery';
import { PostComment } from '@/types/post/postComment';

const useNewsCommentListInfinityQuery = (newsId: string, limit = 10) => {
  return useInfiniteCursorQuery<PostComment>({
    queryKey: [queryKeys.news, queryKeys.comments, newsId],
    queryFn: (pageParam) =>
      getNewsCommentList({
        ...pageParam,
        newsId,
        limit,
      }),
  });
};

export { useNewsCommentListInfinityQuery };
