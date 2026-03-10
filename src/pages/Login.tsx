import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from '../utils/types';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { queryClient } from '../utils/queryClient';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

export const Login = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(false);
  const API_URL = import.meta.env.REACT_APP_API_URL || 'https://dummyjson.com';
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      setAuthError(false);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      localStorage.setItem('token', result.accessToken);
      queryClient.setQueryData(['auth-token'], result.accessToken);

      alert('Authorized successfully!');
      reset();
      navigate({ to: '/' });
    } catch (err) {
      setAuthError(true);
    }
  };
  return (
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-80 mx-auto mt-20 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#cea0ae] p-6 rounded-md"
        >
          <h2 className="bg-[#684551] text-white text-center p-2 rounded-md">Authorization</h2>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              {...methods.register('username')}
              id="username"
              type="text"
              placeholder="Write your username"
            />
            <FieldError>{errors.username?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              {...methods.register('password')}
              placeholder="........"
            />
            <FieldError>{errors.password?.message}</FieldError>
          </Field>

          {authError && (
            <p className="text-red-600 text-sm text-center">Invalid username or password</p>
          )}

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="bg-[#684551] text-white border-white px-4 py-2 rounded-md hover:bg-[#9cd08f] transition-colors duration-300"
          >
            {isSubmitting ? 'Sending...' : 'Sign in'}
          </button>
        </form>
      </FormProvider>
  );
};
