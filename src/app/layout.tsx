import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ReactNode } from 'react';
import { APP_WIDTH } from '@/constatns/ui';
import ToastContainer from '@/components/common/ToastContainer';
import Providers from '@/app/providers';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '춘이네 비서실',
  description: '카카오테크 부트캠프에서 일어나는 일을 빠르게 확인',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.className}`}>
    <body className="flex justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen bg-fixed">
    <Providers>
      <div
        className="relative bg-white/80  shadow-md min-h-screen"
        style={{ width: `${APP_WIDTH}px` }}
      >
        <ToastContainer />
        {children}
      </div>
    </Providers>
    </body>
    </html>
  );
}
