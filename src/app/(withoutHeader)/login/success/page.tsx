"use client"

import { useRouter } from 'next/navigation';
import { useUserPersistStore } from '@/stores/userPersistStore';
import { useEffect } from 'react';
import { useUserInfo } from '@/queries/useUserInfoQuery';
import { useToastStore } from '@/stores/toastStore';

export default function LoginSuccessPage() {
  const router = useRouter();
  const { setUser } = useUserPersistStore();
  const { showToast } = useToastStore();
  const { data, isError, isSuccess } = useUserInfo();

  useEffect(() => {
    if (isSuccess && data?.data) {
      setUser(data.data);
      router.replace('/chatbot');
    }

    if (isError) {
      showToast('로그인 정보를 불러오지 못했어요.', 'error')
      router.replace('/login');
    }
  }, [isSuccess, isError, data, router, setUser, showToast]);

  return null;
}
