import { useMutation } from '@tanstack/react-query';
import { postNewsComment } from '@/api/news';
import { queryClient } from '@/queries/base/queryClient';
import { queryKeys } from '@/constatns/keys';

interface NewsCommentRequest {
  newsId: string;
  content: string;
}

export function useNewsCommentMutation() {
  return useMutation({
    mutationFn: ({ newsId, content }: NewsCommentRequest) =>
      postNewsComment({ newsId, content }),

    // 성공 후 캐시 무효화
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.news, queryKeys.comments, variables.newsId],
      });
    },
  });
}
