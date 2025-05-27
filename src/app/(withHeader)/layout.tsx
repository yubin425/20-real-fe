import { ReactNode } from 'react';

import { Header } from '@/components/common/organisms/Header';
import { Sidebar } from '@/components/common/organisms/Sidebar';

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden w-[100vw] max-w-app">
      <div className={`relative top-0 w-full z-10 bg-white max-w-app`}>
        <Header />
      </div>

      <Sidebar />

      <main className="flex-1 mt-header h-full">{children}</main>
    </div>
  );
}
