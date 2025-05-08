import { useMutation } from '@tanstack/react-query';

import { postNewsComment } from '@/api/news';
import { queryKeys } from '@/constatns/keys';
import { queryClient } from '@/queries/base/queryClient';
import { BaseResponse } from '@/types/common/base';
import { NewsDetail } from '@/types/post/newsDetail';

interface CreateNewsCommentRequest {
  newsId: string;
  content: string;
}

export function useCreateNewsCommentMutation() {
  return useMutation({
    mutationFn: ({ newsId, content }: CreateNewsCommentRequest) => postNewsComment({ newsId, content }),

    // 성공 후 캐시 무효화 및 댓글 수 갱신
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.news, queryKeys.comments, variables.newsId],
      });

      queryClient.setQueryData([queryKeys.news, variables.newsId], (prev: BaseResponse<NewsDetail> | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: {
            ...prev.data,
            commentCount: prev.data.commentCount + 1,
          },
        };
      });
    },
  });
}
