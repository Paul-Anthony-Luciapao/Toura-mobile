import SearchBar from "@/components/common/SearchBar";
import CategoryItineraries from "@/components/itineraries/CategoryItineraries";
import {
  INITIAL_ITINERARY_PACKAGES,
  PACKAGE_RESORTS,
  PACKAGE_SPOTS,
} from "@/data/mockData";
import type { ItineraryPackage } from "@/data/types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PackageFilterRow from "../itinerary-packages/PackageFilterRow";
import TourPackageCard from "../itinerary-packages/TourPackageCard";

/** Package total = sum of every line in its price breakdown. */
const getPackageTotal = (pkg: ItineraryPackage) =>
  pkg.priceBreakdown.reduce((total, line) => total + line.amount, 0);

/**
 * The package whose spot has the most reviews gets the "Popular" badge.
 * Computed over ALL packages so the badge doesn't jump around when filtering.
 */
const MOST_POPULAR_PACKAGE_ID = INITIAL_ITINERARY_PACKAGES.reduce<{
  id: string;
  count: number;
} | null>((best, pkg) => {
  const count =
    PACKAGE_SPOTS.find((spot) => spot.id === pkg.spotId)?.reviewCount ?? 0;

  return !best || count > best.count ? { id: pkg.id, count } : best;
}, null)?.id;

function EmptyState({ search }: Readonly<{ search: string }>) {
  return (
    <View className="items-center justify-center px-8 pt-16">
      <Text className="font-poppins-semibold text-[16px] text-[#111729]">
        No packages found
      </Text>

      <Text className="mt-2 text-center font-poppins text-[13px] text-[#878A93]">
        {search
          ? `Nothing matches "${search}". Try searching for another destination.`
          : "There are no packages for this destination yet."}
      </Text>
    </View>
  );
}

const ItineraryPackagesScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);

  const packageItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    return INITIAL_ITINERARY_PACKAGES.flatMap((pkg) => {
      const spot = PACKAGE_SPOTS.find((item) => item.id === pkg.spotId);
      const resort = PACKAGE_RESORTS.find((item) => item.id === pkg.resortId);

      if (!spot || !resort) {
        return [];
      }

      const packageDestination = pkg.destination ?? "Palawan";

      if (destination !== "All" && packageDestination !== destination) {
        return [];
      }

      const matchesSearch =
        !term ||
        spot.name.toLowerCase().includes(term) ||
        spot.municipality.toLowerCase().includes(term) ||
        packageDestination.toLowerCase().includes(term);

      return matchesSearch ? [{ pkg, spot, resort }] : [];
    });
  }, [search, destination]);

  const toggleFavorite = (packageId: string) =>
    setFavorites((current) =>
      current.includes(packageId)
        ? current.filter((id) => id !== packageId)
        : [...current, packageId],
    );

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Soft teal fade behind the header, as in the Figma */}
      <LinearGradient
        pointerEvents="none"
        colors={["#D9EDED", "#FFFFFF"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 240,
        }}
      />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-[14px] pt-1">
          <View className="h-[30px] flex-row items-center justify-center">
            <Pressable
              onPress={() => router.back()}
              hitSlop={10}
              accessibilityLabel="Go back"
              className="absolute left-0 h-[30px] w-[30px] items-center justify-center rounded-full bg-white shadow-sm shadow-black/10 active:opacity-70">
              <Ionicons name="chevron-back" size={18} color="#111729" />
            </Pressable>

            <Text className="font-poppins-medium text-[20px] text-[#111729]">
              Tour Packages
            </Text>
          </View>

          <View className="mt-4">
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              containerClassName="shadow-sm shadow-black/5"
            />
          </View>
        </View>

        {/* Packages */}
        <FlatList
          data={packageItems}
          keyExtractor={(item) => item.pkg.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 32 }}
          ListHeaderComponent={
            <View className="pb-[15px] pt-2">
              <CategoryItineraries
                variant="pill"
                onSelect={(item) => setDestination(item.name)}
              />

              <View className="mt-2">
                <PackageFilterRow />
              </View>
            </View>
          }
          ListEmptyComponent={<EmptyState search={search} />}
          renderItem={({ item }) => {
            const { pkg, spot, resort } = item;
            const bedCount = resort.accommodations[0]?.bedCount;
            const detailParts = [
              bedCount
                ? `${bedCount} ${bedCount === 1 ? "Bed" : "Beds"}`
                : null,
              "Free breakfast",
            ].filter(Boolean);

            return (
              <View className="mb-[26px] px-[14px]">
                <TourPackageCard
                  title={`${spot.name} Itinerary Package`}
                  image={spot.image}
                  rating={spot.rating}
                  reviewCount={spot.reviewCount}
                  detail={`· ${detailParts.join(" · ")}`}
                  days={pkg.days.length}
                  price={getPackageTotal(pkg)}
                  isPopular={pkg.id === MOST_POPULAR_PACKAGE_ID}
                  isFavorite={favorites.includes(pkg.id)}
                  onToggleFavorite={() => toggleFavorite(pkg.id)}
                  onPress={() =>
                    router.push({
                      pathname: "/itinerary-packages/[id]",
                      params: { id: pkg.id },
                    })
                  }
                />
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default ItineraryPackagesScreen;
