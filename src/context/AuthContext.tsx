import type { Role } from "@/data/types";
import {
  getStoredItem,
  removeStoredItem,
  setStoredItem,
} from "@/lib/secure-storage";
import { tokenStorage } from "@/lib/tokenStorage";
import { setAuthToken } from "@/services/api";
import {
  deleteAccountRequest,
  fetchMe,
  loginRequest,
  logoutRequest,
  registerRequest,
  type AuthUser,
} from "@/services/auth";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type SignInOptions = { role?: Role; remember?: boolean };

type SignUpInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
    options?: SignInOptions,
  ) => Promise<void>;
  signUp: (input: SignUpInput, options?: { remember?: boolean }) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const LEGACY_TOKEN_KEY = "toura.session.token";
const LEGACY_USER_KEY = "toura.session.user";

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let stored = await tokenStorage.get();

        // Pick up a session saved by the previous storage layer.
        if (!stored) {
          const legacy = await getStoredItem(LEGACY_TOKEN_KEY);
          if (legacy) {
            stored = legacy;
            await tokenStorage.set(legacy);
          }
        }

        if (stored) {
          setAuthToken(stored);
          setToken(stored);

          const cached = await getStoredItem(LEGACY_USER_KEY);
          if (cached) {
            try {
              setUser(JSON.parse(cached) as AuthUser);
            } catch {
              // ignore malformed cache
            }
          }

          setUser(await fetchMe());
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          await tokenStorage.clear();
          await removeStoredItem(LEGACY_TOKEN_KEY);
          await removeStoredItem(LEGACY_USER_KEY);
          setToken(null);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn: AuthState["signIn"] = async (email, password, options = {}) => {
    const { user: nextUser, token: nextToken } = await loginRequest(
      email,
      password,
      options.role,
    );

    setAuthToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);

    await tokenStorage.set(nextToken);
    await setStoredItem(LEGACY_USER_KEY, JSON.stringify(nextUser));

    if (options.remember) {
      await setStoredItem(LEGACY_TOKEN_KEY, nextToken);
    }
  };

  const signUp: AuthState["signUp"] = async (input, options = {}) => {
    const { user: nextUser, token: nextToken } = await registerRequest(input);

    setAuthToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);

    await tokenStorage.set(nextToken);
    await setStoredItem(LEGACY_USER_KEY, JSON.stringify(nextUser));

    if (options.remember) {
      await setStoredItem(LEGACY_TOKEN_KEY, nextToken);
    }
  };

  const signOut = async () => {
    try {
      await logoutRequest();
    } catch {
      // Ignore server errors; clear local session anyway.
    }

    await tokenStorage.clear();
    await removeStoredItem(LEGACY_TOKEN_KEY);
    await removeStoredItem(LEGACY_USER_KEY);
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  const deleteAccount = async () => {
    try {
      await deleteAccountRequest();
    } catch (error) {
      console.error("Delete account failed:", error);
      throw error;
    }

    await tokenStorage.clear();
    await removeStoredItem(LEGACY_TOKEN_KEY);
    await removeStoredItem(LEGACY_USER_KEY);
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  const value: AuthState = {
    user,
    token,
    loading,
    signIn,
    signUp,
    signOut,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
