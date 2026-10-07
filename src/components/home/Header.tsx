import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type Props = Readonly<{
  variant?: "light" | "dark";
}>;

const GREETING: Record<string, string> = {
  traveler: "Ready for your next trip",
  owner: "Manage your resorts",
  admin: "Here's today's overview",
};

export default function Header({ variant = "dark" }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const iconColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <View
      className="flex-row items-center justify-between px-5"
      style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center gap-2">
        <Image
          source={require("../../../assets/logo/toura-logo.png")}
          className="h-10 w-10"
          contentFit="contain"
        />
        <Text className="font-bold text-[24px] text-white">Toura</Text>
      </View>

      <Ionicons name="notifications-outline" size={22} color={iconColor} />
    </View>
  );
}
