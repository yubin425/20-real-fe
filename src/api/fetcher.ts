import { errors } from '@/constatns/errors';
import { useToastStore } from '@/stores/toastStore';
import { useUserPersistStore } from '@/stores/userPersistStore';

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const timeout = url.includes('/v1/chatbots') ? 60000 : 5000;
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    credentials: 'include',
    signal: AbortSignal.timeout(timeout),
  });

  let responseBody: T | undefined;

  try {
    responseBody = await res.json();
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
  }

  if (!res.ok) {
    if (res.status === 401) {
      useUserPersistStore.getState().cleanUser();
      useToastStore.getState().showToast(errors.UNAUTHORIZED, 'error');
    } else if (res.status === 403) {
      useUserPersistStore.getState().setIsApproved(false);
      useToastStore.getState().showToast(errors.FORBIDDEN, 'error');
    } else {
      console.error(res.status);
      useToastStore.getState().showToast(errors.DEFAULT, 'error');
    }
  }

  return responseBody as T;
}
