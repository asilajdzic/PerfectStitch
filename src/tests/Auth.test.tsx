import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AuthPage from "../pages/AuthPage";
import * as authService from "../services/auth";

const renderAuthPage = () =>
  render(
    <MemoryRouter>
      <AuthPage />
    </MemoryRouter>,
  );

const switchToRegister = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("tab", { name: /register/i }));
};

describe("AuthPage login", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    authService.resetRegisteredEmailsForTests();
  });

  it("renders the login form", () => {
    renderAuthPage();

    expect(
      screen.getByRole("heading", { name: /welcome back/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^sign in$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^sign in$/i }),
    ).toHaveClass("bg-accent");
  });

  it("keeps submit disabled until the form is valid", async () => {
    const user = userEvent.setup();
    renderAuthPage();

    const submitButton = screen.getByRole("button", { name: /^sign in$/i });
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByLabelText(/^email$/i), "user@example.com");
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByLabelText(/^password$/i), "password123");
    expect(submitButton).toBeEnabled();
  });

  it("shows an inline error for an invalid email format", async () => {
    const user = userEvent.setup();
    renderAuthPage();

    await user.type(screen.getByLabelText(/^email$/i), "not-an-email");
    await user.tab();

    expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
  });

  it("shows an inline error when password is too short", async () => {
    const user = userEvent.setup();
    renderAuthPage();

    await user.type(screen.getByLabelText(/^email$/i), "user@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "short");
    await user.tab();

    expect(
      screen.getByText("Password must be at least 8 characters"),
    ).toBeInTheDocument();
  });

  it("displays an error alert when login fails", async () => {
    vi.spyOn(authService, "loginUser").mockRejectedValueOnce(
      new Error("Invalid email or password"),
    );

    const user = userEvent.setup();
    renderAuthPage();

    await user.type(screen.getByLabelText(/^email$/i), "user@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect(
      await screen.findByText("Invalid email or password. Please try again."),
    ).toBeInTheDocument();
  });

  it("does not show a login error alert on successful login", async () => {
    vi.spyOn(authService, "loginUser").mockResolvedValueOnce(undefined);

    const user = userEvent.setup();
    renderAuthPage();

    await user.type(screen.getByLabelText(/^email$/i), "user@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    await waitFor(() => {
      expect(authService.loginUser).toHaveBeenCalledWith(
        "user@example.com",
        "password123",
      );
    });

    expect(
      screen.queryByText("Invalid email or password. Please try again."),
    ).not.toBeInTheDocument();
  });
});

describe("AuthPage register", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    authService.resetRegisteredEmailsForTests();
  });

  it("renders the register form with accent styling", async () => {
    const user = userEvent.setup();
    renderAuthPage();

    await switchToRegister(user);

    expect(
      screen.getByRole("heading", { name: /create your account/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toHaveClass("bg-accent");
  });

  it("keeps register submit disabled until the form is valid", async () => {
    const user = userEvent.setup();
    renderAuthPage();
    await switchToRegister(user);

    const submitButton = screen.getByRole("button", { name: /create account/i });
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByLabelText(/^email$/i), "newuser@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    expect(submitButton).toBeDisabled();

    await user.type(
      screen.getByLabelText(/confirm password/i),
      "password123",
    );
    expect(submitButton).toBeEnabled();
  });

  it("shows an inline error when passwords do not match", async () => {
    const user = userEvent.setup();
    renderAuthPage();
    await switchToRegister(user);

    await user.type(screen.getByLabelText(/^email$/i), "newuser@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(
      screen.getByLabelText(/confirm password/i),
      "different123",
    );
    await user.tab();

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("displays an error alert when registration fails", async () => {
    vi.spyOn(authService, "registerUser").mockRejectedValueOnce(
      new Error("Email already registered"),
    );

    const user = userEvent.setup();
    renderAuthPage();
    await switchToRegister(user);

    await user.type(screen.getByLabelText(/^email$/i), "newuser@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(
      screen.getByLabelText(/confirm password/i),
      "password123",
    );
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(
      await screen.findByText(
        "Unable to create your account. This email may already be registered.",
      ),
    ).toBeInTheDocument();
  });

  it("does not show a register error alert on successful registration", async () => {
    vi.spyOn(authService, "registerUser").mockResolvedValueOnce(undefined);

    const user = userEvent.setup();
    renderAuthPage();
    await switchToRegister(user);

    await user.type(screen.getByLabelText(/^email$/i), "newuser@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(
      screen.getByLabelText(/confirm password/i),
      "password123",
    );
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(authService.registerUser).toHaveBeenCalledWith(
        "newuser@example.com",
        "password123",
      );
    });

    expect(
      screen.queryByText(
        "Unable to create your account. This email may already be registered.",
      ),
    ).not.toBeInTheDocument();
  });

  it("clears register fields when switching back to login", async () => {
    const user = userEvent.setup();
    renderAuthPage();
    await switchToRegister(user);

    await user.type(screen.getByLabelText(/^email$/i), "newuser@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(
      screen.getByLabelText(/confirm password/i),
      "password123",
    );

    await user.click(screen.getByRole("tab", { name: /^sign in$/i }));

    expect(screen.getByLabelText(/^email$/i)).toHaveValue("");
    expect(screen.getByLabelText(/^password$/i)).toHaveValue("");
    expect(screen.queryByLabelText(/confirm password/i)).not.toBeInTheDocument();
  });
});
