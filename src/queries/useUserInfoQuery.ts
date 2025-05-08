import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/api/user';
import { queryKeys } from '@/constatns/keys';

function useUserInfo() {
  return useQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: getUserInfo,
  });
}

export { useUserInfo };
