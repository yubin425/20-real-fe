import { useUserPersistStore } from '@/stores/userPersistStore';
import { useToastStore } from '@/stores/toastStore';
import { errors } from '@/constatns/errors';

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const timeout = url.includes('/v1/chatbots') ? 60000 : 5000;
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + url,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
      credentials: 'include',
      signal: AbortSignal.timeout(timeout)
    });

  if (res.status === 401) {
    useUserPersistStore.getState().cleanUser();
    useToastStore.getState().showToast(errors.UNAUTHORIZED, 'error')
  } else if (res.status === 403) {
    useUserPersistStore.getState().setIsApproved(false);
    useToastStore.getState().showToast(errors.FORBIDDEN, 'error')
  } else if (!res.ok) {
    let message = errors.DEFAULT

    try {
      const errorBody = await res.json();
      if (typeof errorBody?.message === 'string') {
        message = errorBody.message;
      }
    } catch (e) {
      console.log(e);
    }

    useToastStore.getState().showToast(message, 'error')
  }

  return res.json();
}
