import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Provisional — not backed by a data type yet, revisit once category behavior is decided.
type CategoryIconItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};
// To be change later
const PLACEHOLDER_CATEGORIES: CategoryIconItem[] = [
  { id: "activities", label: "Activities", icon: "list-outline" },
  { id: "hotels", label: "Hotels", icon: "business-outline" },
  { id: "car-rentals", label: "Car Rentals", icon: "car-outline" },
  { id: "esims", label: "E-Sims", icon: "hardware-chip-outline" },
  { id: "more", label: "More", icon: "ellipsis-vertical" },
];

type Props = Readonly<{
  items?: CategoryIconItem[];
  onSelect?: (item: CategoryIconItem) => void;
}>;

export default function CategoryIcons({
  items = PLACEHOLDER_CATEGORIES,
  onSelect,
}: Props) {
  return (
    <View style={styles.row}>
      {items.map((item) => (
        <Pressable
          key={item.id}
          style={styles.item}
          onPress={() => onSelect?.(item)}>
          <View style={styles.circle}>
            <Ionicons name={item.icon} size={22} color={colors.text} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    gap: 6,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.text,
  },
});
