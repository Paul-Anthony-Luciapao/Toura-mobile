import { safeBack } from "@/lib/navigation";
import { colors } from "@/styles/global";
import { fetchTourPackages } from "@/services/tourBookings";
import type { TourPackage } from "@/types/tourPackage";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import type { ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function FilterChips({
  label,
  options,
  selected,
  onSelect,
}: Readonly<{
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}>) {
  return (
    <View className="mb-3">
      <Text className="mb-2 font-poppins-medium text-xs text-slate-500">
        {label}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelect(option)}
              className={`mr-2 rounded-full border px-4 py-2 ${
                isSelected
                  ? "border-primary bg-primary"
                  : "border-slate-200 bg-white"
              }`}>
              <Text
                className={`font-poppins-medium text-xs ${
                  isSelected ? "text-white" : "text-slate-600"
                }`}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function getTourImage(item: TourPackage): ImageSourcePropType {
  if (item.image?.startsWith("https://") || item.image?.startsWith("http://")) {
    return { uri: item.image };
  }

  switch (item.municipality) {
    case "Coron":
      return require("../../../assets/images/coron.jpg");
    case "Puerto Princesa":
      return require("../../../assets/images/puertoprinsesa.jpg");
    case "San Vicente":
      return require("../../../assets/images/sanvicente.jpg");
    default:
      return require("../../../assets/images/elnido.jpg");
  }
}

function TourCard({ item }: Readonly<{ item: TourPackage }>) {
  const priceBasis = item.priceType === "per_group" ? "group" : "person";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() =>
        router.push({ pathname: "/tours/[id]", params: { id: item.id } })
      }
      className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white active:opacity-80"
    >
      <View className="h-40 bg-slate-200">
        <Image
          source={getTourImage(item)}
          resizeMode="cover"
          className="h-full w-full"
        />
        <View className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1">
          <Text className="font-poppins-medium text-xs text-textMain">
            {item.category}
          </Text>
        </View>
      </View>
      <View className="p-4">
        <View className="flex-row items-start justify-between gap-3">
          <Text
            className="flex-1 font-poppins-semibold text-base leading-6 text-textMain"
            numberOfLines={2}>
            {item.name}
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </View>
        <View className="mt-2 flex-row items-center">
          <Ionicons name="location-outline" size={15} color={colors.text} />
          <Text className="ml-1 font-poppins text-xs text-slate-500">
            {item.municipality}
          </Text>
          <Ionicons name="time-outline" size={15} color={colors.text} style={{ marginLeft: 12 }} />
          <Text className="ml-1 font-poppins text-xs text-slate-500">
            {item.duration}
          </Text>
        </View>
        <Text className="mt-2 font-poppins text-sm leading-5 text-slate-600" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="mt-3 flex-row items-baseline border-t border-slate-100 pt-3">
          <Text className="font-poppins-semibold text-base text-primary">
            ₱{item.price.toLocaleString("en-PH")}
          </Text>
          <Text className="ml-1 font-poppins text-xs text-slate-500">
            /{priceBasis}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function TourPackagesScreen() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMunicipality, setSelectedMunicipality] = useState("All");

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

  const categories = ["All", ...new Set(packages.map((item) => item.category))];
  const municipalities = [
    "All",
    ...new Set(packages.map((item) => item.municipality)),
  ];
  const filteredPackages = packages.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      (selectedMunicipality === "All" ||
        item.municipality === selectedMunicipality),
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-4 pt-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => safeBack()}
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
          data={filteredPackages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TourCard item={item} />}
          contentContainerClassName="px-5 pb-8"
          ListHeaderComponent={
            <View className="pt-1">
              <FilterChips
                label="Category"
                options={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
              <FilterChips
                label="Municipality"
                options={municipalities}
                selected={selectedMunicipality}
                onSelect={setSelectedMunicipality}
              />
            </View>
          }
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
              {packages.length > 0
                ? "No tours match these filters."
                : "No tours are available right now."}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
