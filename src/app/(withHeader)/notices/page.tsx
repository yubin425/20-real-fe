"use client"

import { useState } from 'react';
import NoticeListItem from '@/features/Post/components/NoticeListItem';
import { Notice } from '@/features/Post/types/Notice';
import Link from 'next/link';

const dummyNotices: Notice[] = [
  {
    id: 1,
    title: '5시 30분 워크스페이스 구두 안내',
    createdAt: '2025.04.29 15:20:00',
    platform: '디스코드',
    author: 'helper.ryan(헬퍼라이언)',
    userRead: false,
  },
  {
    id: 2,
    title: '이력서, 포트폴리오 작성 방법',
    createdAt: '2025.04.28 23:20:00',
    platform: '노션',
    author: 'void.yeon(연시완)/강사',
    userRead: true,
  },
  {
    id: 3,
    title: '프로젝트 아이데이션 스레드에 댓글로 남겨주세요',
    createdAt: '2025.04.03 15:20:00',
    platform: '디스코드',
    author: 'kevin.seo(서상기)/강사',
    userRead: false,
  },
  {
    id: 4,
    title: '간이 회의실 추가 안내',
    createdAt: '2025.04.03 15:20:00',
    platform: '디스코드',
    author: 'helper.ryan(헬퍼라이언)',
    userRead: true,
  },
  {
    id: 5,
    title: '간이 회의실 추가 안내',
    createdAt: '2025.04.03 15:20:00',
    platform: '디스코드',
    author: 'helper.ryan(헬퍼라이언)',
    userRead: false,
  }
]

export default function NoticesPage() {
  const [notices, setNotices] = useState(dummyNotices)


  return (
    <div className="bg-gray-50 min-h-app">
      <h2 className="pt-header px-6 pb-4 text-xl font-bold text-gray-800">Notice</h2>

      <div className="px-4 pb-20">
        {notices.map((notice) => (
          <Link key={notice.id} href={`/notices/${notice.id}`}>
            <NoticeListItem notice={notice}/>
          </Link>
        ))}
      </div>

      <div className="flex justify-center pb-10">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin"></div>
      </div>
    </div>
  );
}
