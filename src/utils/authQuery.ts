import { useQuery } from '@tanstack/react-query';

export const useAuthToken = () => {
  return useQuery({
    queryKey: ['auth-token'],
    queryFn: getAuthToken,
    staleTime: Infinity,
  });
};

export const getAuthToken = () => localStorage.getItem('token');

