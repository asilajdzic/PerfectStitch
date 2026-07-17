const VALID_EMAIL = "user@example.com";
const VALID_PASSWORD = "password123";

const registeredEmails = new Set<string>([VALID_EMAIL]);

export async function loginUser(
  email: string,
  password: string,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));

  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    throw new Error("Invalid email or password");
  }
}

export async function registerUser(
  email: string,
  password: string,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));

  if (registeredEmails.has(email)) {
    throw new Error("Email already registered");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  registeredEmails.add(email);
}

export function resetRegisteredEmailsForTests(): void {
  registeredEmails.clear();
  registeredEmails.add(VALID_EMAIL);
}
