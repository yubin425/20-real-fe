"use client"

import { Menu } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebarStore';
import Button from '@/components/Button';

export default function Header() {
  const openSidebar = useSidebarStore((state) => state.open);

  return (
    <header>
      <Button variant='ghost' onClick={openSidebar}>
        <Menu/>
      </Button>
    </header>
  );
}
