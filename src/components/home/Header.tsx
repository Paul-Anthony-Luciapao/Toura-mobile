import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = Readonly<{
  variant?: "light" | "dark";
}>;

export default function Header({ variant = "dark" }: Props) {
  const insets = useSafeAreaInsets();
  const textColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.brand}>
        <Ionicons name="leaf-outline" size={22} color={textColor} />
        <Text style={[styles.title, { color: textColor }]}>Toura</Text>
      </View>
      <Ionicons name="notifications-outline" size={22} color={textColor} />
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
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
