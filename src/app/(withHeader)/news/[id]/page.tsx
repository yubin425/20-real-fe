"use client"

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostHeader from '@/components/post/PostHeader';
import PostSummary from '@/components/post/PostSummary';
import MarkdownViewer from '@/components/common/MarkdownViewer';
import Button from '@/components/common/Button';
import { ArrowUp, Heart, MessageCircle } from 'lucide-react';
import Input from '@/components/common/Input';
import PostCommentItem from '@/components/post/PostCommentItem';
import SingleImage from '@/components/common/SingleImage';
import { useNewsDetailQuery } from '@/queries/news/useNewsDetailQuery';
import { useNewsCommentListInfinityQuery } from '@/queries/news/useNewsCommentListInfinityQuery';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import LoadingIndicator from '@/components/common/LoadingIndicator';

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>()
  const { data: news } = useNewsDetailQuery(params.id)
  const { data: comments, fetchNextPage, hasNextPage, isFetchingNextPage } = useNewsCommentListInfinityQuery(params.id)
  const loadingRef = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const [liked, setLiked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (news) setLiked(news.userLike)
  }, [news]);

  if (!news) return null;

  return (
    <div className="flex justify-center items-center w-full pt-header">
      <div className="w-full max-w-app bg-white">

        <PostHeader
          tag={news.tag}
          title={news.title}
          viewCount={news.viewCount}
          createdAt={news.createdAt}
        />

        <PostSummary summary={news.summary} />

        <div className="px-4 pb-3">
          <MarkdownViewer text={news.content} />

          <SingleImage imageUrl={news.imageUrl} />

        </div>

        {/* 좋아요 버튼 */}
        <div className="px-4 mb-4 flex justify-center">
          <Button
            variant="plain"
            onClick={() => setLiked(!liked)}
            className={`flex items-center justify-center px-6 py-2 rounded-full ${liked ? 'bg-pink-50 text-pink-500' : 'bg-gray-100 text-gray-500'} transition-all`}
          >
            <Heart size={16} className={`mr-2 ${liked ? 'fill-pink-500 text-pink-500' : ''}`} />
            <span className="font-medium">{liked ? news.likeCount + 1 : news.likeCount}</span>
          </Button>
        </div>

        {/* 댓글 */}
        <div className="px-4 py-3 border-t border-gray-100 flex flex-col justify-between items-start gap-3">
          <div className="flex items-center text-gray-500">
            <MessageCircle size={16} className="mr-1" />
            <span className="text-sm font-medium">댓글 {news.commentCount}</span>
          </div>

          <div className='flex w-full gap-3 justify-center items-center'>
            <Input className='flex-1 rounded-xl'/>

            <Button variant='outline' size='icon' className='shrink-0'>
              <ArrowUp size={18}/>
            </Button>
          </div>


        </div>

        {/* 댓글 부분 */}
        <div className="border-t border-gray-100">
          {comments && comments.map((comment) =>
            <PostCommentItem comment={comment} key={comment.id} />
          )}
        </div>

        <LoadingIndicator
          loadingRef={loadingRef}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  )

}
