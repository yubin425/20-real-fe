import { ReactNode } from 'react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';

export default function WithHeaderLayout({
                                           children,
                                         }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <div className={`fixed top-0 left-0 right-0 z-10 bg-white max-w-app mx-auto`}>
        <Header />
      </div>

      <Sidebar />

      <main className="flex-1 pt-3">
        {children}
      </main>
    </div>
  );
}
