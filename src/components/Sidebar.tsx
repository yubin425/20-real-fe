'use client';

import { SidebarStore, useSidebarStore } from '@/stores/sidebarStore';
import Link from 'next/link';
import { useEffect } from 'react';
import { APP_WIDTH } from '@/constatns/ui';

export default function Sidebar() {
  const isOpen = useSidebarStore((state: SidebarStore) => state.isOpen);
  const close = useSidebarStore((state: SidebarStore) => state.close);

  const menuItems = [
    { label: '춘비서', href: '/chatbot' },
    { label: '공지사항', href: '/notices' },
    { label: '카테부 뉴스', href: '/news' },
  ];

  // open 상태라면 overflow hidden하여 스크롤 차단
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);


  return (
    <>
      {isOpen && (
        <div
          className={`fixed top-0 max-w-app w-full h-full bg-black/30 text-white z-40 transition-transform duration-200 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={close}
        />
      )}

      <aside
        className={`absolute top-0 w-[200px] h-full bg-gray-700 text-white z-50
    transition-all duration-200
    ${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
        style={{left: `calc(${APP_WIDTH}px - 200px)`}}
      >
        <nav className="p-4 flex flex-col ">
          {menuItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className="text-white hover:bg-gray-500 text-left py-2 px-4 rounded-md"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
