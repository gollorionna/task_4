import { useQuery } from '@tanstack/react-query';

import type { Product } from '../types';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
  const data = await response.json();
  return data.products;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, 
  });
};
