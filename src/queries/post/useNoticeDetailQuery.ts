import { getNoticeDetail } from '@/api/post';
import { queryKeys } from '@/constatns/keys';
import { useApiQuery } from '@/queries/base/useApiQuery';

const useNoticeDetailQuery = (id: string) => {
  return useApiQuery({
    queryKey: [queryKeys.notice, id],
    queryFn: () => getNoticeDetail(id),
    select: (data) => data?.data,
  });
};

export { useNoticeDetailQuery };
