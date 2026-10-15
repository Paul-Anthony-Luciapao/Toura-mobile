import Buttons from "@/components/buttons/Buttons";
import { INITIAL_TOURIST_SPOTS, PAYMENT_METHODS } from "@/data/mockData";
import type { PaymentMethod } from "@/data/types";
import { colors } from "@/styles/global";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CARD_FIELDS = [
  { key: "name", label: "Name on Card", placeholder: "Enter name on card" },
  { key: "number", label: "Card Number", placeholder: "Enter card number" },
  { key: "expiry", label: "Expiry Date", placeholder: "MM/YY" },
  { key: "cvv", label: "CVV", placeholder: "Enter CVV" },
] as const;

type CardField = (typeof CARD_FIELDS)[number]["key"];
type CardDetails = Record<CardField, string>;

const INITIAL_CARD_DETAILS: CardDetails = {
  name: "",
  number: "",
  expiry: "",
  cvv: "",
};

function getParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function CardMethodLogo({
  method,
}: Readonly<{ method: PaymentMethod | undefined }>) {
  if (!method) return null;

  if (method.iconType === "svg") {
    const Icon = method.icon;
    return <Icon width={40} height={28} />;
  }

  if (method.iconType === "ionicon") {
    const Icon = method.icon;
    return <Icon name={method.iconName} size={28} color={colors.primary} />;
  }

  return null;
}

