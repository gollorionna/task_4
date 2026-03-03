import { useQuery } from '@tanstack/react-query';
import { queryClient } from './queryClient';

export const useAuthToken = () => {
  return useQuery({
    queryKey: ['auth-token'],
    queryFn: () => localStorage.getItem('token'),
    staleTime: Infinity,
    initialData: () => queryClient.getQueryData(['auth-token']),
  });
};