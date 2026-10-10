import axios from "axios";

const FALLBACK_BASE_URL = "http://127.0.0.1:8000/api";

function resolveBaseURL(): string {
  const rawBaseURL =
    process.env.EXPO_PUBLIC_API_URL ||
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    FALLBACK_BASE_URL;
  const trimmed = rawBaseURL.trim().replace(/\/+$/, "");
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

export const API_BASE_URL = resolveBaseURL();

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return `Request timed out. No response from ${API_BASE_URL}.`;
    }

    if (!error.response) {
      return `Cannot reach ${API_BASE_URL}. Check that the server is running and reachable from this device.`;
    }

    const data = error.response.data as
      | { message?: string; errors?: Record<string, string[]> }
      | undefined;
    const firstFieldError = data?.errors
      ? Object.values(data.errors)[0]?.[0]
      : undefined;
    if (firstFieldError) return firstFieldError;
    if (data?.message) return data.message;

    return `Server returned ${error.response.status}.`;
  }

  return error instanceof Error ? error.message : "Something went wrong.";
}
