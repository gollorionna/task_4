import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '@/pages/ProductCard';

vi.mock('@tanstack/react-router', () => ({
  useParams: () => ({ id: '1' }),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

import { useQuery } from '@tanstack/react-query';

describe('ProductCard snapshots', () => {
  it('loading snapshot', () => {
    (useQuery as any).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    const { container } = render(<ProductCard />);
    expect(container).toMatchSnapshot();
  });

  it('product snapshot', () => {
    (useQuery as any).mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        id: 1,
        title: 'Essence Mascara Lash Princess',
        price: '9.99',
        description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
        images: ['https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp'],
      },
    });

    const { container } = render(<ProductCard />);
    expect(container).toMatchSnapshot();
  });
});
