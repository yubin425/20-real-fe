import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constatns/keys';
import { getUserInfo } from '@/api/user';

function useUserInfo() {
  return useQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: getUserInfo
  })
}

export { useUserInfo }
