import axios from "axios";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";

function resolveBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }

  if (Platform.OS === "android" && !Device.isDevice) {
    return "http://10.0.2.2:8000/api";
  }

  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  if (host && host !== "localhost" && host !== "127.0.0.1") {
    return `http://${host}:8000/api`;
  }

  return "http://127.0.0.1:8000/api";
}

export const API_BASE_URL = resolveBaseUrl();

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken() {
  return authToken;
}

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});