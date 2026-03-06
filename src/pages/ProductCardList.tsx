import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { Product } from '../utils/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const fetchProducts = async (): Promise<Product[]> => {
  const API_URL = import.meta.env.REACT_APP_API_URL || 'https://dummyjson.com';
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();
  return data.products;
};

export const ProductCardList = () => {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-[#d5b0ac]">
      <div className="flex flex-wrap justify-center gap-6 p-4 pt-20">
        {products.map((p) => (
          <Card
            key={p.id}
            onClick={() => navigate({ to: `/products/${p.id}` })}
          >
            <img src={p.thumbnail} alt={p.title} className="h-48 w-full object-contain p-4" />

            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>
                {p.price}$
              </CardDescription>
            </CardHeader>

            <CardContent>
              {p.description.length > 100 ? `${p.description.slice(0, 100)}...` : p.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
