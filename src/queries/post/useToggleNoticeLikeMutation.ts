import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/queries/base/queryClient';
import { queryKeys } from '@/constatns/keys';
import { BaseResponse } from '@/types/common/base';
import { toggleNoticeLike } from '@/api/post';
import { NoticeDetail } from '@/types/post/noticeDetail';

interface ToggleNoticeLikeRequest {
  noticeId: string;
}

export function useToggleNoticeLikeMutation() {
  return useMutation({
    mutationFn: ({noticeId}: ToggleNoticeLikeRequest) => (
      toggleNoticeLike(noticeId)
    ),
    // 토글 성공 후 데이터 갱신
    onSuccess: (_data, variables) => {
      queryClient.setQueryData([queryKeys.notice, variables.noticeId], (prev: BaseResponse<NoticeDetail> | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: {
            ...prev.data,
            userLike: !prev.data.userLike,
            likeCount: prev.data.userLike ? prev.data.likeCount - 1 : prev.data.likeCount + 1
          }
        }
      })
    }

  })
}
