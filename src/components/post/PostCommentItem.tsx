import { PostComment } from '@/types/post/postComment';
import { Trash } from 'lucide-react';
import Image from 'next/image';

interface PostCommentItemProps {
  comment: PostComment;
}

export default function PostCommentItem({ comment }: PostCommentItemProps) {
  return (
    <div className="px-4 py-3 flex items-start">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <Image src={comment.profileUrl} alt={comment.nickname} width={32} height={32}/>
      </div>
      <div className="ml-3 flex-1">
        <span className="font-medium text-sm pr-2 text-gray-900">{comment.nickname}</span>
        <span className="text-gray-400 text-xs">{comment.createdAt}</span>

        <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
      </div>
      <div className="flex items-center">
        <Trash size={14} className="text-gray-400" />
      </div>
    </div>
  )
}
