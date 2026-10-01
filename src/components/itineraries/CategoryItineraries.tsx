import { useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

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

type Props = Readonly<{
  items?: CategoryItineraryPlaces[];
  onSelect?: (item: CategoryItineraryPlaces) => void;
}>;

const CategoryItineraries = ({
  items = PLACEHOLDER_CATEGORIES_ITINERARIES,
  onSelect,
}: Props) => {
  const [selectedId, setSelectedId] = useState("all");

  const handleSelect = (item: CategoryItineraryPlaces) => {
    setSelectedId(item.id);
    onSelect?.(item);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
      }}
    >
      {items.map((item) => {
        const isSelected = selectedId === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => handleSelect(item)}
            className={`rounded-full px-4 py-2 ${
              isSelected ? "bg-primary" : "bg-transparent"
            }`}
          >
            <Text
              className={`font-poppins-medium text-[11px] ${
                isSelected ? "text-white" : "text-textMuted"
              }`}
            >
              {item.label}
            </Text>

            {isSelected && (
              <View className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white" />
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default CategoryItineraries;
