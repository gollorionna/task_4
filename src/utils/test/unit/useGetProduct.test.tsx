import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useGetProducts } from '../../useGetProducts';

const mockProducts = [
  { id: 1, title: 'Phone' },
  { id: 2, title: 'Laptop' },
];

describe('useGetProducts', () => {

  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({
        products: mockProducts,
      }),
    } as Response);
  });

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  it('should fetch products successfully', async () => {
    const { result } = renderHook(() => useGetProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProducts);

    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products'
    );
  });
});