import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constatns/keys';
import { getNewsDetail } from '@/api/news';

const useNewsDetailQuery = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.news, id],
    queryFn: () => getNewsDetail(id),
    select: data => data.data
  })
}

export { useNewsDetailQuery };
