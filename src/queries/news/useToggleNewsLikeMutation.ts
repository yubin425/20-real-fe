import { useMutation } from '@tanstack/react-query';
import { toggleNewsLike } from '@/api/news';
import { queryClient } from '@/queries/base/queryClient';
import { queryKeys } from '@/constatns/keys';
import { BaseResponse } from '@/types/common/base';
import { PostLike } from '@/types/post/postLike';
import { NewsDetail } from '@/types/post/newsDetail';

interface ToggleNewsCommentRequest {
  newsId: string;
}

export function useToggleNewsLikeMutation() {
  return useMutation({
    mutationFn: ({newsId}: ToggleNewsCommentRequest) => (
      toggleNewsLike(newsId)
    ),
    // 토글 성공 후 데이터 갱신
    onSuccess: (_data, variables) => {
      queryClient.setQueryData([queryKeys.news, variables.newsId], (prev: BaseResponse<NewsDetail> | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: {
            ...prev.data,
            userLike: !prev.data.userLike,
          }
        }
      })
    }

  })
}
