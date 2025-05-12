import { useMutation } from '@tanstack/react-query';

import { deleteNoticeComment } from '@/api/post';
import { queryKeys } from '@/constatns/keys';
import { queryClient } from '@/queries/base/queryClient';
import { BaseResponse } from '@/types/common/base';
import { NoticeDetail } from '@/types/post/noticeDetail';

interface DeleteNoticeCommentRequest {
  noticeId: string;
  commentId: string;
}

export function useDeleteNoticeCommentMutation() {
  return useMutation({
    mutationFn: ({ noticeId, commentId }: DeleteNoticeCommentRequest) => deleteNoticeComment({ noticeId, commentId }),

    // 성공 후 캐시 무효화 및 댓글 수 갱신
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.notice, queryKeys.comments, variables.noticeId],
      });

      queryClient.setQueryData(
        [queryKeys.notice, variables.noticeId],
        (prev: BaseResponse<NoticeDetail> | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              commentCount: prev.data.commentCount - 1,
            },
          };
        },
      );
    },
  });
}
