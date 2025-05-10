import { useMutation } from '@tanstack/react-query';

import { toggleNoticeLike } from '@/api/post';

interface ToggleNoticeLikeRequest {
  noticeId: string;
}

export function useToggleNoticeLikeMutation() {
  return useMutation({
    mutationFn: ({ noticeId }: ToggleNoticeLikeRequest) => toggleNoticeLike(noticeId),
  });
}
