import { useAuth } from "@/context/auth";
import { fetchUnreadCount } from "@/services/chat";
import { useEffect, useState } from "react";

export function useUnreadCount(intervalMs = 8000) {
  const { token } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!token) {
      return;
    }

    let active = true;

    const load = async () => {
      try {
        const total = await fetchUnreadCount();
        if (active) setCount(total);
      } catch {
        // Transient error — keep the last known value.
      }
    };

    load();
    const timer = setInterval(load, intervalMs);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [token, intervalMs]);

  if (!token) {
    return 0;
  }

  return count;
}
