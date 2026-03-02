import { createFileRoute } from '@tanstack/react-router'
import { Controller, FormProvider } from 'react-hook-form';
import type { FormValues } from '../utils/types';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { formSchema } from '../utils/types';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/auth')({
  component: Login,
})

function Login() {
  const API_URL = import.meta.env.REACT_APP_API_URL || "https://dummyjson.com";
	const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isValid, isSubmitting }
  } = methods;


const onSubmit = async (data: FormValues) => {
  try {
    const response = await fetch(`${API_URL}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: data.name,
        email: data.email,
        password: data.password
      })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const result = await response.json();

    console.log(result);
    alert("Registered successfully!");
    reset();

  } catch (err) {
    setError("email", {
      type: "server",
      message: "Registration failed. Please try again."
    });
  }
};
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Registration</h2>

        <input {...methods.register("name")} placeholder="Name" />
        <p>{errors.name?.message}</p>

        <input {...methods.register("email")} placeholder="Email" />
        <p>{errors.email?.message}</p>

        <input type="password" {...methods.register("password")} placeholder="Password" />
        <p>{errors.password?.message}</p>

        <input
          type="password"
          {...methods.register("confirmPassword")}
          placeholder="Confirm password"
        />
        <p>{errors.confirmPassword?.message}</p>

        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <input
              type="date"
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
          )}
        />
        <p>{errors.startDate?.message}</p>

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Sending..." : "Register"}
        </button>
      </form>
    </FormProvider>
  );
}
