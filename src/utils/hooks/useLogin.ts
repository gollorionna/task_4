import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { queryClient } from '@/utils/queryClient';
import type { FormValues } from '@/utils/types';

const loginUser = async (data: FormValues) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Login failed');
  }

  return result;
};

export const useLogin = (onSuccessReset?: () => void) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      queryClient.setQueryData(['auth-token'], data.accessToken);

      onSuccessReset?.();

      navigate({ to: '/' });
    },
  });

  return mutation;
};
