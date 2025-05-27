import { getNewsList } from '@/api/news';
import { queryKeys } from '@/constatns/keys';
import { useApiQuery } from '@/queries/base/useApiQuery';

const useNewsListQuery = (sort: 'popular' | 'latest', limit = 10) => {
  return useApiQuery({
    queryKey: [queryKeys.news, sort, limit],
    queryFn: () => getNewsList({ limit, sort }),
    select: (data) => data.items,
  });
};

export { useNewsListQuery };
