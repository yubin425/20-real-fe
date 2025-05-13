import { errors } from '@/constatns/errors';
import { useToastStore } from '@/stores/toastStore';
import { useUserPersistStore } from '@/stores/userPersistStore';
import { BaseResponse } from '@/types/common/base';

export async function fetcher<T>(url: string, options?: RequestInit): Promise<BaseResponse<T> | undefined> {
  const timeout = url.includes('/v1/chatbots') ? 60000 : 5000;

  const fetchWithAuth = async (): Promise<Response> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
      credentials: 'include',
      signal: AbortSignal.timeout(timeout),
    });
  };

  let res = await fetchWithAuth();
  let responseBody: BaseResponse<T> | undefined;

  try {
    responseBody = await res.json();
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
  }

  if (!res.ok) {
    const { message } = responseBody || {};

    // 토큰 만료
    if (res.status === 401 && message === 'EXPIRED_TOKEN') {
      try {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (refreshRes.ok) {
          // 리프레시 성공 → 원래 요청 재시도
          res = await fetchWithAuth();
          try {
            return await res.json();
          } catch (error) {
            console.error('Failed to parse JSON after refresh:', error);
          }
        } else {
          // 리프레시 실패 → 로그아웃
          useUserPersistStore.getState().cleanUser();
          useToastStore.getState().showToast(errors.TOKEN_EXPIRED, 'error');
          return undefined;
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        useToastStore.getState().showToast(errors.DEFAULT, 'error');
        return undefined;
      }
    } else if (res.status === 401) {
      // 토큰이 없는 경우
      useUserPersistStore.getState().cleanUser();
      useToastStore.getState().showToast(errors.UNAUTHORIZED, 'error');
    } else if (res.status === 403) {
      // 승인 받지 못한 유저의 경우
      useUserPersistStore.getState().setIsApproved(false);
      useToastStore.getState().showToast(errors.FORBIDDEN, 'error');
    } else {
      console.error(`Error Status: ${res.status}`);
      useToastStore.getState().showToast(errors.DEFAULT, 'error');
    }

    return undefined;
  }

  return responseBody;
}
