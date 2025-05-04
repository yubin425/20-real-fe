import { fetcher } from '@/api/fetcher';
import { BaseResponse } from '@/types/common/base';
import { User } from '@/types/user/user';

const getUserInfo = async (): Promise<BaseResponse<User>> => {
  return await fetcher<BaseResponse<User>>('/v1/users/info', {method: 'GET'});
};

export { getUserInfo };
