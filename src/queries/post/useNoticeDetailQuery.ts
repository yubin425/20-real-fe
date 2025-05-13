import { useQuery } from '@tanstack/react-query';

import { getNoticeDetail } from '@/api/post';
import { queryKeys } from '@/constatns/keys';

const useNoticeDetailQuery = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.notice, id],
    queryFn: () => getNoticeDetail(id),
    select: (data) => data?.data,
  });
};

export { useNoticeDetailQuery };
