import { User } from '@/types/User';
import { fetcher } from '@/api/fetcher';
import { BaseResponse } from '@/types/base';

const postLogin = async (provider: string): Promise<User> => {
  const res = await fetcher<BaseResponse<User>>(`/auth/${provider}`, { method: 'POST' });
  return res.data;
};

export { postLogin };
