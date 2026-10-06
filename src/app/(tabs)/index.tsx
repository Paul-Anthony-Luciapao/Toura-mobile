import CategoryIcons from "@/components/home/CategoryIcons";
import HeroBanner from "@/components/home/HeroBanner";
import SectionHeader from "@/components/home/SectionHeader";
import TouristSpotCard from "@/components/home/TouristSpotCard";
import type { SpotSummary, TouristSpot } from "@/data/types";
import { describeApiError, fetchResortSummaries, fetchTouristSpots } from "@/services/toura";
import { colors } from "@/styles/global";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [resorts, setResorts] = useState<SpotSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);

    try {
      const [spotData, resortData] = await Promise.all([
        fetchTouristSpots(),
        fetchResortSummaries(),
      ]);
      setSpots(spotData);
      setResorts(resortData);
    } catch (e) {
      setError(describeApiError(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const openResort = (id: string) => {
    router.push(`/resort/${id}`);
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="pb-10">
      <StatusBar barStyle="light-content" />

      <HeroBanner
        image={require("../../../assets/images/palawan-hero.jpg")}
        headline={"Discover\nYour Next\nAdventure"}
        subtext="Explore breathing destinations, curated itinerary packages, and unforgettable experience."
      />

      <View className="-mt-8 rounded-t-[24px] bg-white px-5 pt-6">
        <CategoryIcons />
      </View>

      <View className="px-5">
        {loading ? (
          <View className="mt-16 items-center">
            <ActivityIndicator color={colors.primary} />
            <Text className="mt-3 text-[13px] text-ink-500">
              Loading destinations...
            </Text>
          </View>
        ) : error ? (
          <View className="mt-16 items-center">
            <Text className="text-[15px] font-semibold text-ink">{error}</Text>
            <Pressable
              onPress={() => {
                setLoading(true);
                load();
              }}
              className="mt-4 rounded-full bg-coral-400 px-5 py-2.5">
              <Text className="text-[13px] font-semibold text-white">
                Try again
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View className="mt-7">
              <SectionHeader title="Itinerary Packages" action="View all" />
              {spots.length === 0 ? (
                <Text className="mt-2 text-[13px] text-ink-500">
                  No tourist spots yet.
                </Text>
              ) : (
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
              )}
            </View>

            <View className="mt-7">
              <SectionHeader title="Tour Packages" action="View all" />
              {resorts.length === 0 ? (
                <Text className="mt-2 text-[13px] text-ink-500">
                  No resorts yet.
                </Text>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="pb-1">
                  {resorts.map((resort) => (
                    <Pressable
                      key={resort.id}
                      onPress={() => openResort(resort.id)}
                      className="mr-[14px]">
                      <TouristSpotCard spot={resort} />
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
