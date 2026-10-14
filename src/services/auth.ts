import type { Role } from "@/data/types";
import { api } from "./api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  avatar?: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

type RawAuthUser = Omit<AuthUser, "id"> & { id: string | number };

type SessionResponse = {
  success: boolean;
  message?: string;
  token: string;
  user: RawAuthUser;
};

type MeResponse = {
  success: boolean;
  user: RawAuthUser;
};

function toAuthUser(raw: RawAuthUser): AuthUser {
  return { ...raw, id: String(raw.id) };
}

export async function loginRequest(
  email: string,
  password: string,
  role?: Role,
): Promise<AuthSession> {
  const { data } = await api.post<SessionResponse>("/auth/login", {
    email: email.trim(),
    password,
    role,
  });

  return { token: data.token, user: toAuthUser(data.user) };
}

export async function registerRequest(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<AuthSession> {
  const { data } = await api.post<SessionResponse>("/auth/register", input);

  return { token: data.token, user: toAuthUser(data.user) };
}

export async function fetchMe(): Promise<AuthUser> {
  const { data } = await api.get<MeResponse>("/auth/me");

  return toAuthUser(data.user);
}

export async function logoutRequest(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // Clearing the local session is what actually signs the user out.
  }
}

export async function deleteAccountRequest(): Promise<void> {
  await api.delete("/auth/account");
}

export function roleLabel(role: Role): string {
  if (role === "owner") {
    return "Resort Owner";
  }

  return "Traveler";
}

export async function requestPasswordReset(email: string): Promise<void> {
  await api.post("/auth/forgot-password", {
    email: email.trim(),
  });
}

export async function resetPassword(input: {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}): Promise<void> {
  await api.post("/auth/reset-password", {
    ...input,
    email: input.email.trim(),
  });
}
