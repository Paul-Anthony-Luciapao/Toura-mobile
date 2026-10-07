import axios from "axios";

const FALLBACK_BASE_URL = "http://127.0.0.1:8000/api";

function resolveBaseURL(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, "");
  return fromEnv && fromEnv.length > 0 ? fromEnv : FALLBACK_BASE_URL;
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

    const apiMessage = (
      error.response.data as { message?: string } | undefined
    )?.message;
    if (apiMessage) return apiMessage;

    return `Server returned ${error.response.status}.`;
  }

  return error instanceof Error ? error.message : "Something went wrong.";
}
