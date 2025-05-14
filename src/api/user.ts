import { fetcher } from '@/api/fetcher';
import { BaseResponse } from '@/types/common/base';
import { User } from '@/types/user/user';

const getUserInfo = async (): Promise<BaseResponse<User> | undefined> => {
  return await fetcher('/v1/users/info', { method: 'GET' });
};

export { getUserInfo };
