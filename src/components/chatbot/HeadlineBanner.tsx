import { Bell, Newspaper } from 'lucide-react';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { Headline } from '@/types/common/headline';

interface HeadlineBannerProps {
  items: Headline[];
}

export default function HeadlineBanner({ items }: HeadlineBannerProps) {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // 3초마다 공지/뉴스 변경
  useEffect(() => {
    if (items.length <= 1) return;

    const timer = setInterval(() => {
      setVisible(false);

      // 사라지는 애니메이션 후 내용 변경
      setTimeout(() => {
        setCurrentNoticeIndex((prev) => (prev + 1) % items.length);
        setVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(timer);
  }, [items.length]);

  const currentNotice = items[currentNoticeIndex];

  const href = currentNotice?.type === 'notice' ? `/notices/${currentNotice?.id}` : `/news/${currentNotice?.id}`;

  return (
    <div className="bg-white mx-4 mt-4 rounded-xl shadow-sm overflow-hidden">
      <div className="h-12 relative overflow-hidden">
        <Link
          href={href}
          className={`absolute inset-0 flex items-center px-4 w-full transition-all duration-300 ${
            visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-full'
          }`}
        >
          <div className="w-6 h-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center">
            {currentNotice?.type === 'notice' ? (
              <Bell size={16} className="text-primary-500" />
            ) : (
              <Newspaper size={16} className="text-accent-400" />
            )}
          </div>
          <p className="text-sm font-medium flex-1 truncate mr-1">{currentNotice?.title}</p>
          <span className="text-xs text-gray-500">
            {currentNoticeIndex + 1}/{items.length}
          </span>
        </Link>
      </div>
    </div>
  );
}
