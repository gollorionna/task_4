import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Login } from "../../../pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const queryClient = new QueryClient();

describe("Login component", () => {
  it("renders login form", () => {
    render(
        <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    )

    expect(screen.getByText("Authorization")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write your username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("........")).toBeInTheDocument();
  });
});