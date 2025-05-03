import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constatns/keys';
import { getNewsList } from '@/api/news';

const useNewsListQuery = (sort: 'popular' | 'latest', limit = 10) => {
  return useQuery({
    queryKey: [queryKeys.news, sort, limit],
    queryFn: () => getNewsList({limit, sort}),
    select: data => data.data.items,
  })
}

export { useNewsListQuery };
