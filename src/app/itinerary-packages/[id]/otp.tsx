import Buttons from "@/components/buttons/Buttons";
import { PACKAGE_SPOTS } from "@/data/mockData";
import { colors } from "@/styles/global";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
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
  const [code, setCode] = useState("");

  if (!itinerary || !packageId) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Itinerary package not found.
        </Text>
      </SafeAreaView>
    );
  }

  const confirmOtp = () => {
    if (code !== "123456") {
      Alert.alert("Incorrect demo code", "Enter 123456 to continue.");
      return;
    }

    router.replace({
      pathname: "/itinerary-packages/[id]/success",
      params: {
        id: packageId,
        bookingId: getParam(params.bookingId),
        bookingReference: getParam(params.bookingReference),
        totalPrice: getParam(params.totalPrice),
        guestCount: getParam(params.guestCount) ?? "1",
        arrivalDate: getParam(params.arrivalDate),
        arrivalTime: getParam(params.arrivalTime),
        departureDate: getParam(params.departureDate),
        departureTime: getParam(params.departureTime),
        cardLast4: getParam(params.cardLast4),
        paymentMethod: getParam(params.paymentMethod),
        paymentMethodName: getParam(params.paymentMethodName),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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

        <View className="-mt-5 px-5 pb-10">
          <View className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Text className="text-center font-poppins-semibold text-xl text-textMain">
              One-Time Password (OTP)
            </Text>
            <Text className="mt-3 text-center font-poppins text-sm text-slate-500">
              This is a demo verification screen. Enter the displayed demo code
              to continue.
            </Text>

            <View className="mt-6 flex-row justify-center gap-2">
              {Array.from({ length: 6 }, (_, index) => (
                <View
                  key={index}
                  className="h-12 w-10 items-center justify-center rounded-md bg-teal-50"
                >
                  <Text className="font-poppins-semibold text-xl text-primary">
                    {code[index] ?? ""}
                  </Text>
                </View>
              ))}
              <TextInput
                value={code}
                onChangeText={(value) =>
                  setCode(value.replace(/\D/g, "").slice(0, 6))
                }
                keyboardType="number-pad"
                maxLength={6}
                accessibilityLabel="Six digit demo OTP"
                className="absolute h-12 w-[280px] opacity-[0.02]"
              />
            </View>

            <Text className="mt-3 text-center font-poppins text-xs text-slate-500">
              Demo OTP: 123456
            </Text>

            <Pressable
              onPress={() =>
                Alert.alert(
                  "Demo OTP",
                  "No message was sent. Use 123456 to continue.",
                )
              }
              className="mt-5 items-center"
            >
              <Text className="font-poppins-medium text-sm text-primary">
                Resend demo code
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View className="bg-background px-4 py-3">
        <Buttons title="Continue" onPress={confirmOtp} width="w-full" />
      </View>
    </SafeAreaView>
  );
}
