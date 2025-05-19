'use client';

import { ArrowUp, MessageCircle } from 'lucide-react';

import { FormEvent, useEffect, useState } from 'react';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/molecules/Input';
import { EventName } from '@/lib/firebase/eventNames';
import { firebaseLogging } from '@/lib/firebase/logEvent';
import { useCreateNewsCommentMutation } from '@/queries/news/useCreateNewsCommentMutation';
import { useCreateNoticeCommentMutation } from '@/queries/post/useCreateNoticeCommentMutation';
import { usePostCommentCountStore } from '@/stores/postCommentCountStore';
import { PostTypes } from '@/types/post/postType';

interface PostCommentFormProps {
  type: PostTypes;
  postId: number;
  commentCount: number;
}

export default function PostCommentForm({ type, postId, commentCount }: PostCommentFormProps) {
  const { mutate: postNoticeComment } = useCreateNoticeCommentMutation();
  const { mutate: postNewsComment } = useCreateNewsCommentMutation();

  const [comment, setComment] = useState('');
  const { count, set, increment } = usePostCommentCountStore();

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    firebaseLogging(EventName.POST_COMMENT_SEND_CLICK, {
      description: `${type}-${postId}`,
    });
    const payload = { content: comment };
    const commonOptions = {
      onSuccess: () => {
        increment();
      },
    };

    if (type === PostTypes.Notice) {
      postNoticeComment({ noticeId: postId.toString(), ...payload }, commonOptions);
    } else if (type === PostTypes.News) {
      postNewsComment({ newsId: postId.toString(), ...payload }, commonOptions);
    }

    setComment('');
  };

  useEffect(() => {
    set(commentCount);
  }, [commentCount]);

  return (
    <div className="px-4 py-3 border-t border-gray-100 flex flex-col justify-between items-start gap-3">
      <div className="flex items-center text-gray-500">
        <MessageCircle size={16} className="mr-1" />
        <span className="text-sm font-medium">댓글 {count}</span>
      </div>

      <form onSubmit={handleSubmitComment} className="flex w-full gap-3 justify-center items-center">
        <Input className="flex-1 rounded-xl" value={comment} onChange={(e) => setComment(e.target.value)} />

        <Button variant="outline" size="icon" className="shrink-0" type="submit">
          <ArrowUp size={18} />
        </Button>
      </form>
    </div>
  );
}
