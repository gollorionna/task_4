import { useQuery } from '@tanstack/react-query';
import { ProductSchema } from '@/utils/types';
import type { Product } from '@/utils/types';

const fetchProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  const data = await res.json();

  return ProductSchema.parse(data);
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};
