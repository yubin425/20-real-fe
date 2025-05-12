import { UseInfiniteQueryOptions } from '@tanstack/react-query';

import { getNoticeList } from '@/api/post';
import { queryKeys } from '@/constatns/keys';
import { useInfiniteCursorQuery } from '@/queries/base/useInfiniteCursorQuery';
import { BaseResponse, CursorParam, CursorResponse } from '@/types/common/base';
import { Notice } from '@/types/post/notice';

interface UseNoticeListInfinityQueryParams {
  limit?: number;
  options?: Omit<
    UseInfiniteQueryOptions<
      BaseResponse<CursorResponse<Notice>>, // queryFn으로 가져오는 데이터
      Error,
      Notice[], // select 후 반환하는 데이터
      BaseResponse<CursorResponse<Notice>>, // getNextPageParam의 lastPage 타입
      string[], // query key 타입
      CursorParam | null // queryFn의 pageParam 타입
    >,
    'queryKey' | 'getNextPageParam' | 'initialPageParam'
  >;
}

const useNoticeListInfinityQuery = ({ limit = 10, options }: UseNoticeListInfinityQueryParams = {}) => {
  return useInfiniteCursorQuery<Notice>({
    queryKey: [queryKeys.notice],
    queryFn: (pageParam) =>
      getNoticeList({
        ...pageParam,
        limit,
      }),
    options: options,
  });
};

export { useNoticeListInfinityQuery };
