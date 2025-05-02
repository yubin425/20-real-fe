'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, ArrowUp, Heart, MessageCircle } from 'lucide-react';
import { NoticeDetail } from '@/types/post/noticeDetail';
import PostHeader from '@/components/post/PostHeader';
import PostSummary from '@/components/post/PostSummary';
import MarkdownViewer from '@/components/common/MarkdownViewer';
import ImageCarousel from '@/components/common/ImageCarousel';
import Button from '@/components/common/Button';
import { PostComment } from '@/types/post/postComment';
import PostCommentItem from '@/components/post/PostCommentItem';
import PostFileItem from '@/components/post/PostFileItem';
import Input from '@/components/common/Input';

const dummyNotice: NoticeDetail = {
  author: 'helper.ryan(헬퍼라이언)',
  commentCount: 3,
  content: `
  ## 📄 4월 네트워킹 만족도 조사📄  @everyone
  카테부 여러분 좋은 아침입니다!\n
  4월 25일(금) 2차 네트워킹은 어떠셨나요~? 아래 구글폼을 통해 여러분의 후기를 듣고자 합니다.\n
  이번 설문은 앞으로 더 나은 네트워킹 행사를 만들어가기 위한 소중한 자료로 활용될 예정입니다.\n
  여러분의 의견 하나하나가 모여 더욱 즐겁고 유익한 네트워킹 행사를 만들어갈 수 있도록 하겠습니다! 😊\n
  - **설문조사 마감 기한  : 5월 2일 오후 5시**
  - [설문조사 링크](https://docs.google.com/forms/d/e/1FAIpQLScXiA8yyTP2VcN5J6OaEJt-4Aq_eFzeUEQTYjyH48vhOIfRGg/viewform?usp=dialog)\n
  오늘도 힘찬 하루 되세요!! ❤️‍🔥\n
  `,
  createdAt: '2025.04.29 11:01:00',
  files: [
    {
      id : 1,
      fileName : "네트워킹_안내.pdf",
      fileUrl : "https://real-bucket.s3.ap-northeast-2.amazonaws.com/...",
      fileType : "pdf",
      fileSeqNo : 1,
    },
    {
      id : 2,
      fileName : "자리배치도.pdf",
      fileUrl : "https://real-bucket.s3.ap-northeast-2.amazonaws.com/...",
      fileType : "pdf",
      fileSeqNo : 2,
    }
  ],
  images: [
    {
      id: 1,
      fileName: '임시 이미지',
      fileUrl: 'https://placehold.co/600x400.png',
      fileType: '',
      fileSeqNo: 1,
    },
    {
      id: 2,
      fileName: '임시 이미지2',
      fileUrl: 'https://placehold.co/600x400.png',
      fileType: '',
      fileSeqNo: 2,
    },
  ],
  likeCount: 3,
  originalUrl: 'https://discord.com/channels/1240560508659175437/1328544692899545118/1366595229494280193',
  platform: '디스코드',
  summary: '* 2차 네트워크의 만족 조사를 받고자 함 \n* 5/2 오후 5시 전까지 제출 바람',
  tag: '풀스택 공지',
  title: '4월 네트워킹 만족도 조사',
  userLike: false,
  id: 1,
};

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

export default function NoticeDetailPage() {
  const params = useParams<{ id: string }>();

  const [liked, setLiked] = useState(false);
  const notice = dummyNotice;
  const comments = dummyComments;

  return (
    <div className="flex justify-center items-center w-full pt-header">
      <div className="w-full max-w-app bg-white">

        <PostHeader
          tag={notice.tag}
          title={notice.title}
          author={notice.author}
          createdAt={notice.createdAt}
          platform={notice.platform}
        />

        <PostSummary summary={notice.summary} />

        <div className="px-4 pb-3">
          <MarkdownViewer text={notice.content} />

          {notice.images && (
            <ImageCarousel images={notice.images} />
          )}

          {notice.files && (
            notice.files.map((file) => (
              <div key={file.id}>
                <PostFileItem file={file} />
              </div>
            ))
          )}

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
            <span className="text-sm font-medium">댓글 {notice.commentCount}</span>
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
  );

}
