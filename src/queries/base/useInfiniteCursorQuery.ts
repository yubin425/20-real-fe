import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';

import { BaseResponse, CursorParam, CursorResponse } from '@/types/common/base';

interface UseInfiniteCursorQueryParams<TItem> {
  queryKey: string[];
  queryFn: (params: CursorParam) => Promise<BaseResponse<CursorResponse<TItem>>>;
  options?: Omit<
    UseInfiniteQueryOptions<
      BaseResponse<CursorResponse<TItem>>, // queryFn으로 가져오는 데이터
      Error,
      TItem[], // select 후 반환하는 데이터
      BaseResponse<CursorResponse<TItem>>, // getNextPageParam의 lastPage 타입
      string[], // query key 타입
      CursorParam | null // queryFn의 pageParam 타입
    >,
    'queryKey' | 'getNextPageParam' | 'initialPageParam'
  >;
}

export function useInfiniteCursorQuery<TItem>({
  queryKey,
  queryFn,
  options,
}: UseInfiniteCursorQueryParams<TItem>): UseInfiniteQueryResult<TItem[], Error> {
  return useInfiniteQuery<BaseResponse<CursorResponse<TItem>>, Error, TItem[], string[], CursorParam | null>({
    queryKey,
    queryFn: ({ pageParam }) =>
      queryFn({
        cursorId: pageParam?.cursorId ?? null,
        cursorStandard: pageParam?.cursorStandard ?? null,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) return undefined;
      return {
        cursorId: lastPage.data.nextCursorId,
        cursorStandard: lastPage.data.nextCursorStandard,
      };
    },
    select: (data) => data.pages.flatMap((page) => page.data.items),
    ...options,
  });
}