export default function CardDetailsScreen() {
  const params = useLocalSearchParams<{
    id?: string | string[];
    guestCount?: string | string[];
    arrivalDate?: string | string[];
    arrivalTime?: string | string[];
    departureDate?: string | string[];
    departureTime?: string | string[];
    paymentMethod?: string | string[];
    paymentMethodName?: string | string[];
  }>();

  const packageId = getParam(params.id);
  const paymentMethodId = getParam(params.paymentMethod);
  const paymentMethodName = getParam(params.paymentMethodName) ?? "Card";
  const itinerary = INITIAL_TOURIST_SPOTS.find(
    (spot) => String(spot.id) === String(packageId),
  );
  const selectedMethod = PAYMENT_METHODS.find(
    (method) => method.id === paymentMethodId,
  );

  const [cardDetails, setCardDetails] =
    useState<CardDetails>(INITIAL_CARD_DETAILS);
  const [editingField, setEditingField] = useState<CardField | null>(null);
  const [draftValue, setDraftValue] = useState("");

  if (!itinerary || !packageId || !selectedMethod) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Payment method or itinerary not found.
        </Text>
      </SafeAreaView>
    );
  }

  const openEditor = (field: CardField) => {
    setEditingField(field);
    setDraftValue(cardDetails[field]);
  };

  const closeEditor = () => {
    setEditingField(null);
    setDraftValue("");
  };

  const saveEditedField = () => {
    if (!editingField) return;

    let value = draftValue.trim();
    if (editingField === "number") {
      value = value.replace(/\D/g, "").slice(0, 19);
    }
    if (editingField === "expiry") value = formatExpiry(value);
    if (editingField === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    setCardDetails((current) => ({ ...current, [editingField]: value }));
    closeEditor();
  };

  const continueToOtp = () => {
    const missingFields = CARD_FIELDS.filter(
      (field) => !cardDetails[field.key].trim(),
    ).map((field) => field.label);

    if (missingFields.length > 0) {
      Alert.alert(
        "Card details required",
        `Please enter: ${missingFields.join(", ")}.`,
      );
      return;
    }

    const cardNumber = cardDetails.number.replace(/\D/g, "");
    if (cardNumber.length < 12) {
      Alert.alert("Invalid card number", "Enter at least 12 digits.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
      Alert.alert("Invalid expiry date", "Use MM/YY format.");
      return;
    }

    if (cardDetails.cvv.length < 3) {
      Alert.alert("Invalid CVV", "Enter 3 or 4 digits.");
      return;
    }

    router.push({
      pathname: "/itinerary-packages/[id]/otp",
      params: {
        id: packageId,
        guestCount: getParam(params.guestCount) ?? "1",
        arrivalDate: getParam(params.arrivalDate),
        arrivalTime: getParam(params.arrivalTime),
        departureDate: getParam(params.departureDate),
        departureTime: getParam(params.departureTime),
        paymentMethod: selectedMethod.id,
        paymentMethodName: selectedMethod.name,
        cardLast4: cardNumber.slice(-4),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 24 }}
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

        <View className="-mt-5 rounded-t-[30px] bg-white px-5 pb-8 pt-5">
          <View className="mb-5 flex-row items-center gap-3">
            <CardMethodLogo method={selectedMethod} />
            <Text className="font-poppins-semibold text-xl text-textMain">
              {paymentMethodName}
            </Text>
          </View>

          <Text className="mb-4 font-poppins text-sm text-slate-500">
            Demo checkout only. No payment will be charged and card details
            aren&apos;t saved or sent.
          </Text>

          {CARD_FIELDS.map((field) => {
            const value = cardDetails[field.key];
            const visibleValue =
              field.key === "number" && value
                ? `•••• •••• •••• ${value.slice(-4)}`
                : value || "Not provided";

            return (
              <View key={field.key} className="mb-4">
                <Text className="mb-1 font-poppins text-xs text-slate-500">
                  {field.label}
                </Text>
                <View className="flex-row items-center rounded-xl border border-slate-200 bg-teal-50 px-3 py-2">
                  <Text
                    numberOfLines={1}
                    className={`flex-1 font-poppins text-sm ${
                      value ? "text-textMain" : "text-slate-400"
                    }`}
                  >
                    {visibleValue}
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Edit ${field.label}`}
                    onPress={() => openEditor(field.key)}
                    className="ml-3 flex-row items-center gap-1 p-1"
                  >
                    <Text className="font-poppins-medium text-sm text-primary">
                      Edit
                    </Text>
                    <Ionicons
                      name="pencil-outline"
                      size={15}
                      color={colors.primary}
                    />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View className="bg-background px-4 py-3">
        <Buttons title="Continue" onPress={continueToOtp} width="w-full" />
      </View>

      <Modal
        visible={editingField !== null}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeEditor}
      >
        <View className="flex-1 justify-end">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close card editor"
            className="absolute inset-0 bg-black/40"
            onPress={closeEditor}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View className="rounded-t-[28px] bg-white px-5 pb-8 pt-4">
              <View className="mb-5 items-center">
                <View className="h-1.5 w-12 rounded-full bg-slate-300" />
              </View>
              <Text className="mb-4 text-center font-poppins-semibold text-lg text-textMain">
                Edit {CARD_FIELDS.find((field) => field.key === editingField)?.label}
              </Text>
              <TextInput
                autoFocus
                value={draftValue}
                onChangeText={(value) => {
                  if (editingField === "number") {
                    setDraftValue(formatCardNumber(value));
                  } else if (editingField === "expiry") {
                    setDraftValue(formatExpiry(value));
                  } else if (editingField === "cvv") {
                    setDraftValue(value.replace(/\D/g, "").slice(0, 4));
                  } else {
                    setDraftValue(value);
                  }
                }}
                placeholder={
                  CARD_FIELDS.find((field) => field.key === editingField)
                    ?.placeholder
                }
                placeholderTextColor="#94A3B8"
                keyboardType={
                  editingField === "number" ||
                  editingField === "expiry" ||
                  editingField === "cvv"
                    ? "number-pad"
                    : "default"
                }
                secureTextEntry={editingField === "cvv"}
                autoCapitalize={editingField === "name" ? "words" : "none"}
                className="rounded-xl border border-primary bg-white px-4 py-4 font-poppins text-base text-textMain"
              />
              <View className="mt-6 flex-row gap-3">
                <Pressable
                  onPress={closeEditor}
                  className="flex-1 items-center justify-center rounded-xl border border-slate-300 py-4"
                >
                  <Text className="font-poppins-semibold text-textMain">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={saveEditedField}
                  className="flex-1 items-center justify-center rounded-xl bg-primary py-4"
                >
                  <Text className="font-poppins-semibold text-white">
                    Confirm
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
