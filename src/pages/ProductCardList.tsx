import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { Product } from '../utils/types';

const fetchProducts = async (): Promise<Product[]> => {
  const API_URL = import.meta.env.REACT_APP_API_URL || 'https://dummyjson.com';
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();
  return data.products;
};

export const ProductCardList = () => {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='bg-[#d5b0ac]'>
      <div className="flex flex-wrap justify-center gap-6 p-4 pt-20">
      {products.map((p) => (
        <div
          key={p.id}
          className="w-72 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg flex flex-col"
          onClick={() => navigate({ to: `/products/${p.id}` })}
        >
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-48 w-full object-contain p-4 cursor-pointer"
          />
          <div className="px-4 pb-4 flex flex-col grow">
            <h2 className="font-bold text-gray-900 text-lg line-clamp-2">{p.title}</h2>
            <p className="font-semibold text-gray-800 mt-1">{p.price}$</p>
            <p className="text-gray-500 text-sm mt-2 line-clamp-2 grow"> {p.description.length > 100 ? `${p.description.slice(0, 100)}...` : p.description}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
    
  );
};
