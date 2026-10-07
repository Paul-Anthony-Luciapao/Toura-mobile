import SearchBar from "@/components/common/SearchBar";
import { Dates, INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import { colors } from "@/styles/global";
import CategoryItineraries from "@components/itineraries/CategoryItineraries";
import ItineraryCards from "@components/itineraries/ItineraryCards";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function EmptyState({ search }: Readonly<{ search: string }>) {
  return (
    <View className="items-center gap-2 px-8 pt-20">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-surfaceSoft">
        <Ionicons name="search-outline" size={28} color={colors.textMuted} />
      </View>

      <Text className="font-poppins-semibold text-[16px] text-textMain">
        No packages found
      </Text>

      <Text className="text-center font-poppins text-[13px] text-textMuted">
        {search
          ? `Nothing matches "${search}". Try another name or municipality.`
          : "Browse destinations and curated itineraries will show up here."}
      </Text>
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
      {/* Light screen background, so keep the status bar icons dark. */}
      <StatusBar style="dark" />
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
