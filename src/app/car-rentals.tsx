import { safeBack } from "@/lib/navigation";
import CarRentalCard from "@/components/car-rentals/CarRentalCard";
import SearchBar from "@/components/common/SearchBar";
import { carRentalProviders } from "@/data/carRentals";
import type { CarRentalCategory } from "@/types/carRental";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CATEGORIES: Array<"All" | CarRentalCategory> = [
  "All",
  "Cars",
  "Vans",
  "Motorbikes",
  "Chauffeur",
];

export default function CarRentalsScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const providers = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();

    return carRentalProviders.filter((provider) => {
      const matchesCategory =
        category === "All" || provider.categories.includes(category);
      const searchableText = [
        provider.name,
        provider.location,
        provider.phone,
        ...provider.fleet,
        ...provider.services,
      ]
        .join(" ")
        .toLocaleLowerCase();

      return matchesCategory && (!term || searchableText.includes(term));
    });
  }, [category, search]);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center gap-3 px-5 pb-4">
        <Pressable
          onPress={() => safeBack()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-9 w-9 items-center justify-center rounded-full border border-slate-200"
        >
          <Ionicons name="chevron-back" size={20} color="#0f172a" />
        </Pressable>
        <Text className="flex-1 font-poppins-semibold text-[18px] text-slate-900">
          Car Rentals in Palawan
        </Text>
      </View>

      <View className="px-5 pb-3">
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search rental providers or vehicles"
          accessibilityLabel="Search car rentals"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 42, flexGrow: 0, flexShrink: 0 }}
        contentContainerStyle={{
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 20,
        }}
      >
        {CATEGORIES.map((item) => {
          const selected = category === item;
          return (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setCategory(item)}
              className={`h-8 justify-center rounded-full border px-4 ${
                selected
                  ? "border-[#4F9B8F] bg-[#4F9B8F]"
                  : "border-slate-200 bg-slate-100"
              }`}
            >
              <Text
                className={`font-poppins-medium text-[12px] ${
                  selected ? "text-white" : "text-slate-700"
                }`}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{
          width: "100%",
          maxWidth: 720,
          alignSelf: "center",
          gap: 16,
          paddingHorizontal: 20,
          paddingBottom: 40,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        {providers.length ? (
          providers.map((provider) => (
            <CarRentalCard
              key={provider.id}
              provider={provider}
              onPress={() =>
                router.push({
                  pathname: "/car-rentals/[id]",
                  params: { id: provider.id },
                })
              }
            />
          ))
        ) : (
          <View className="items-center px-6 pt-12">
            <Text className="text-center font-poppins-semibold text-[15px] text-slate-800">
              No rentals found
            </Text>
            <Text className="mt-2 text-center font-poppins text-[13px] text-slate-500">
              Try another search or vehicle category.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-4 rounded-full border border-slate-200 px-4 py-2 active:opacity-70"
            >
              <Text className="font-poppins-medium text-[13px] text-slate-700">
                Clear filters
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
