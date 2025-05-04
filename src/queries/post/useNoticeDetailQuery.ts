import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constatns/keys';
import { getNoticeDetail } from '@/api/post';

const useNoticeDetailQuery = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.notice, id],
    queryFn: () => getNoticeDetail(id),
    select: data => data.data
  })
}

export { useNoticeDetailQuery };
