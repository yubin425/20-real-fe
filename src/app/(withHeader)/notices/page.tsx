"use client"

import NoticeListItem from '@/components/post/NoticeListItem';
import Link from 'next/link';
import { useNoticeListInfinityQuery } from '@/queries/post/useNoticeListInfinityQuery';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import LoadingIndicator from '@/components/common/LoadingIndicator';

export default function NoticesPage() {
  const { data: notices, fetchNextPage, hasNextPage, isFetchingNextPage } = useNoticeListInfinityQuery();
  const loadingRef = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });


  return (
    <div className="bg-gray-50 min-h-app">
      <h2 className="pt-header px-6 pb-4 text-xl font-bold text-gray-800">Notice</h2>

      <div className="px-4 pb-20">
        {notices && notices.map((notice) => (
          <Link key={notice.id} href={`/notices/${notice.id}`}>
            <NoticeListItem notice={notice}/>
          </Link>
        ))}
      </div>

      <LoadingIndicator
        loadingRef={loadingRef}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
