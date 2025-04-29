'use client';

import { Menu, Bell } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebarStore';
import Button from '@/components/Button';
import { HEADER_HEIGHT } from '@/constatns/ui';

export default function Header() {
  const openSidebar = useSidebarStore((state) => state.open);

  return (
    <header className="flex flex-row justify-between items-center" style={{height: `${HEADER_HEIGHT}px`}}>
      <Button variant="ghost" size="lg_icon" onClick={openSidebar}>
        <Menu />
      </Button>

      <Button variant="ghost" size="lg_icon">
        <Bell />
      </Button>
    </header>
  );
}
