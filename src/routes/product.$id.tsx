import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const ProductCardDetails = lazy(() =>
  import('../pages/ProductCard').then(p => ({
    default: p.ProductCard,
  }))
);

export const Route = createFileRoute('/product/$id')({
  component: ProductCardDetails,
});