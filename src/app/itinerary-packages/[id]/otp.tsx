import Otp from "@/components/itineraries/itinerary-packages/otp/Otp";
import { PACKAGE_SPOTS } from "@/data/mockData";
import { colors } from "@/styles/global";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function OtpScreen() {
  const params = useLocalSearchParams<{
    id?: string | string[];
    bookingId?: string | string[];
    bookingReference?: string | string[];
    totalPrice?: string | string[];
    guestCount?: string | string[];
    arrivalDate?: string | string[];
    arrivalTime?: string | string[];
    departureDate?: string | string[];
    departureTime?: string | string[];
    cardLast4?: string | string[];
    paymentMethod?: string | string[];
    paymentMethodName?: string | string[];
  }>();

  const packageId = getParam(params.id);

  const itinerary = PACKAGE_SPOTS.find(
    (spot) => String(spot.id) === String(packageId),
  );

  const handleVerify = () => {
    if (!packageId) {
      return;
    }

    router.replace({
      pathname: "/itinerary-packages/[id]/success",
      params: {
        id: packageId,
        bookingId: getParam(params.bookingId) ?? "",
        bookingReference: getParam(params.bookingReference) ?? "",
        totalPrice: getParam(params.totalPrice) ?? "",
        guestCount: getParam(params.guestCount) ?? "1",
        arrivalDate: getParam(params.arrivalDate) ?? "",
        arrivalTime: getParam(params.arrivalTime) ?? "",
        departureDate: getParam(params.departureDate) ?? "",
        departureTime: getParam(params.departureTime) ?? "",
        cardLast4: getParam(params.cardLast4) ?? "",
        paymentMethod: getParam(params.paymentMethod) ?? "",
        paymentMethodName: getParam(params.paymentMethodName) ?? "",
      },
    });
  };

  if (!itinerary || !packageId) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="font-poppins-semibold text-base text-textMain">
          Itinerary package not found.
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="mt-4 rounded-xl bg-primary px-5 py-3"
        >
          <Text className="font-poppins-medium text-white">Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <StatusBar
        hidden={false}
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ItineraryHero itinerary={itinerary} />

        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-4 top-4 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30"
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>

        {/* White content with rounded top corners */}
        <View className="mt-[-24px] rounded-t-3xl bg-white px-5 pt-6 pb-10 overflow-hidden">
          <Otp onVerify={handleVerify} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
