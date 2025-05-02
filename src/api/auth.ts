import { User } from '@/types/User';

const postLogin = async (provider: string): Promise<User> => {
  window.location.href = process.env.NEXT_PUBLIC_API_URL + `/v1/oauth/${provider}`;
  return null;
};

export { postLogin };
