import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(2, 'min 2 characters'),
    email: z.string().email('invalid email'),
    password: z.string().min(6, 'min 6 characters'),
    confirmPassword: z.string(),
    startDate: z.date().refine((date) => !!date, {
      message: 'choose a date',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
	});

export type FormValues = z.infer<typeof formSchema>;

export interface Message {
  id: string;
  text: string;
  created_at: string;
}
