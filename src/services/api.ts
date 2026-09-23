// services/api.ts is not the backend.
// code that talks to your backend lives here. (CRUD Functionalities)


import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Or use you device IP to test physical device
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

