import {
  useForm,
  FormProvider,
  Controller
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormValues } from "../utils/types";

export const LoginPage = () => {
	const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

const fakeApi = (
  data: FormValues
): Promise<FormValues> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "test@test.com") {
        reject({
          field: "email" as keyof FormValues,
          message: "Email уже зарегистрирован"
        });
      } else {
        resolve(data);
      }
    }, 1000);
  });

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isValid, isSubmitting }
  } = methods;

  type ServerError = {
  field: keyof FormValues;
  message: string;
};

function isServerError(error: unknown): error is ServerError {
  return (
    typeof error === "object" &&
    error !== null &&
    "field" in error &&
    "message" in error
  );
}

const onSubmit = async (data: FormValues) => {
  try {
    await fakeApi(data);
    alert("Sent successfully!");
    reset();
  } catch (err: unknown) {
    if (isServerError(err)) {
      setError(err.field, {
        type: "server",
        message: err.message
      });
    }
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
};