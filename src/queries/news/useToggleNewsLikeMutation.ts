import { useMutation } from '@tanstack/react-query';

import { toggleNewsLike } from '@/api/news';
import { queryKeys } from '@/constatns/keys';
import { queryClient } from '@/queries/base/queryClient';
import { BaseResponse } from '@/types/common/base';
import { NewsDetail } from '@/types/post/newsDetail';

interface ToggleNewsLikeRequest {
  newsId: string;
}

export function useToggleNewsLikeMutation() {
  return useMutation({
    mutationFn: ({ newsId }: ToggleNewsLikeRequest) => toggleNewsLike(newsId),
    // 토글 성공 후 데이터 갱신
    onSuccess: (_data, variables) => {
      queryClient.setQueryData([queryKeys.news, variables.newsId], (prev: BaseResponse<NewsDetail> | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: {
            ...prev.data,
            userLike: !prev.data.userLike,
            likeCount: prev.data.userLike ? prev.data.likeCount - 1 : prev.data.likeCount + 1,
          },
        };
      });
    },
  });
}
