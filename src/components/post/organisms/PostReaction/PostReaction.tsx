'use client';

import { useState } from 'react';

import { LikeButton } from '@/components/post/molecules/LikeButton';
import { EventName } from '@/lib/firebase/eventNames';
import { firebaseLogging } from '@/lib/firebase/logEvent';
import { useToggleNewsLikeMutation } from '@/queries/news/useToggleNewsLikeMutation';
import { useToggleNoticeLikeMutation } from '@/queries/post/useToggleNoticeLikeMutation';
import { PostTypes } from '@/types/post/postType';

interface PostReactionProps {
  type: PostTypes;
  postId: number;
  userLike: boolean;
  likeCount: number;
}

export function PostReaction({
  type,
  postId,
  userLike: initialUserLike,
  likeCount: initialLikeCount,
}: PostReactionProps) {
  const [userLike, setUserLike] = useState(initialUserLike);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const { mutate: toggleNoticeLike } = useToggleNoticeLikeMutation();
  const { mutate: toggleNewsLike } = useToggleNewsLikeMutation();

  const handleToggle = () => {
    const optimisticUserLike = !userLike;
    const optimisticLikeCount = likeCount + (userLike ? -1 : 1);

    // 낙관적 UI 적용
    setUserLike(optimisticUserLike);
    setLikeCount(optimisticLikeCount);

    const rollback = () => {
      // 실패 시 롤백
      setUserLike(userLike);
      setLikeCount(likeCount);
    };

    if (type === PostTypes.Notice) {
      toggleNoticeLike(
        { noticeId: postId.toString() },
        {
          onError: rollback,
          onSuccess: (res) => {
            if (res?.data) handleFirebaseLogging(res.data.userLike);
          },
        },
      );
    } else {
      toggleNewsLike(
        { newsId: postId.toString() },
        {
          onError: rollback,
          onSuccess: (res) => {
            if (res?.data) handleFirebaseLogging(res.data.userLike);
          },
        },
      );
    }
  };

  const handleFirebaseLogging = (userLike: boolean) => {
    firebaseLogging(EventName.POST_HEART_CLICK, {
      description: `${type}-${postId}-${userLike}`,
    });
  };

  return <LikeButton onClickAction={handleToggle} userLike={userLike} likeCount={likeCount} />;
}
