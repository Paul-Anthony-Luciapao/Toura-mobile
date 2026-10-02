import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type CategoryIconItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const PLACEHOLDER_CATEGORIES: CategoryIconItem[] = [
  {
    id: "activities",
    label: "Activities",
    icon: "list-outline",
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: "business-outline",
  },
  {
    id: "car-rentals",
    label: "Car Rentals",
    icon: "car-outline",
  },
  {
    id: "esims",
    label: "E-Sims",
    icon: "hardware-chip-outline",
  },
  {
    id: "more",
    label: "More",
    icon: "ellipsis-vertical",
  },
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
    <View className="flex-row justify-between">
      {items.map((item) => (
        <Pressable
          key={item.id}
          className="items-center gap-1.5 active:opacity-70"
          onPress={() => onSelect?.(item)}>
          <View className="h-[52px] w-[52px] items-center justify-center rounded-full bg-[#eaf5f2] shadow-md shadow-black/10">
            <Ionicons name={item.icon} size={22} color={colors.text} />
          </View>

          <Text className="text-[11px] font-medium text-textMain">
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
