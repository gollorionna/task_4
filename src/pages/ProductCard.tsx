import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useProduct } from '@/utils/hooks/useProductCard';

export const ProductCard = () => {
  const { id } = useParams({ strict: false });

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(Number(id));

  if (isLoading) return <p className="flex items-center justify-center min-h-screen">Loading...</p>;
  if (error) return <p className="flex items-center justify-center min-h-screen text-red-500">Error loading product</p>;
  if (!product) return <p className="flex items-center justify-center min-h-screen">Product not found</p>;

  return (
    <div className='w-full max-w-6xl px-4'>
      <Card className= "w-full shadow-xl overflow-hidden sm:mt-0 mt-20">
          <div className="flex flex-col md:flex-row p-6 gap-6">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="max-h-100 object-contain rounded-lg md:w-1/2 w-70"
            />

          <CardContent className="flex flex-col justify-center gap-6 md:w-1/2">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{product.title}</CardTitle>
            <CardDescription className="text-4xl font-semibold text-primary">{product.price}$</CardDescription>
            <CardDescription className="text-muted-foreground leading-relaxed">{product.description}</CardDescription>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
