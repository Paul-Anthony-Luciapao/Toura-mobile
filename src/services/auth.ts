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

type LoginResponse = {
  success: boolean;
  message: string;
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
): Promise<AuthSession> {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email: email.trim(),
    password,
  });

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

export function roleLabel(role: Role): string {
  switch (role) {
    case "admin":
      return "Administrator";
    case "owner":
      return "Resort Owner";
    default:
      return "Traveler";
  }
}
