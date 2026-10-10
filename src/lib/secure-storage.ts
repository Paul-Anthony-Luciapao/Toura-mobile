import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function getStoredItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    try {
      return typeof localStorage === "undefined"
        ? null
        : localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

export async function setStoredItem(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    try {
      localStorage.setItem(key, value);
    } catch {
      // local storage unavailable — session stays in memory only
    }
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

export async function removeStoredItem(key: string): Promise<void> {
  if (Platform.OS === "web") {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    return;
  }

  await SecureStore.deleteItemAsync(key);
}
