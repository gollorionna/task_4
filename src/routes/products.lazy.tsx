import { createLazyFileRoute } from '@tanstack/react-router';
import { ProductCardList } from '../pages/ProductCardList';

export const Route = createLazyFileRoute('/products')({
  component: ProductCardList,
});
