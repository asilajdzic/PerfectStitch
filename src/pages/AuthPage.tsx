import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

type AuthMode = "login" | "signup";

const inputClassName =
  "w-full rounded-md border border-neutral/30 bg-neutral-light px-3 py-2 text-neutral-dark placeholder:text-neutral/70 transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    resetForm();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Placeholder until backend auth is connected
    console.log(mode === "login" ? "Login" : "Sign up", { email });
  };

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-neutral/20 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-neutral-dark sm:text-3xl">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="mt-2 text-sm text-neutral-dark/70">
          {mode === "login"
            ? "Sign in to manage orders and saved measurements."
            : "Join PerfectStitch to track orders and save your fit preferences."}
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
              mode === "login"
                ? "bg-white text-neutral-dark shadow-sm"
                : "text-neutral-dark/60 hover:text-neutral-dark",
            ].join(" ")}
            role="tab"
            type="button"
            onClick={() => switchMode("login")}
          >
            Sign in
          </button>
          <button
            aria-selected={mode === "signup"}
            className={[
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              mode === "signup"
                ? "bg-white text-neutral-dark shadow-sm"
                : "text-neutral-dark/60 hover:text-neutral-dark",
            ].join(" ")}
            role="tab"
            type="button"
            onClick={() => switchMode("signup")}
          >
            Sign up
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-neutral-dark"
              htmlFor="email"
            >
              Email
            </label>
            <input
              autoComplete="email"
              className={inputClassName}
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
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
              className={inputClassName}
              id="password"
              minLength={8}
              name="password"
              placeholder="At least 8 characters"
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {mode === "signup" && (
            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-neutral-dark"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <input
                autoComplete="new-password"
                className={inputClassName}
                id="confirmPassword"
                minLength={8}
                name="confirmPassword"
                placeholder="Re-enter your password"
                required
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          )}

          {error && (
            <p className="rounded-md bg-secondary/10 px-3 py-2 text-sm text-secondary">
              {error}
            </p>
          )}

          <button
            className="w-full rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-neutral-light transition-colors hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/30"
            type="submit"
          >
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        {mode === "login" && (
          <p className="mt-4 text-center text-sm text-neutral-dark/70">
            <button
              className="font-medium text-secondary transition-colors hover:text-secondary/80"
              type="button"
            >
              Forgot password?
            </button>
          </p>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-neutral-dark/70">
        <Link
          className="font-medium text-secondary transition-colors hover:text-secondary/80"
          to="/"
        >
          Back to home
        </Link>
      </p>
    </section>
  );
};

export default AuthPage;
