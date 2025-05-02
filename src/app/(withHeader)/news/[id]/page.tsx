"use client"

import { useParams } from 'next/navigation';
import { NewsDetail } from '@/types/post/newsDetail';
import { PostComment } from '@/types/post/postComment';
import { useState } from 'react';
import PostHeader from '@/components/post/PostHeader';
import PostSummary from '@/components/post/PostSummary';
import MarkdownViewer from '@/components/common/MarkdownViewer';
import ImageCarousel from '@/components/common/ImageCarousel';
import PostFileItem from '@/components/post/PostFileItem';
import Button from '@/components/common/Button';
import { ArrowUp, Heart, MessageCircle } from 'lucide-react';
import Input from '@/components/common/Input';
import PostCommentItem from '@/components/post/PostCommentItem';
import SingleImage from '@/components/common/SingleImage';

const dummyNews: NewsDetail = {
  id: 1,
  title: "죽을 맛에 커피 쏜다, 아아 vs 아이스티!",
  summary: "- void가 교육생에게 커피를 샀다. ",
  content : "오늘 void가 아이스 아메리카노와 아이스티를 카테부 교육생에게 샀다는...",
  tag : "뉴스",
  viewCount : 3000,
  likeCount: 12,
  commentCount : 3,
  userLike : true,
  imageUrl : 'https://placehold.co/600x400.png',
  createdAt: "2025.04.03 14:38"
}

const dummyComments: PostComment[] = [
  {
    id: 1,
    nickname: 'kevin.joung(정현우)/풀스택',
    content: '응원합니다.',
    createdAt: '2025.04.29 11:01:00',
    profileUrl: 'https://placehold.co/64x64.png',
  },
  {
    id: 2,
    nickname: 'arnold.kim(김세호)/풀스택',
    content: '굿굿',
    createdAt: '2025.04.29 11:00:00',
    profileUrl: 'https://placehold.co/64x64.png',
  },
  {
    id: 3,
    nickname: 'kevin.joung(정현우)/풀스택',
    content: '응원합니다!!',
    createdAt: '2025.04.28 11:01:00',
    profileUrl: 'https://placehold.co/64x64.png',
  },
];

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>()

  const [liked, setLiked] = useState(false);
  const news = dummyNews;
  const comments = dummyComments;

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
            <span className="font-medium">{liked ? 13 : 12}</span>
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
          {comments.map((comment) =>
            <PostCommentItem comment={comment} key={comment.id} />
          )}
        </div>

        <div className="flex justify-center pb-10">
          <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin"></div>
        </div>
      </div>
    </div>
  )

}
