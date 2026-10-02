import SearchBar from "@/components/common/SearchBar";
import TouristSpotCard from "@/components/home/TouristSpotCard";
import { INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import { colors } from "@/styles/global";
import CategoryItineraries from "@components/itineraries/CategoryItineraries";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function EmptyState({
  search,
}: Readonly<{ search: string }>) {
  return (
    <View className="items-center justify-center px-8 pt-20">
      <Text className="font-poppins-semibold text-[16px] text-textMain">
        No packages found
      </Text>

      <Text className="mt-2 text-center font-poppins text-[13px] text-textMuted">
        {search
          ? `Nothing matches "${search}". Try searching for another destination or municipality.`
          : "Browse destinations and curated itineraries will show up here."}
      </Text>
    </View>
  );
}

const ItineraryPackagesScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredSpots = useMemo(() => {
    const term = search.trim().toLowerCase();

    return INITIAL_TOURIST_SPOTS.filter(
      (spot) =>
        spot.name.toLowerCase().includes(term) ||
        spot.municipality.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top"]}
    >
      {/* Header */}
      <View className="px-4 pb-4 pt-3">
        {/* Title Row */}
        <View className="relative flex-row items-center justify-center">
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            className="absolute left-0 z-10 h-11 w-11 items-center justify-center rounded-full active:opacity-70"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.text}
            />
          </Pressable>

          <Text className="font-poppins-semibold text-[20px] text-textMain">
            Itinerary Packages
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mt-3">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
          />
        </View>
      </View>

      {/* Itineraries / Destinations */}
      <FlatList
        data={filteredSpots}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 32,
        }}
        ListHeaderComponent={
          <View>
            {/* Categories */}
            <View className="pb-5">
              <CategoryItineraries />
            </View>

            {/* Results Header */}
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-poppins-semibold text-[16px] text-textMain">
                Destinations
              </Text>

              <Text className="font-poppins text-[12px] text-textMuted">
                {filteredSpots.length}{" "}
                {filteredSpots.length === 1
                  ? "destination"
                  : "destinations"}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState search={search} />
        }
        renderItem={({ item }) => (
          <View className="mb-5 w-full">
            <TouristSpotCard
              spot={item}
              className="w-full"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ItineraryPackagesScreen;
