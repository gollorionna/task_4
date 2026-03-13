import { render, screen } from "@testing-library/react";
import { Login } from "../../../pages/Login";
import { expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const queryClient = new QueryClient();

it("submit button is disabled when form is invalid", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );

  const button = screen.getByRole("button", { name: /sign in/i });

  expect(button).toBeDisabled();
});