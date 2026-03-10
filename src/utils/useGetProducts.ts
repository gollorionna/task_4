import { useQuery } from '@tanstack/react-query';

import type { Product } from './types';

const fetchProducts = async (): Promise<Product[]> => {
  const API_URL = import.meta.env.VITE_API_URL || 'https://dummyjson.com';
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data.products;
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, 
  });
};
