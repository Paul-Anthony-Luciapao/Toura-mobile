import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

type CategoryItineraryPlaces = {
  id: string;
  name: string;
  label: string;
};

const PLACEHOLDER_CATEGORIES_ITINERARIES: CategoryItineraryPlaces[] = [
  { id: 'all', name: 'All', label: 'All' },
  { id: '1', name: 'Palawan', label: 'Palawan' },
  { id: '2', name: 'Cebu', label: 'Cebu' },
  { id: '3', name: 'Baguio', label: 'Baguio' },
  { id: '4', name: 'Siargao', label: 'Siargao' },
  { id: '5', name: 'Vigan', label: 'Vigan' },
];

type Props = Readonly<{
  items?: CategoryItineraryPlaces[];
  onSelect?: (item: CategoryItineraryPlaces) => void;
}>;

const CategoryItineraries = ({
  items = PLACEHOLDER_CATEGORIES_ITINERARIES,
  onSelect,
}: Props) => {
  const [selectedId, setSelectedId] = useState('all');

  const handleSelect = (item: CategoryItineraryPlaces) => {
    setSelectedId(item.id);
    onSelect?.(item);
  };

  return (
    <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex-row items-center gap-2 px-4 py-2"
    >
        {items.map((item) => {
            const isSelected = selectedId === item.id;

            return (

                <Pressable
                    key={item.id}
                    onPress={() => handleSelect(item)}
                    className={`rounded-full px-4 py-2 ${
                    isSelected ? 'bg-primary' : 'bg-transparent'
                    }`}
                >
                    <Text
                    className={`text-[11px] font-medium ${
                        isSelected ? 'text-white' : 'text-textMe'
                    }`}
                    >
                    {item.label}
                    </Text>

                    {isSelected && (
                    <View className="h-1 w-1 rounded-full bg-primary" />
                    )}
                </Pressable> 
            );
        })}
    </ScrollView>
  );
};

export default CategoryItineraries;
