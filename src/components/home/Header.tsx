import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = Readonly<{
  variant?: "light" | "dark";
}>;

export default function Header({ variant = "dark" }: Props) {
  const insets = useSafeAreaInsets();
  const iconColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Image
        source={require("../../../assets/logo/toura-logo.png")}
        style={styles.logo}
        contentFit="contain"
      />
      <Ionicons name="notifications-outline" size={22} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 36,
    height: 36,
  },
});
