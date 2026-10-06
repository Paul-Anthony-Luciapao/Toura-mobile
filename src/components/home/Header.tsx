import { useAuth } from "@/context/auth";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = Readonly<{
  variant?: "light" | "dark";
}>;

const GREETING: Record<string, string> = {
  traveler: "Ready for your next trip",
  owner: "Manage your resorts",
  admin: "Here's today's overview",
};

export default function Header({ variant = "dark" }: Props) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const isLight = variant === "light";
  const iconColor = isLight ? colors.white : colors.text;
  const firstName = user?.name?.split(" ")[0];
  const greeting = user?.role ? GREETING[user.role] : undefined;

  return (
    <View className="px-5" style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Image
            source={require("../../../assets/logo/toura-logo.png")}
            className="h-10 w-10"
            contentFit="contain"
          />
          <Text
            className={`font-bold text-[24px] ${isLight ? "text-white" : "text-ink"}`}>
            Toura
          </Text>
        </View>

        <Ionicons name="notifications-outline" size={22} color={iconColor} />
      </View>

      {greeting && firstName ? (
        <Text
          className={`mt-1 text-[12.5px] ${
            isLight ? "text-white/85" : "text-ink-500"
          }`}>
          {greeting}, {firstName}
        </Text>
      ) : null}
    </View>
  );
}
