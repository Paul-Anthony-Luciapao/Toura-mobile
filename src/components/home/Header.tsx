import NotificationBell from "@/components/common/NotificationBell";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type Props = Readonly<{
  variant?: "light" | "dark";
}>;

export default function Header({ variant = "dark" }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-between px-5"
      style={{
        paddingTop: insets.top + 8,
      }}
    >
      {/* Logo */}
      <Image
        source={require("../../../assets/logo/toura-logo.png")}
        className="h-9 w-9"
        contentFit="contain"
      />

      {/* Notification */}
      <NotificationBell
        variant={variant}
        onPress={() => router.push("/notifications")}
      />
    </View>
  );
}
