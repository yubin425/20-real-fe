'use client';

import { Heart } from 'lucide-react';

import { useState } from 'react';

import Button from '@/components/common/Button';
import { useToggleNewsLikeMutation } from '@/queries/news/useToggleNewsLikeMutation';
import { useToggleNoticeLikeMutation } from '@/queries/post/useToggleNoticeLikeMutation';
import { PostTypes } from '@/types/post/postType';

interface PostLikeButtonProps {
  type: PostTypes;
  postId: number;
  userLike: boolean;
  likeCount: number;
}

export default function PostLikeButton({
  type,
  postId,
  userLike: initialUserLike,
  likeCount: initialLikeCount,
}: PostLikeButtonProps) {
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
        },
      );
    } else if (type === PostTypes.News) {
      toggleNewsLike(
        { newsId: postId.toString() },
        {
          onError: rollback,
        },
      );
    }
  };

  return (
    <div className="px-4 mb-4 flex justify-center">
      <Button
        variant="plain"
        onClick={handleToggle}
        className={`flex items-center justify-center px-6 py-2 rounded-full ${userLike ? 'bg-secondary-50 text-secondary-400' : 'bg-gray-100 text-gray-500'} transition-all`}
      >
        <Heart size={16} className={`mr-2 ${userLike ? 'fill-secondary-500 text-secondary-400' : ''}`} />
        <span className="font-medium">{likeCount}</span>
      </Button>
    </div>
  );
}
