import CategoryIcons from "@/components/home/CategoryIcons";
import HeroBanner from "@/components/home/HeroBanner";
import SectionHeader from "@/components/home/SectionHeader";
import TourPackageCard from "@/components/home/TourPackageCard";
import TouristSpotCard from "@/components/home/TouristSpotCard";
import type { TouristSpot } from "@/data/types";
import { getErrorMessage } from "@/services/api";
import { fetchTouristSpots } from "@/services/touristSpots";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [spots, setSpots] = useState<TouristSpot[]>([]);
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
        <View className="mt-7">
          <SectionHeader title="Itinerary Packages" action="View all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1">
            {spots.map((spot) => (
              <View key={spot.id} className="mr-[14px]">
                <TouristSpotCard spot={spot} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="mt-7">
          <SectionHeader title="Tour Packages" action="View all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1">
            {spots.map((spot) => (
              <View key={spot.id} className="mr-[14px]">
                <TourPackageCard
                  item={{ id: spot.id, title: spot.name, image: spot.image }}
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
      className="flex-1 bg-white"
      contentContainerClassName="pb-10"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <StatusBar barStyle="light-content" />

      <HeroBanner
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85"
        headline={"Discover\nYour Next\nAdventure"}
        subtext="Explore breathing destinations, curated itinerary packages, and unforgettable experience."
      />

      <View className="px-5">
        <View className="-mt-[26px]">
          <CategoryIcons />
        </View>

        {renderContent()}
      </View>
    </ScrollView>
  );
}
