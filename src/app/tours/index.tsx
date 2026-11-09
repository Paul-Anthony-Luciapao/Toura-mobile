import { colors } from "@/styles/global";
import { fetchTourPackages } from "@/services/tourBookings";
import type { TourPackage } from "@/types/tourPackage";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function TourCard({ item }: Readonly<{ item: TourPackage }>) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() =>
        router.push({ pathname: "/tours/[id]", params: { id: item.id } })
      }
      className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 active:opacity-80"
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="font-poppins-semibold text-base text-textMain">
            {item.name}
          </Text>
          <Text className="mt-1 font-poppins text-sm text-slate-500">
            {item.municipality} · {item.duration}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </View>
      <Text className="mt-3 font-poppins text-sm text-slate-600">
        {item.description}
      </Text>
      <Text className="mt-3 font-poppins-semibold text-primary">
        ₱{item.price.toLocaleString("en-PH")} per person
      </Text>
    </Pressable>
  );
}

export default function TourPackagesScreen() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPackages = useCallback(async () => {
    try {
      const results = await fetchTourPackages();
      setPackages(results);
      setError(null);
    } catch {
      setError("Could not load tours. Check your connection and try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadPackages();
    }, [loadPackages]),
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-4 pt-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text className="font-poppins-semibold text-xl text-textMain">
          Individual Tours
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View my tour bookings"
          onPress={() => router.push("/my-tours")}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="ticket-outline" size={21} color={colors.primary} />
        </Pressable>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center font-poppins text-slate-600">{error}</Text>
          <Pressable onPress={() => void loadPackages()} className="mt-4 rounded-xl bg-primary px-5 py-3">
            <Text className="font-poppins-semibold text-white">Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={packages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TourCard item={item} />}
          contentContainerClassName="px-5 pb-8"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                void loadPackages();
              }}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <Text className="mt-10 text-center font-poppins text-slate-500">
              No tours are available right now.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
