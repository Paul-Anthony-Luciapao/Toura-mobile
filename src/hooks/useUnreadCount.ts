import { useAuth } from "@/context/auth";
import { fetchUnreadCount } from "@/services/chat";
import { useEffect, useState } from "react";

export function useUnreadCount(intervalMs = 8000) {
  const { token, user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!token || user?.role === "admin") {
      return;
    }

    let active = true;

    const load = async () => {
      try {
        const total = await fetchUnreadCount();
        if (active) setCount(total);
      } catch {
        // transient error — keep the last known value
      }
    };

    load();
    const timer = setInterval(load, intervalMs);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [token, user?.role, intervalMs]);

  if (!token || user?.role === "admin") {
    return 0;
  }

  return count;
}
