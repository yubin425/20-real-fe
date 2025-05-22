import { getNewsDetail } from '@/api/news';
import { queryKeys } from '@/constatns/keys';
import { useApiQuery } from '@/queries/base/useApiQuery';

const useNewsDetailQuery = (id: string) => {
  return useApiQuery({
    queryKey: [queryKeys.news, id],
    queryFn: () => getNewsDetail(id),
    select: (res) => res.data,
  });
};

export { useNewsDetailQuery };
