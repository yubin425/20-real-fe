"use client"

import { Clock, Flame } from 'lucide-react';
import { useState } from 'react';
import HotNewsItem from '@/features/Post/components/HotNewsItem';
import { News } from '@/features/Post/types/News';
import NewsListItem from '@/features/Post/components/NewsListItem';

const dummyHotNews: News[] = [
  {
    id: 1,
    title: '죽을 맛에 커피 쏜다, 아아 vs 아이스티!',
    imageUrl: 'https://placehold.co/600x400.png',
    commentCount: 2,
    createdAt: '2025.04.03 13:00:00',
  },
  {
    id: 2,
    title: '죽을 맛에 커피 쏜다, 아아 vs 아이스티! 보이드 감사제 개최',
    imageUrl: 'https://placehold.co/600x400.png',
    commentCount: 2,
    createdAt: '2025.04.03 13:00:00',
  }
]

const dummyRecentNews: News[] = [
  {
    id: 1,
    title: '점심 전쟁 종결! 타운홀 도시락 공식 허락 받음',
    commentCount: 2,
    createdAt: '2025.04.29 13:00:00',
  },
  {
    id: 2,
    title: '죽을 맛에 커피 쏜다, 아아 vs 아이스티!',
    commentCount: 0,
    createdAt: '2025.04.03 13:00:00',
  },
  {
    id: 3,
    title: '부트캠프 생존기: 스크럼, 코테, ... 숨 쉴 틈 無',
    commentCount: 2,
    createdAt: '2025.04.03 13:00:00',
  },
  {
    id: 4,
    title: '[속보] 누구나 AI를 말하지만, 진짜 중요한 건 꺾이지 않는 마음...',
    commentCount: 0,
    createdAt: '2025.04.03 13:00:00',
  },
  {
    id: 5,
    title: '죽을 맛에 커피 쏜다, 아아 vs 아이스티!',
    commentCount: 0,
    createdAt: '2025.04.03 13:00:00',
  },
  {
    id: 6,
    title: '점심 전쟁 종결! 타운홀 도시락 공식 허락 받음',
    commentCount: 0,
    createdAt: '2025.04.03 13:00:00',
  }
]

export default function NewsListPage() {
  const [hotNews, setHotNews] = useState(dummyHotNews);

  const [recentNews, setRecentNews] = useState(dummyRecentNews);

  return (
    <div className="bg-gray-50 min-h-app pb-16">

      <div className="px-5 pt-header pb-4">
        <div className="flex items-center mb-4">
          <Flame size={20} className="text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">HOT News</h2>
        </div>

        <div className="max-w-app pb-4 -mx-5 px-5 flex flex-row gap-4">
          {hotNews.map((news) => (
            <HotNewsItem key={news.id} news={news}/>
          ))}
        </div>
      </div>


      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock size={20} className="text-secondary-300 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Recently</h2>
          </div>
        </div>

        {recentNews.map((news) => (
          <NewsListItem key={news.id} news={news}/>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin"></div>
      </div>
    </div>
  );
};
