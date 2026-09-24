import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = Readonly<{
  variant?: "light" | "dark";
}>;

export default function Header({ variant = "dark" }: Props) {
  const insets = useSafeAreaInsets();
  const iconColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <View
      className="flex-row items-center justify-between px-5"
      style={{ paddingTop: insets.top + 8 }}>
      <Image
        source={require("../../../assets/logo/toura-logo.png")}
        className="h-9 w-9"
        contentFit="contain"
      />
      <Ionicons name="notifications-outline" size={22} color={iconColor} />
    </View>
  );
}
