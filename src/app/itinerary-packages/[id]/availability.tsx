import Button from "@/components/buttons/Buttons";
import { INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import type { TimePickerSettings } from "@/data/types";
import { colors } from "@/styles/global";
import AvailabilityCard from "@components/itineraries/itinerary-packages/availability/AvailabilityCard";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AvailabilityScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();

  const [arrivalDate, setArrivalDate] = useState(() => new Date());
  const [arrivalTime, setArrivalTime] = useState(() => new Date());
  const [departureDate, setDepartureDate] = useState(() => new Date());
  const [departureTime, setDepartureTime] = useState(() => new Date());

  const timePickerSettings: TimePickerSettings = {
    hourCycle: 12,
    minuteInterval: 1,
  };

  const packageId = Array.isArray(id) ? id[0] : id;

  const index = INITIAL_TOURIST_SPOTS.findIndex(
    (spot) => String(spot.id) === String(packageId),
  );
  const itinerary = INITIAL_TOURIST_SPOTS[index];

  if (!packageId || !itinerary) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center bg-background"
        edges={["top"]}>
        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Itinerary package not found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-6">
        <ItineraryHero itinerary={itinerary} />

        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-4 top-4 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70">
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>

        <View className="-mt-5 w-full rounded-t-3xl bg-white pt-2">
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

      <View className="bg-background px-4 py-3">
        <Button
          title="Continue"
          onPress={() =>
            router.push({
              pathname: "/itinerary-packages/[id]/verification",
              params: {
                id: packageId,
                arrivalDate: arrivalDate.toISOString(),
                arrivalTime: arrivalTime.toISOString(),
                departureDate: departureDate.toISOString(),
                departureTime: departureTime.toISOString(),
              },
            })
          }
          className="w-full"
        />
      </View>
    </SafeAreaView>
  );
}
