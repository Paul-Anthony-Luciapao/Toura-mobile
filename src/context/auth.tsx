import {
  getStoredItem,
  removeStoredItem,
  setStoredItem,
} from "@/lib/secure-storage";
import { setAuthToken } from "@/services/api";
import {
  fetchMe,
  loginRequest,
  logoutRequest,
  type AuthUser,
} from "@/services/auth";
import { isAxiosError } from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

const TOKEN_KEY = "toura.session.token";
const USER_KEY = "toura.session.user";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within <AuthProvider />");
  }
  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(async () => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
    await removeStoredItem(TOKEN_KEY);
    await removeStoredItem(USER_KEY);
  }, []);

  useEffect(() => {
    let active = true;

    (async () => {
      const [storedToken, storedUser] = await Promise.all([
        getStoredItem(TOKEN_KEY),
        getStoredItem(USER_KEY),
      ]);

      if (!active) return;

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      setAuthToken(storedToken);
      setToken(storedToken);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser) as AuthUser);
        } catch {
          // ignore malformed cache
        }
      }

      try {
        const me = await fetchMe();
        if (!active) return;
        setUser(me);
        await setStoredItem(USER_KEY, JSON.stringify(me));
      } catch (error) {
        const status = isAxiosError(error)
          ? error.response?.status
          : undefined;

        // Only drop the session when the server explicitly rejects the token.
        // Network failures keep the cached user so the app still opens.
        if (status === 401 || status === 403) {
          await clearSession();
        }
      } finally {
        if (active) setIsLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [clearSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    const session = await loginRequest(email, password);

    setAuthToken(session.token);
    setToken(session.token);
    setUser(session.user);

    await Promise.all([
      setStoredItem(TOKEN_KEY, session.token),
      setStoredItem(USER_KEY, JSON.stringify(session.user)),
    ]);

    return session.user;
  }, []);

  const signOut = useCallback(async () => {
    await logoutRequest();
    await clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({ user, token, isLoading, signIn, signOut }),
    [user, token, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
