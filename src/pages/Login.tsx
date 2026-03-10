import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { queryClient } from '../utils/queryClient';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

export const Login = () => {
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = methods;

  const API_URL = import.meta.env.REACT_APP_API_URL || 'https://dummyjson.com';

  const loginUser = async (data: FormValues) => {
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
    return result;
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      queryClient.setQueryData(['auth-token'], data.accessToken);
      reset();
      navigate({ to: '/' });
    }
  })

  const onSubmit = async (data: FormValues) => {
      mutation.mutate(data);
  };

  return (
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-80 mx-auto mt-20 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-(--pink-bg) p-6 rounded-md"
        >
          <h2 className="bg-(--brown-bg) text-white text-center p-2 rounded-md">Authorization</h2>
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
            {...methods.register('password')}
              id="password"
              type="password"
              placeholder="........"
            />
            <FieldError>{errors.password?.message}</FieldError>
          </Field>

          {mutation.status === 'error' && (
            <p className="text-red-600 text-sm text-center">Invalid username or password</p>
          )}

          <button
            type="submit"
            disabled={!isValid || mutation.status === 'pending'}
            className="bg-(--brown-bg) text-white border-white px-4 py-2 rounded-md hover:bg-(--green-bg) transition-colors duration-300"
          >
            {mutation.status === 'pending' ? 'Sending...' : 'Sign in'}
          </button>
        </form>
      </FormProvider>
  );
};
