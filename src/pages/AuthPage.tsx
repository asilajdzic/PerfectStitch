import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth";
import type { AuthFormValues, AuthMode } from "../types/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const theme = {
  card: "border-accent/25 ring-1 ring-accent/10",
  heading: "text-neutral-dark",
  headingAccent: "text-accent",
  tabActive: "bg-accent/10 text-accent shadow-sm",
  tabInactive: "text-neutral-dark/60 hover:text-accent",
  inputFocus: "focus:border-accent focus:ring-accent/20",
  inputError: "border-accent focus:border-accent focus:ring-accent/20",
  inlineError: "text-accent",
  alert: "border-accent/20 bg-accent/10 text-accent",
  button: "bg-accent hover:bg-accent/90 focus:ring-accent/30 text-primary",
  link: "text-accent hover:text-accent/80",
} as const;

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AuthFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setAuthError("");
    reset({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const inputClassName = (hasError: boolean) =>
    [
      "w-full rounded-md border bg-neutral-light px-3 py-2 text-neutral-dark placeholder:text-neutral/70 transition-colors focus:outline-none focus:ring-2",
      hasError ? theme.inputError : `border-neutral/30 ${theme.inputFocus}`,
    ].join(" ");

  const onSubmit = async (data: AuthFormValues) => {
    setAuthError("");

    try {
      if (mode === "login") {
        await loginUser(data.email, data.password);
      } else {
        await registerUser(data.email, data.password);
      }
    } catch {
      setAuthError(
        mode === "login"
          ? "Invalid email or password. Please try again."
          : "Unable to create your account. This email may already be registered.",
      );
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-12 sm:px-6 lg:px-8">
      <div
        className={[
          "rounded-xl border bg-white p-6 shadow-sm sm:p-8",
          theme.card,
        ].join(" ")}
      >
        <h1 className={`text-2xl font-bold sm:text-3xl ${theme.heading}`}>
          {mode === "login" ? (
            <>
              Welcome <span className={theme.headingAccent}>back</span>
            </>
          ) : (
            <>
              Create your <span className={theme.headingAccent}>account</span>
            </>
          )}
        </h1>
        <p className="mt-2 text-sm text-neutral-dark/70">
          {mode === "login"
            ? "Sign in to manage orders and saved measurements."
            : "Register to track orders and save your fit preferences."}
        </p>

        <div
          className="mt-6 flex rounded-lg bg-neutral-light p-1"
          role="tablist"
          aria-label="Authentication mode"
        >
          <button
            aria-selected={mode === "login"}
            className={[
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              mode === "login" ? theme.tabActive : theme.tabInactive,
            ].join(" ")}
            role="tab"
            type="button"
            onClick={() => switchMode("login")}
          >
            Sign in
          </button>
          <button
            aria-selected={mode === "register"}
            className={[
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              mode === "register" ? theme.tabActive : theme.tabInactive,
            ].join(" ")}
            role="tab"
            type="button"
            onClick={() => switchMode("register")}
          >
            Register
          </button>
        </div>

        <form
          className="mt-6 space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-neutral-dark"
              htmlFor="email"
            >
              Email
            </label>
            <input
              autoComplete="email"
              className={inputClassName(Boolean(errors.email))}
              id="email"
              placeholder="you@example.com"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p
                className={`mt-1.5 text-sm ${theme.inlineError}`}
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-neutral-dark"
              htmlFor="password"
            >
              Password
            </label>
            <input
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              className={inputClassName(Boolean(errors.password))}
              id="password"
              placeholder="At least 8 characters"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p
                className={`mt-1.5 text-sm ${theme.inlineError}`}
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {mode === "register" && (
            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-neutral-dark"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <input
                autoComplete="new-password"
                className={inputClassName(Boolean(errors.confirmPassword))}
                id="confirmPassword"
                placeholder="Re-enter your password"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p
                  className={`mt-1.5 text-sm ${theme.inlineError}`}
                  role="alert"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          {authError && (
            <div
              className={[
                "rounded-md border px-3 py-2 text-sm",
                theme.alert,
              ].join(" ")}
              role="alert"
            >
              {authError}
            </div>
          )}

          <button
            className={[
              "w-full rounded-md px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
              theme.button,
            ].join(" ")}
            disabled={!isValid || isSubmitting}
            type="submit"
          >
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        {mode === "login" && (
          <p className="mt-4 text-center text-sm text-neutral-dark/70">
            <button
              className={`font-medium transition-colors ${theme.link}`}
              type="button"
            >
              Forgot password?
            </button>
          </p>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-neutral-dark/70">
        <Link
          className={`font-medium transition-colors ${theme.link}`}
          to="/"
        >
          Back to home
        </Link>
      </p>
    </section>
  );
};

export default AuthPage;
