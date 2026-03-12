import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCardList } from '@/pages/ProductCardList';

vi.mock('@/utils/useGetProducts', () => ({
  useGetProducts: vi.fn(),
}));

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}));

import { useGetProducts } from '@/utils/useGetProducts';

describe('ProductCardList snapshots', () => {
  it('matches loading snapshot', () => {
    (useGetProducts as any).mockReturnValue({
      data: [],
      isLoading: true,
    });

    const { container } = render(<ProductCardList />);

    expect(container).toMatchSnapshot();
  });

  it('matches products snapshot', () => {
    (useGetProducts as any).mockReturnValue({
      isLoading: false,
      data: [
        {
          id: 1,
          title: 'Essence Mascara Lash Princess',
          price: '9.99',
          description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
          thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        },
        {
          id: 2,
          title: 'Eyeshadow Palette with Mirror',
          price: '899',
          description: 'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, its convenient for on-the-go makeup application.',
          thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
        },
      ],
    });

    const { container } = render(<ProductCardList />);

    expect(container).toMatchSnapshot();
  });
});
