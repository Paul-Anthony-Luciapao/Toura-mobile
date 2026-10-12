import { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";

type CategoryItineraryPlaces = {
  id: string;
  name: string;
  label: string;
};

const PLACEHOLDER_CATEGORIES_ITINERARIES: CategoryItineraryPlaces[] = [
  { id: "all", name: "All", label: "All" },
  { id: "1", name: "Palawan", label: "Palawan" },
  { id: "2", name: "Cebu", label: "Cebu" },
  { id: "3", name: "Baguio", label: "Baguio" },
  { id: "4", name: "Siargao", label: "Siargao" },
  { id: "5", name: "Vigan", label: "Vigan" },
];

type Variant = "plain" | "pill";

type Props = Readonly<{
  items?: CategoryItineraryPlaces[];
  onSelect?: (item: CategoryItineraryPlaces) => void;
  /**
   * "plain" (default) is the original look used by the other screens.
   * "pill" is the Itineraries look: white pills, filled teal when selected.
   */
  variant?: Variant;
}>;

const CategoryItineraries = ({
  items = PLACEHOLDER_CATEGORIES_ITINERARIES,
  onSelect,
  variant = "plain",
}: Props) => {
  const [selectedId, setSelectedId] = useState("all");

  const handleSelect = (item: CategoryItineraryPlaces) => {
    setSelectedId(item.id);
    onSelect?.(item);
  };

  const isPill = variant === "pill";

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={isPill ? { flexGrow: 0 } : { height: 56 }}
      contentContainerStyle={
        isPill
          ? { paddingHorizontal: 14, paddingVertical: 8, gap: 12 }
          : { paddingHorizontal: 16, paddingVertical: 12, gap: 8 }
      }>
      {items.map((item) => {
        const isSelected = selectedId === item.id;

        const chipClass = isPill
          ? "rounded-full px-[10px] py-[3px] shadow-sm shadow-black/5"
          : "rounded-full px-4 py-2";

        const textClass = isPill
          ? "font-poppins-medium text-[12px]"
          : "font-poppins-medium text-[11px]";

        const chipBackgroundColor = isSelected
          ? isPill
            ? "#4F9B8F"
            : "#E07856"
          : isPill
            ? "#FFFFFF"
            : "transparent";

        const textColor = isSelected
          ? "#FFFFFF"
          : isPill
            ? "#111729"
            : "#6B716E";

        return (
          <Pressable
            key={item.id}
            onPress={() => handleSelect(item)}
            hitSlop={isPill ? { top: 6, bottom: 6 } : undefined}
            className={chipClass}
            style={{ backgroundColor: chipBackgroundColor }}>
            <Text className={textClass} style={{ color: textColor }}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default CategoryItineraries;
