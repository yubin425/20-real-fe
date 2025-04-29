'use client';

import { SidebarStore, useSidebarStore } from '@/stores/sidebarStore';
import Link from 'next/link';

export default function Sidebar() {
  const isOpen = useSidebarStore((state: SidebarStore) => state.isOpen);
  const close = useSidebarStore((state: SidebarStore) => state.close);

  const menuItems = [
    { label: '춘비서', href: '/chatbot' },
    { label: '공지사항', href: '/notices' },
    { label: '카테부 뉴스', href: '/news' },
  ];


  return (
    <>
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/30 z-40"
          onClick={close}
        />
      )}

        <aside
          className={`absolute top-0 left-0 w-52 h-full bg-gray-700 text-white z-50 transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
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
