import TourPackageCard from "@/app/itinerary-packages/TourPackageCard";
import CategoryIcons from "@/components/home/CategoryIcons";
import HeroBanner from "@/components/home/HeroBanner";
import SectionHeader from "@/components/home/SectionHeader";
import TouristSpotCard from "@/components/home/TouristSpotCard";
import {
  INITIAL_ITINERARY_PACKAGES,
  PACKAGE_RESORTS,
  PACKAGE_SPOTS,
} from "@/data/mockData";
import type { ItineraryPackage, TouristSpot } from "@/data/types";
import { getErrorMessage } from "@/services/api";
import { fetchTouristSpots } from "@/services/touristSpots";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

const HOME_PACKAGES = INITIAL_ITINERARY_PACKAGES.map((pkg) => {
  const spot = PACKAGE_SPOTS.find((item) => item.id === pkg.spotId);
  const resort = PACKAGE_RESORTS.find((item) => item.id === pkg.resortId);

  if (!spot || !resort) {
    throw new Error(`Missing mock data for itinerary ${pkg.spotId}`);
  }

  return { pkg, spot, resort };
});

const getPackageTotal = (pkg: ItineraryPackage) =>
  pkg.priceBreakdown.reduce((total, line) => total + line.amount, 0);

const MOST_POPULAR_PACKAGE_ID = HOME_PACKAGES.reduce<{
  id: string;
  count: number;
} | null>((best, { pkg, spot }) => {
  return !best || spot.reviewCount > best.count
    ? { id: pkg.id, count: spot.reviewCount }
    : best;
}, null)?.id;

export default function Index() {
  const router = useRouter();

  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [favoritePackageIds, setFavoritePackageIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSpots = useCallback(async () => {
    setError(null);

    try {
      setSpots(await fetchTouristSpots());
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadSpots();
      setLoading(false);
    })();
  }, [loadSpots]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSpots();
    setRefreshing(false);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View className="mt-10 items-center">
          <ActivityIndicator color="#0f766e" />
        </View>
      );
    }

    if (error) {
      return (
        <View className="mt-10 items-center px-6">
          <Text className="text-center text-[13px] text-red-600">{error}</Text>
        </View>
      );
    }

    if (spots.length === 0) {
      return (
        <View className="mt-10 items-center px-6">
          <Text className="text-center text-[13px] text-slate-500">
            No destinations available yet. Pull down to refresh.
          </Text>
        </View>
      );
    }

    return (
      <>
        {/* Itineraries */}
        <View className="mt-5">
          <SectionHeader
            title="Itineraries"
            action="View all"
            onActionPress={() => router.push("/itinerary-packages")}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1">
            {spots.map((spot) => (
              <View key={spot.id} className="mr-3.5 w-[280px]">
                <TouristSpotCard
                  spot={spot}
                  className="w-full"
                  navigable={false}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </>
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="pb-10"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <StatusBar barStyle="light-content" />

      {/* Hero Banner */}
      <HeroBanner
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85"
        headline={"Discover\nYour Next\nAdventure"}
        subtext="Explore breathing destinations, curated itinerary packages, and unforgettable experience."
      />

      <View className="px-5">
        {/* Category Icons */}
        <View className="-mt-10 z-10 rounded-2xl px-2 py-3.5 shadow-md shadow-black/10">
          <CategoryIcons
            onSelect={(item) => {
              if (item.id === "hotels") {
                router.push("/hotels");
              } else if (item.id === "esims") {
                router.push("/esim");
              }
            }}
          />
        </View>

        {renderContent()}

        {/* Tour Packages */}
        <View className="mt-7">
          <SectionHeader
            title="Tour Packages"
            action="View all"
            onActionPress={() => router.push("/itinerary-packages")}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1">
            {HOME_PACKAGES.map(({ pkg, spot, resort }) => {
              const bedCount = resort.accommodations[0]?.bedCount;
              const detailParts = [
                bedCount
                  ? `${bedCount} ${bedCount === 1 ? "Bed" : "Beds"}`
                  : null,
                "Free breakfast",
              ].filter(Boolean);

              return (
                <View key={pkg.id} className="mr-3.5 w-[280px]">
                  <TourPackageCard
                    title={`${spot.name} Itinerary Package`}
                    image={spot.image}
                    rating={spot.rating}
                    reviewCount={spot.reviewCount}
                    detail={`· ${detailParts.join(" · ")}`}
                    days={pkg.days.length}
                    price={getPackageTotal(pkg)}
                    isPopular={pkg.id === MOST_POPULAR_PACKAGE_ID}
                    isFavorite={favoritePackageIds.includes(pkg.id)}
                    onToggleFavorite={() =>
                      setFavoritePackageIds((current) =>
                        current.includes(pkg.id)
                          ? current.filter((id) => id !== pkg.id)
                          : [...current, pkg.id],
                      )
                    }
                    onPress={() =>
                      router.push({
                        pathname: "/itinerary-packages/[id]",
                        params: { id: pkg.id },
                      })
                    }
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
