import NotificationBell from "@/components/common/NotificationBell";
import { useAuth } from "@/context/AuthContext";
import { fetchUnreadNotificationsCount } from "@/services/notifications";
import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type Props = Readonly<{
  variant?: "light" | "dark";
}>;

export default function Header({ variant = "dark" }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [unreadCount, setUnreadCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      if (!user) {
        setUnreadCount(0);
      } else {
        void fetchUnreadNotificationsCount().then((count) => {
          if (active) setUnreadCount(count);
        }).catch(() => {
          if (active) setUnreadCount(0);
        });
      }

      const refreshInterval = user
        ? setInterval(() => {
            void fetchUnreadNotificationsCount().then((count) => {
              if (active) setUnreadCount(count);
            }).catch(() => undefined);
          }, 30_000)
        : undefined;

      return () => {
        active = false;
        if (refreshInterval !== undefined) clearInterval(refreshInterval);
      };
    }, [user?.id]),
  );

  return (
    <View
      className="flex-row items-center justify-between px-5"
      style={{
        paddingTop: insets.top + 8,
      }}>
      {/* Logo */}
      <Image
        source={require("../../../assets/logo/toura-logo.png")}
        className="h-10 w-10"
        contentFit="contain"
      />

      {/* Notification */}
      <NotificationBell
        variant={variant}
        unreadCount={unreadCount}
        onPress={() => router.push("/notifications")}
      />
    </View>
  );
}
