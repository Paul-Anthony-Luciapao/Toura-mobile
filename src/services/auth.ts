import type { Role, User } from "@/data/types";
import { api } from "./api";

export async function loginRequest(
  email: string,
  password: string,
  role?: Role,
) {
  const { data } = await api.post<{ user: User; token: string }>(
    "/auth/login",
    {
      email,
      password,
      role,
    },
  );
  return data;
}

export async function registerRequest(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  const { data } = await api.post<{ user: User; token: string }>(
    "/auth/register",
    input,
  );
  return data;
}

export async function fetchMe() {
  const { data } = await api.get<{ user: User }>("/me");
  return data.user;
}

export async function logoutRequest() {
  await api.post("/auth/logout");
}

export async function deleteAccountRequest() {
  await api.delete("/auth/account");
}
