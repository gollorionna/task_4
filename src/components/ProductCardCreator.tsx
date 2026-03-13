import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import type { ProductCardCreatorProps } from '@/utils/types';

export const ProductCardCreator = ({
  products,
  containerClassName = 'flex flex-wrap justify-center gap-6 p-4 pt-20',
  cardClassName = 'w-72',
}: ProductCardCreatorProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className={containerClassName}>
        {products.map((p) => (
          <Card
            className={cardClassName}
            key={p.id}
            onClick={() => navigate({ to: `/product/${p.id}` })}
          >
            <img src={p.thumbnail} alt={p.title} className="h-48 w-full object-contain p-4" />

            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>{p.price}$</CardDescription>
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
