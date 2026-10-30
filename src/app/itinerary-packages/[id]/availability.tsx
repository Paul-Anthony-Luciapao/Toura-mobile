import { PACKAGE_SPOTS } from "@/data/mockData";
import type { TimePickerSettings } from "@/data/types";
import { colors } from "@/styles/global";
import AvailabilityCard from "@components/itineraries/itinerary-packages/availability/AvailabilityCard";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Alert,
    LayoutChangeEvent,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const toLocalDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export default function AvailabilityScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();

  const [arrivalDate, setArrivalDate] = useState(() => new Date());
  const [arrivalTime, setArrivalTime] = useState(() => new Date());
  const [departureDate, setDepartureDate] = useState(() => new Date());
  const [departureTime, setDepartureTime] = useState(() => new Date());

  const [statusBarStyle, setStatusBarStyle] = useState<"light" | "dark">(
    "light",
  );

  const [heroHeight, setHeroHeight] = useState(0);

  const timePickerSettings: TimePickerSettings = {
    hourCycle: 12,
    minuteInterval: 1,
  };

  const packageId = Array.isArray(id) ? id[0] : id;

  const index = PACKAGE_SPOTS.findIndex(
    (spot) => String(spot.id) === String(packageId),
  );

  const itinerary = PACKAGE_SPOTS[index];

  // Measure the actual rendered hero height.
  const handleHeroLayout = (event: LayoutChangeEvent) => {
    setHeroHeight(event.nativeEvent.layout.height);
  };

  // The white panel overlaps the hero by 20 points (-mt-5).
  const panelTop = Math.max(0, heroHeight - 20);

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } };
  }) => {
    if (heroHeight <= 0) return;

    const scrollY = Math.max(0, event.nativeEvent.contentOffset.y);

    // White icons over the hero; dark icons once the white panel
    // reaches the top of the screen.
    const nextStyle: "light" | "dark" = scrollY >= panelTop ? "dark" : "light";

    setStatusBarStyle((current) =>
      current === nextStyle ? current : nextStyle,
    );
  };

  if (!packageId || !itinerary) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center bg-background"
        edges={["top"]}
      >
        <StatusBar style="dark" />

        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Itinerary package not found.
        </Text>

        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          className="mt-4 rounded-xl bg-primary px-5 py-3"
        >
          <Text className="font-poppins-medium text-white">Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const handleContinue = () => {
    // Compare local calendar dates so timezone offsets cannot turn a selected day into another date.
    if (toLocalDate(departureDate) <= toLocalDate(arrivalDate)) {
      Alert.alert(
        "Invalid travel dates",
        "Choose a valid departure date after your arrival date.",
      );
      return;
    }

    router.push({
      pathname: "/itinerary-packages/[id]/verification",
      params: {
        id: packageId,
        arrivalDate: arrivalDate.toISOString(),
        arrivalTime: arrivalTime.toISOString(),
        departureDate: departureDate.toISOString(),
        departureTime: departureTime.toISOString(),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      {/* White icons over the hero; dark icons over the white panel */}
      <StatusBar style={statusBarStyle} animated />

      <View className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="pb-6"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Measure the actual hero height */}
          <View onLayout={handleHeroLayout}>
            <ItineraryHero itinerary={itinerary} />
          </View>

          {/* Back button over the hero image */}
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="absolute left-4 top-12 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </Pressable>

          {/* Rounded white content panel */}
          <View className="-mt-5 w-full overflow-hidden rounded-t-3xl bg-white pt-2">
            <View className="flex-row items-center justify-between p-4">
              <Text className="font-poppins-semibold text-[24px] text-textMain">
                Time and Date
              </Text>

              <Text className="font-poppins text-[12px] text-textMuted">
                Step 1 of 4
              </Text>
            </View>

            <View className="pl-5">
              <Text className="font-poppins text-[10px] leading-[25px] text-textMain">
                Set your time and date of Arrival and Departure
              </Text>
            </View>

            <AvailabilityCard
              arrivalDate={arrivalDate}
              arrivalTime={arrivalTime}
              departureDate={departureDate}
              departureTime={departureTime}
              timePickerSettings={timePickerSettings}
              onArrivalDateChange={setArrivalDate}
              onArrivalTimeChange={setArrivalTime}
              onDepartureDateChange={setDepartureDate}
              onDepartureTimeChange={setDepartureTime}
            />
          </View>
        </ScrollView>

        {/* Fixed bottom Continue button */}
        <View className="items-center justify-center bg-background px-4 py-4">
          <Pressable
            onPress={handleContinue}
            accessibilityRole="button"
            className="h-14 w-full items-center justify-center rounded-2xl bg-salmon-600 active:opacity-80"
          >
            <Text className="text-center font-poppins-medium text-lg text-white">
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
