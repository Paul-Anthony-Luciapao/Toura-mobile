import SearchBar from "@/components/common/SearchBar";
import { INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import { colors } from "@/styles/global";
import CategoryItineraries from "@components/itineraries/CategoryItineraries";
import ItineraryCards, { Dates } from "@components/itineraries/ItineraryCards";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function EmptyState({ search }: Readonly<{ search: string }>) {
  return (
    <View className="flex-1 bg-white px-5 pt-16">
      <Text className="text-[20px] font-bold text-slate-900">Itinerary</Text>
    </View>
  );
}

export default function ItineraryPackagesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredSpots = useMemo(() => {
    const term = search.trim().toLowerCase();

    return INITIAL_TOURIST_SPOTS.filter(
      (spot) =>
        spot.name.toLowerCase().includes(term) ||
        spot.municipality.toLowerCase().includes(term),
    );
  }, [search]);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      {/* Page Title */}
      <Text className="pt-3 text-center font-poppins-medium text-xl text-textMain">
        My Itineraries
      </Text>

      {/* Header */}
      <View className="flex-row items-center gap-3 px-4 py-3">
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="h-11 w-11 items-center justify-center rounded-full active:opacity-70">
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        {/* Search Bar */}
        <View className="flex-1">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
          />
        </View>
      </View>

      {/* Categories */}
      <View>
        <CategoryItineraries />
      </View>

      {/* List of Packages */}
      <FlatList
        data={filteredSpots}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4 pb-8"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState search={search} />}
        renderItem={({ item, index }) => (
          <View className="mb-4 w-full">
            <ItineraryCards spot={item} date={Dates[index % Dates.length]} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
