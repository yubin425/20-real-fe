"use client"

import IconButton from '@/components/IconButton';
import { Menu } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebarStore';

export default function Header() {
  const openSidebar = useSidebarStore((state) => state.open);

  return (
    <header>
      <IconButton icon={Menu} onClick={openSidebar} />
    </header>
  );
}
