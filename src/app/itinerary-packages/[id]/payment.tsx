import Buttons from "@/components/buttons/Buttons";
import { INITIAL_TOURIST_SPOTS, PAYMENT_METHODS } from "@/data/mockData";
import type { PaymentMethod } from "@/data/types";
import { colors } from "@/styles/global";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CARD_METHODS = ["card", "jcb", "visa"] as const;
type CardMethodId = (typeof CARD_METHODS)[number];

const WALLET_METHODS = [
  { id: "gcash", label: "GCash", initials: "G", color: "#007DFF" },
  { id: "paymaya", label: "PayMaya", initials: "M", color: "#00A86B" },
] as const;

type WalletMethodId = (typeof WALLET_METHODS)[number]["id"];
type SelectedMethod = CardMethodId | WalletMethodId | null;

function getParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function PaymentMethodIcon({ method }: Readonly<{ method: PaymentMethod }>) {
  if (method.iconType === "ionicon") {
    const Icon = method.icon;
    return <Icon name={method.iconName} size={23} color={colors.primary} />;
  }

  if (method.iconType === "svg") {
    const Icon = method.icon;
    return <Icon width={32} height={24} />;
  }

  return null;
}

export default function Payment() {
  const params = useLocalSearchParams<{
    id?: string | string[];
    guestCount?: string | string[];
    arrivalDate?: string | string[];
    arrivalTime?: string | string[];
    departureDate?: string | string[];
    departureTime?: string | string[];
  }>();

  const packageId = getParam(params.id);
  const itinerary = INITIAL_TOURIST_SPOTS.find(
    (spot) => String(spot.id) === String(packageId),
  );
  const [selectedMethod, setSelectedMethod] = useState<SelectedMethod>(null);
  const [walletExpanded, setWalletExpanded] = useState(false);

  if (!itinerary || !packageId) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Itinerary package not found.
        </Text>
      </SafeAreaView>
    );
  }

  const goToOtp = (methodId: string, methodName: string) => {
    router.push({
      pathname: "/itinerary-packages/[id]/otp",
      params: {
        id: packageId,
        guestCount: getParam(params.guestCount) ?? "1",
        arrivalDate: getParam(params.arrivalDate),
        arrivalTime: getParam(params.arrivalTime),
        departureDate: getParam(params.departureDate),
        departureTime: getParam(params.departureTime),
        paymentMethod: methodId,
        paymentMethodName: methodName,
      },
    });
  };

  const continueWithSelection = () => {
    if (!selectedMethod) {
      Alert.alert("Select a payment method", "Choose how you want to pay.");
      return;
    }

    const walletMethod = WALLET_METHODS.find(
      (method) => method.id === selectedMethod,
    );
    if (walletMethod) {
      goToOtp(walletMethod.id, walletMethod.label);
      return;
    }

    const cardMethod = PAYMENT_METHODS.find(
      (method) => method.id === selectedMethod,
    );
    if (cardMethod) {
      router.push({
        pathname: "/itinerary-packages/[id]/card-details",
        params: {
          id: packageId,
          guestCount: getParam(params.guestCount) ?? "1",
          arrivalDate: getParam(params.arrivalDate),
          arrivalTime: getParam(params.arrivalTime),
          departureDate: getParam(params.departureDate),
          departureTime: getParam(params.departureTime),
          paymentMethod: cardMethod.id,
          paymentMethodName: cardMethod.name,
        },
      });
    }
  };

  const renderRadio = (checked: boolean) => (
    <View
      className={`h-6 w-6 items-center justify-center rounded-full border ${
        checked ? "border-primary" : "border-slate-200"
      } bg-white`}>
      {checked && <View className="h-3 w-3 rounded-full bg-primary" />}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}>
        <ItineraryHero itinerary={itinerary} />

        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-4 top-4 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70">
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>

        <View className="-mt-5 min-h-[520px] rounded-t-[30px] bg-white px-5 pb-8 pt-5">
          <Text className="mb-6 font-poppins-semibold text-2xl leading-8 text-textMain">
            Select Payment{"\n"}Method
          </Text>

          <View className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <View className="gap-5">
              {PAYMENT_METHODS.map((method) => {
                const isWallet = method.id === "ewallet";
                const isSelected = isWallet
                  ? selectedMethod === "gcash" || selectedMethod === "paymaya"
                  : selectedMethod === method.id;

                return (
                  <View key={method.id}>
                  <Pressable
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSelected }}
                    onPress={() => {
                      if (isWallet) {
                        setWalletExpanded((expanded) => !expanded);
                        if (
                          selectedMethod !== "gcash" &&
                          selectedMethod !== "paymaya"
                        ) {
                          setSelectedMethod(null);
                        }
                        return;
                      }

                      if (CARD_METHODS.includes(method.id as CardMethodId)) {
                        setSelectedMethod(method.id as CardMethodId);
                        setWalletExpanded(false);
                      }
                    }}
                    className="h-11 flex-row items-center rounded-xl bg-teal-50 px-4">
                    <View className="w-10 items-start justify-center">
                      <PaymentMethodIcon method={method} />
                    </View>
                    <Text className="ml-2 flex-1 font-poppins-medium text-base text-textMain">
                      {method.name}
                    </Text>
                    {renderRadio(isSelected)}
                  </Pressable>

                  {isWallet && walletExpanded && (
                    <View className="ml-8 mt-2 gap-2">
                      {WALLET_METHODS.map((wallet) => {
                        const walletSelected = selectedMethod === wallet.id;

                        return (
                          <Pressable
                            key={wallet.id}
                            accessibilityRole="radio"
                            accessibilityState={{ checked: walletSelected }}
                            onPress={() => setSelectedMethod(wallet.id)}
                            className="h-11 flex-row items-center rounded-xl border border-teal-100 bg-white px-4">
                            <View
                              className="mr-3 h-7 w-7 items-center justify-center rounded-md"
                              style={{ backgroundColor: wallet.color }}>
                              <Text className="font-poppins-semibold text-sm text-white">
                                {wallet.initials}
                              </Text>
                            </View>
                            <Text className="flex-1 font-poppins-medium text-base text-textMain">
                              {wallet.label}
                            </Text>
                            {renderRadio(walletSelected)}
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="bg-white px-5 py-3">
        <Buttons
          title="Continue"
          onPress={continueWithSelection}
          width="w-full"
        />
      </View>
    </SafeAreaView>
  );
}
