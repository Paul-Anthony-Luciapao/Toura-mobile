import type { Role, User } from "@/data/types";
import { tokenStorage } from "@/lib/tokenStorage";
import { setAuthToken } from "@/services/api";
import {
  fetchMe,
  loginRequest,
  logoutRequest,
  registerRequest,
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
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
    options?: SignInOptions,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (
    input: SignUpInput,
    options?: { remember?: boolean },
  ) => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore a saved session on launch.
  useEffect(() => {
    (async () => {
      try {
        const stored = await tokenStorage.get();
        if (stored) {
          setAuthToken(stored);
          setUser(await fetchMe());
        }
      } catch (error) {
        // Drop the token only if the server rejected it; keep it through network errors.
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          await tokenStorage.clear();
        }
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn: AuthState["signIn"] = async (email, password, options = {}) => {
    const { user: nextUser, token } = await loginRequest(
      email,
      password,
      options.role,
    );
    setAuthToken(token);
    if (options.remember) await tokenStorage.set(token);
    setUser(nextUser);
  };

  const signUp: AuthState["signUp"] = async (input, options = {}) => {
    const { user: nextUser, token } = await registerRequest(input);
    setAuthToken(token);
    if (options.remember) await tokenStorage.set(token);
    setUser(nextUser);
  };

  const signOut = async () => {
    try {
      await logoutRequest();
    } catch {
      // Token may already be invalid or the server unreachable. Clear locally regardless.
    }
    await tokenStorage.clear();
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
