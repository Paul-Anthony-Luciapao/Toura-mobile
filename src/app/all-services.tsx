import { safeBack } from "@/lib/navigation";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, type Href } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: Href;
};

const SERVICES: ServiceItem[] = [
  {
    id: "activities",
    title: "Activities",
    description: "Island tours, lagoons, and local adventures",
    icon: "compass-outline",
    route: "/activities",
  },
  {
    id: "hotels",
    title: "Hotels",
    description: "Find a place to stay across Palawan",
    icon: "bed-outline",
    route: "/hotels",
  },
  {
    id: "car-rentals",
    title: "Car rentals",
    description: "Compare local cars and rental options",
    icon: "car-sport-outline",
    route: "/car-rentals",
  },
  {
    id: "esims",
    title: "eSIM guide",
    description: "Get ready to stay connected on your trip",
    icon: "cellular-outline",
    route: "/esim",
  },
  {
    id: "tour-packages",
    title: "Tour packages",
    description: "Browse curated Palawan experiences",
    icon: "map-outline",
    route: "/tours",
  },
  {
    id: "itineraries",
    title: "Itineraries",
    description: "Explore trip ideas and travel plans",
    icon: "calendar-outline",
    route: "/itinerary-packages",
  },
  {
    id: "restaurants",
    title: "Restaurants",
    description: "Local food recommendations",
    icon: "restaurant-outline",
  },
  {
    id: "travel-insurance",
    title: "Travel insurance",
    description: "Coverage information for your journey",
    icon: "shield-checkmark-outline",
  },
  {
    id: "bike-rentals",
    title: "Bike rentals",
    description: "Two-wheel options for getting around",
    icon: "bicycle-outline",
  },
  {
    id: "tickets",
    title: "Tickets",
    description: "Attractions and transport tickets",
    icon: "ticket-outline",
  },
  {
    id: "tour-guide",
    title: "Local guides",
    description: "Get help from people who know Palawan",
    icon: "people-outline",
  },
];

export default function AllServices() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SERVICES;
    return SERVICES.filter(
      (service) =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: insets.bottom + 28 }}
      >
        <LinearGradient
          colors={["#E5F4F0", "#F8FAFC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top + 10, paddingBottom: 22 }}
        >
          <View className="flex-row items-center px-5">
            <Pressable
              onPress={() => safeBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={10}
              className="h-10 w-10 items-center justify-center rounded-full bg-white"
            >
              <Ionicons name="chevron-back" size={20} color="#0f172a" />
            </Pressable>
            <Text className="ml-3 font-poppins-semibold text-[19px] text-slate-900">
              All services
            </Text>
          </View>

          <View className="px-5 pt-6">
            <Text className="font-poppins-semibold text-[26px] leading-9 text-slate-900">
              Make your Palawan trip easier
            </Text>
            <Text className="mt-2 font-poppins text-[13px] leading-5 text-slate-600">
              Explore places to stay, things to do, and helpful travel tools.
            </Text>

            <View className="mt-5 h-12 flex-row items-center rounded-2xl border border-slate-100 bg-white px-4">
              <Ionicons name="search-outline" size={19} color="#64748b" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search services"
                placeholderTextColor="#94a3b8"
                accessibilityLabel="Search services"
                returnKeyType="search"
                className="ml-2 flex-1 font-poppins text-[13px] text-slate-900"
              />
              {searchQuery.length > 0 && (
                <Pressable
                  onPress={() => setSearchQuery("")}
                  accessibilityRole="button"
                  accessibilityLabel="Clear search"
                  hitSlop={8}
                >
                  <Ionicons name="close-circle" size={18} color="#94a3b8" />
                </Pressable>
              )}
            </View>
          </View>
        </LinearGradient>

        <View
          className="w-full px-5 pt-1"
          style={{ maxWidth: 900, alignSelf: "center" }}
        >
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="font-poppins-semibold text-[17px] text-slate-900">
              Explore services
            </Text>
            <Text className="font-poppins text-[11px] text-slate-500">
              {filteredServices.length} options
            </Text>
          </View>

          {filteredServices.length > 0 ? (
            <View className="flex-row flex-wrap justify-between">
              {filteredServices.map((service) => {
                const available = Boolean(service.route);
                return (
                  <Pressable
                    key={service.id}
                    onPress={() => {
                      if (service.route) {
                        router.push(service.route);
                      }
                    }}
                    disabled={!available}
                    accessibilityRole="button"
                    accessibilityState={{ disabled: !available }}
                    className="mb-3 min-h-[158px] w-[48.5%] rounded-2xl border border-slate-100 bg-white p-4"
                  >
                    <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#E9F7F5]">
                      <Ionicons name={service.icon} size={21} color="#0f766e" />
                    </View>
                    <View className="mt-3 flex-row items-center justify-between">
                      <Text className="flex-1 font-poppins-semibold text-[13px] text-slate-900">
                        {service.title}
                      </Text>
                      <Ionicons
                        name={available ? "arrow-forward" : "lock-closed-outline"}
                        size={14}
                        color={available ? "#0f766e" : "#94a3b8"}
                      />
                    </View>
                    <Text className="mt-1 font-poppins text-[11px] leading-4 text-slate-500">
                      {service.description}
                    </Text>
                    <Text
                      className="mt-2 font-poppins-medium text-[10px]"
                      style={{ color: available ? "#0f766e" : "#64748b" }}
                    >
                      {available ? "Explore now" : "Coming soon"}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <View className="items-center rounded-2xl border border-slate-100 bg-white px-6 py-10">
              <Ionicons name="search-outline" size={26} color="#94a3b8" />
              <Text className="mt-3 font-poppins-semibold text-[14px] text-slate-800">
                No services found
              </Text>
              <Text className="mt-1 text-center font-poppins text-[12px] leading-5 text-slate-500">
                Try another search, like hotels, activities, or eSIM.
              </Text>
            </View>
          )}

          <View className="mt-2 flex-row items-start rounded-2xl bg-[#E9F7F5] p-4">
            <Ionicons name="sparkles-outline" size={19} color="#0f766e" />
            <View className="ml-3 flex-1">
              <Text className="font-poppins-semibold text-[13px] text-slate-900">
                Your Palawan trip, all in one place
              </Text>
              <Text className="mt-1 font-poppins text-[11px] leading-4 text-slate-600">
                More local services are on the way. Check back as we add new ways to plan your stay.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
