import PackageFilterRow from "@/app/itinerary-packages/PackageFilterRow";
import TourPackageCard from "@/app/itinerary-packages/TourPackageCard";
import SearchBar from "@/components/common/SearchBar";
import CategoryItineraries from "@/components/itineraries/CategoryItineraries";
import {
    INITIAL_ITINERARY_PACKAGES,
    PACKAGE_RESORTS,
    PACKAGE_SPOTS,
} from "@/data/itineraryPackage";
import { getPackageSpotImage } from "@/data/packageImages";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = Readonly<{
  showBackButton?: boolean;
  contentBottomPadding?: number;
}>;

function EmptyState({ search }: Readonly<{ search: string }>) {
  return (
    <View className="items-center justify-center px-8 pt-16">
      <Text className="font-poppins-semibold text-[16px] text-[#111729]">
        No itineraries found
      </Text>

      <Text className="mt-2 text-center font-poppins text-[13px] text-[#878A93]">
        {search
          ? `Nothing matches "${search}". Try searching for another destination.`
          : "There are no itineraries for this destination yet."}
      </Text>
    </View>
  );
}

const ItineraryPackagesScreen = ({
  showBackButton = true,
  contentBottomPadding = 32,
}: Props) => {
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

      if (
        destination !== "All" &&
        packageDestination.toLowerCase() !== destination.toLowerCase()
      ) {
        return [];
      }

      const matchesSearch =
        !term ||
        pkg.name.toLowerCase().includes(term) ||
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
            {showBackButton && (
              <Pressable
                onPress={() => router.back()}
                hitSlop={10}
                accessibilityLabel="Go back"
                className="absolute left-0 h-[30px] w-[30px] items-center justify-center rounded-full bg-white shadow-sm shadow-black/10 active:opacity-70"
              >
                <Ionicons name="chevron-back" size={18} color="#111729" />
              </Pressable>
            )}

            <Text className="font-poppins-medium text-[20px] text-[#111729]">
              Itineraries
            </Text>
            <Pressable
              onPress={() => router.push("/tours")}
              accessibilityRole="button"
              accessibilityLabel="Browse individual tours"
              className="absolute right-0 flex-row items-center rounded-full bg-white px-3 py-2 shadow-sm shadow-black/10"
            >
              <Text className="font-poppins-medium text-[11px] text-primary">
                Tours
              </Text>
              <Ionicons
                name="chevron-forward"
                size={14}
                color="#2A9D8F"
                style={{ marginLeft: 2 }}
              />
            </Pressable>
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

        <View className="pb-[15px] pt-2">
          <CategoryItineraries
            variant="pill"
            onSelect={(item) => setDestination(item.name)}
          />

          <View className="mt-2">
            <PackageFilterRow />
          </View>
        </View>

        {/* Itineraries */}
        <FlatList
          data={packageItems}
          keyExtractor={(item) => item.pkg.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: contentBottomPadding }}
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
                  title={pkg.name}
                  image={getPackageSpotImage(spot.image)}
                  rating={spot.rating}
                  reviewCount={spot.reviewCount}
                  detail={`· ${detailParts.join(" · ")}`}
                  duration={pkg.duration}
                  price={pkg.price}
                  priceBasis={pkg.priceBasis}
                  isPopular={pkg.popular}
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
