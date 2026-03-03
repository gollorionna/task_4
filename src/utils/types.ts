import { z } from 'zod';

export const formSchema = z
  .object({
    username: z.string().min(2, 'min 2 characters'),
    password: z.string().min(6, 'min 6 characters'),
  })

export type FormValues = z.infer<typeof formSchema>;

export interface Message {
  id: string;
  text: string;
  created_at: string;
}
