'use client';

import { FormEvent, useState } from 'react';

import { PostCommentForm } from '@/components/post/molecules/PostCommentForm';
import { PostCommentList } from '@/components/post/organisms/PostCommentList';
import { EventName } from '@/lib/firebase/eventNames';
import { firebaseLogging } from '@/lib/firebase/logEvent';
import { useCreateNewsCommentMutation } from '@/queries/news/useCreateNewsCommentMutation';
import { useCreateNoticeCommentMutation } from '@/queries/post/useCreateNoticeCommentMutation';
import { PostTypes } from '@/types/post/postType';

interface PostCommentSectionProps {
  type: PostTypes;
  postId: number;
  commentCount: number;
}

export function PostCommentSection({ type, postId, commentCount: initialCommentCount }: PostCommentSectionProps) {
  const { mutate: postNoticeComment } = useCreateNoticeCommentMutation();
  const { mutate: postNewsComment } = useCreateNewsCommentMutation();

  const [comment, setComment] = useState('');
  const [commentCount, setCommentCount] = useState(initialCommentCount);

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    firebaseLogging(EventName.POST_COMMENT_SEND_CLICK, {
      description: `${type}-${postId}`,
    });

    const payload = { content: comment };
    const commonOptions = {
      onSuccess: () => {
        setCommentCount(commentCount + 1);
      },
    };

    if (type === PostTypes.Notice) {
      postNoticeComment({ noticeId: postId.toString(), ...payload }, commonOptions);
    } else if (type === PostTypes.News) {
      postNewsComment({ newsId: postId.toString(), ...payload }, commonOptions);
    }

    setComment('');
  };

  return (
    <div>
      <PostCommentForm
        comment={comment}
        setComment={setComment}
        commentCount={commentCount}
        onSubmitComment={handleSubmitComment}
      />
      <PostCommentList type={type} postId={postId} onDeleteCompleteAction={() => setCommentCount(commentCount - 1)} />
    </div>
  );
}
