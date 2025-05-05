import { useUserPersistStore } from '@/stores/userPersistStore';

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + url,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
      credentials: 'include',
      signal: AbortSignal.timeout(5000)
    });

  if (res.status === 401) {
    useUserPersistStore.getState().cleanUser();
  }

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status}`);
  }

  return res.json();
}
