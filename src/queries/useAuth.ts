import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/api/auth';

function useLogin() {
  return useMutation({
    mutationFn: (provider: string) => postLogin(provider),
  })
}

export { useLogin };
