import { fetcher } from '@/api/fetcher';
import { BaseResponse } from '@/types/base';
import { User } from '@/types/User';

const getUserInfo = async (): Promise<BaseResponse<User>> => {
  return await fetcher<BaseResponse<User>>('/v1/user/info');
};

export { getUserInfo };
