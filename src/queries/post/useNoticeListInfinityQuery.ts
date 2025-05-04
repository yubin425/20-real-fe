import { useInfiniteCursorQuery } from '@/queries/base/useInfiniteCursorQuery';
import { queryKeys } from '@/constatns/keys';
import { getNoticeList } from '@/api/post';
import { Notice } from '@/types/post/notice';

const useNoticeListInfinityQuery = (limit = 10) => {
  return useInfiniteCursorQuery<Notice>({
    queryKey: [queryKeys.notice],
    queryFn: (pageParam) =>
      getNoticeList({
        ...pageParam,
        limit,
      }),
  });
};

export { useNoticeListInfinityQuery };
