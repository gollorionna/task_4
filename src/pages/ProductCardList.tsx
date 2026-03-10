import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetProducts } from '@/utils/useGetProducts';


export const ProductCardList = () => {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useGetProducts();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap justify-center gap-6 p-4 pt-20">
        {products.map((p) => (
          <Card className='w-72'
            key={p.id}
            onClick={() => navigate({ to: `/product/${p.id}` })}
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
