import Buttons from "@/components/buttons/Buttons";
import { INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import { colors } from "@/styles/global";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import PaymentCard from "@components/itineraries/PaymentCard";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
  const { id } = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const packageId = Array.isArray(id) ? id[0] : id;

  const itinerary = INITIAL_TOURIST_SPOTS.find(
    (spot) => String(spot.id) === String(packageId),
  );

  if (!itinerary) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Itinerary package not found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <ItineraryHero itinerary={itinerary} />

        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-4 top-4 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70"
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>
      </ScrollView>

      <View className="absolute z-10 left-0 bottom-0 right-0 top-72 w-full bg-white rounded-3xl">
        <View className="p-4">
          <Text className="font-poppins-semibold text-2xl">
            Selected Payment{"\n"}Method
          </Text>
        </View>

        <PaymentCard />
      </View>

      <View className="mt-auto pb-6">
        <Buttons
          title="Continue"
          onPress={() => {
            router.push(`/itinerary-packages/${packageId}/payment`);
          }}
          width="w-[225px]"
          className="self-center w-[355px]"
        />
      </View>
    </SafeAreaView>
  );
}
