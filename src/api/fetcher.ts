import { errors } from '@/constatns/errors';
import { useToastStore } from '@/stores/toastStore';
import { useUserPersistStore } from '@/stores/userPersistStore';
import { BaseResponse } from '@/types/common/base';

function fetchWithAuth(url: string, timeout: number, options?: RequestInit) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    credentials: 'include',
    signal: AbortSignal.timeout(timeout),
  });
}

async function parseJSON<T>(res: Response): Promise<BaseResponse<T> | undefined> {
  try {
    return await res.json();
  } catch (err) {
    console.error('Failed to parse JSON:', err);
    return undefined;
  }
}

async function handleTokenRefresh<T>(fetchFn: () => Promise<Response>): Promise<BaseResponse<T> | undefined> {
  const toast = useToastStore.getState();
  const userStore = useUserPersistStore.getState();

  try {
    // refresh 요청
    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    // 리프레시 실패 시 토큰 만료로 로그아웃 처리
    if (!refreshRes.ok) {
      userStore.cleanUser();
      toast.showToast(errors.TOKEN_EXPIRED, 'error');
      return undefined;
    }

    // 리프레시 성공 시 원 요청 재호출
    const retriedRes = await fetchFn();
    return await parseJSON<T>(retriedRes);
  } catch (err) {
    console.error('Token refresh failed:', err);
    toast.showToast(errors.DEFAULT, 'error');
    return undefined;
  }
}

async function handleError<T>(
  res: Response,
  responseBody: BaseResponse<T> | undefined,
  retryFetch: () => Promise<Response>,
): Promise<BaseResponse<T> | undefined> {
  const { message } = responseBody || {};
  const toast = useToastStore.getState();
  const userStore = useUserPersistStore.getState();

  if (res.status === 401) {
    // 토큰 만료된 경우
    if (message === 'EXPIRED_TOKEN') {
      return await handleTokenRefresh<T>(retryFetch);
    }
    // 토큰이 아예 없는 경우
    userStore.cleanUser();
    toast.showToast(errors.UNAUTHORIZED, 'error');
  } else if (res.status === 403) {
    // 인증받지 못한 유저의 경우
    userStore.setIsApproved(false);
    toast.showToast(errors.FORBIDDEN, 'error');
  } else {
    // 기타 에러
    console.error(`Error Status: ${res.status}`);
    toast.showToast(errors.DEFAULT, 'error');
  }

  return responseBody;
}

export async function fetcher<T>(url: string, options?: RequestInit): Promise<BaseResponse<T> | undefined> {
  // AI 응답만 타임아웃 1분, 나머지는 10초
  const timeout = url.includes('/v1/chatbots') ? 60000 : 10000;
  const fetchFn = () => fetchWithAuth(url, timeout, options);

  const res = await fetchFn();
  const responseBody = await parseJSON<T>(res);

  if (res.ok) return responseBody;

  return handleError(res, responseBody, fetchFn);
}
