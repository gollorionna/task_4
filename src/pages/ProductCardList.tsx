import { useProducts } from '@/utils/hooks/useProducts';
import { ProductCardCreator } from '@/components/ProductCardCreator';

export const ProductCardList = () => {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) return <p>Loading...</p>;

  return <ProductCardCreator products={products} />;
};
