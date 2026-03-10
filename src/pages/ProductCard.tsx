import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { ProductSchema } from '@/utils/types';

import type { Product } from '@/utils/types';

const API_URL = import.meta.env.VITE_API_URL || 'https://dummyjson.com';

const fetchProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  const data = await res.json();
  return ProductSchema.parse(data);
};

export const ProductCard = () => {
  const { id } = useParams({ strict: false });

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(Number(id)),
  });

  if (isLoading) return <p className="flex items-center justify-center min-h-screen">Loading...</p>;
  if (error) return <p className="flex items-center justify-center min-h-screen text-red-500">Error loading product</p>;
  if (!product) return <p className="flex items-center justify-center min-h-screen">Product not found</p>;

  return (
    <div className='w-full max-w-6xl px-4'>
      <Card className= "w-full shadow-xl flex flex-col sm:flex-col overflow-hidden ">
          <div className="flex p-6 ">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="max-h-100 object-contain  rounded-lg"
            />

          <CardContent className="flex flex-col justify-center gap-6 md:w-1/2">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-4xl font-semibold text-primary">${product.price}</p>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
