// services/api.ts is not the backend.
// code that talks to your backend lives here. (CRUD Functionalities)


import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ||
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    "http://192.168.1.17:8000/api", // Or use your device IP to test physical device
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

