import { z } from 'zod';

export const formSchema = z
  .object({
    username: z.string().min(2, 'min 2 characters'),
    password: z.string().min(6, 'min 6 characters'),
  });

  export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.string()).optional(),
  price: z.number(),
  category: z.string(),
  thumbnail: z.string(),
  discountPercentage: z.number(),
  tags: z.array(z.string()),
  rating: z.number(),
});

export const ProductsResponseSchema = z.object({
  limit: z.number(),
  products: z.array(ProductSchema),
  skip: z.number(),
  total: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;

export type FormValues = z.infer<typeof formSchema>;

export interface Message {
  id: string;
  text: string;
  created_at: string;
}

export type TokenPayload = {
    username: string;
    exp: number;
  };

export interface ProductCardCreatorProps {
  products: Product[];
  containerClassName?: string;
  cardClassName?: string;
}


