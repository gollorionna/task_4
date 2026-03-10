import { useGetProducts } from '@/utils/useGetProducts';
import { ProductCardCreator } from '@/components/ProductCardCreator';


export const ProductCardList = () => {

  const { data: products = [], isLoading } = useGetProducts();

  if (isLoading) return <p>Loading...</p>;

  return <ProductCardCreator products = {products} />;
};
