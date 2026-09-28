import type { Role, User } from "@/data/types";
import { api } from "./api";

export async function loginRequest(
  email: string,
  password: string,
  role?: Role,
) {
  const { data } = await api.post<{ user: User; token: string }>("/login", {
    email,
    password,
    role,
  });
  return data;
}

export async function fetchMe() {
  const { data } = await api.get<{ user: User }>("/me");
  return data.user;
}

export async function logoutRequest() {
  await api.post("/logout");
}
