import { queryKeys } from '@/constatns/keys';
import { getNewsList } from '@/api/news';
import { useInfiniteCursorQuery } from '@/queries/base/useInfiniteCursorQuery';
import { News } from '@/types/post/news';

const useNewsListInfinityQuery = (sort: 'popular' | 'latest', limit = 10) => {
  return useInfiniteCursorQuery<News>({
    queryKey: [queryKeys.news, sort],
    queryFn: (pageParam) =>
      getNewsList({
        ...pageParam,
        sort,
        limit,
      }),
  });
};

export { useNewsListInfinityQuery };

