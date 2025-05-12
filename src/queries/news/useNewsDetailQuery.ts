import { useQuery } from '@tanstack/react-query';

import { getNewsDetail } from '@/api/news';
import { queryKeys } from '@/constatns/keys';

const useNewsDetailQuery = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.news, id],
    queryFn: () => getNewsDetail(id),
    select: (data) => data?.data,
  });
};

export { useNewsDetailQuery };
