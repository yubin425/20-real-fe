"use client"

import Button from '@/components/Button';
import Image from 'next/image';
import kakaoLogin from '@/assets/kakao-login.png'
import logo from '@/assets/logo.png'
import { LogIn } from 'lucide-react';
import { useLogin } from '@/queries/useAuth';

export default function LoginPage() {
  const { mutate: login, isPending, error, data} = useLogin();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* 로고 및 로그인 영역 */}
        <div className="p-8 flex flex-col items-center">
          {/* 로고 */}
          <div className="mb-8 w-64 h-48 flex items-center justify-center">
            {logo ? (
              <Image
                src={logo}
                alt="춘이네 비서실"
                width={300}
                height={200}
                className="object-cover"
              />
            ) : (
              <div className="text-2xl font-bold text-gray-400">로고</div>
            )}
          </div>

          {/* 카카오 로그인 버튼 */}
          <Button
            variant="plain"
            className="w-full py-3 rounded-xl hover:opacity-90 transition-opacity mt-2 mb-4"
            onClick={() => login('kakao')}
          >
            {kakaoLogin ? (
              <Image
                src={kakaoLogin}
                alt="카카오 로그인"
                width={300}
                height={45}
                className="rounded-xl"
              />
            ) : (
              <div className="bg-yellow-300 text-gray-800 w-full py-3 rounded-xl flex items-center justify-center gap-2">
                <LogIn size={18} />
                <span>카카오 계정으로 로그인</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
