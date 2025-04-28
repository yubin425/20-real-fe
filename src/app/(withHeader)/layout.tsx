import { ReactNode } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function WithHeaderLayout({
                                           children,
                                         }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <Header/>
      <Sidebar/>
      {children}
    </div>
  );
}
