// services/api.ts is not the backend.
// code that talks to your backend lives here. (CRUD Functionalities)

import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Or use you device IP to test physical device
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

api.interceptors.request.use((config) => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response)
      return "Can't reach data. Check your server connection";
    const data = error.response.data as {
      message?: string;
      errors?: Record<string, string[]>;
    };
    const firstFieldError = data?.errors
      ? Object.values(data.errors)[0]?.[0]
      : undefined;
    return (
      firstFieldError ?? data?.message ?? "Something is wrong please try again"
    );
  }
  return "Something is wrong please try again.";
}
