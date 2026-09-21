import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = Readonly<{
  variant?: "light" | "dark";
}>;

export default function Header({ variant = "dark" }: Props) {
  const textColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <View style={styles.container}>
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
    paddingTop: 16,
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
