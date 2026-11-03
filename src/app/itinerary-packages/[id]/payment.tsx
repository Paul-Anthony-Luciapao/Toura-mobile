import Buttons from "@/components/buttons/Buttons";
import { PACKAGE_SPOTS, PAYMENT_METHODS } from "@/data/mockData";
import type { PaymentMethod } from "@/data/types";
import { getErrorMessage } from "@/services/api";
import {
  createCheckout,
  getCheckoutFailureReason,
  getPaymentStatus,
  type PaymentFailureReason,
} from "@/services/payment";
import { colors } from "@/styles/global";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CARD_METHODS = ["card", "jcb", "visa"] as const;
type CardMethodId = (typeof CARD_METHODS)[number];

const WALLET_METHODS = [
  { id: "gcash", label: "GCash", initials: "G", color: "#007DFF" },
  { id: "paymaya", label: "PayMaya", initials: "M", color: "#00A86B" },
] as const;

type WalletMethodId = (typeof WALLET_METHODS)[number]["id"];
type SelectedMethod = CardMethodId | WalletMethodId | null;
type PaymentResultKind = PaymentFailureReason | "paid";

type PaymentResult = Readonly<{
  kind: PaymentResultKind;
  orderId?: number;
}>;

const PAYMENT_RESULT_CONTENT: Record<
  PaymentResultKind,
  Readonly<{
    title: string;
    message: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
    primaryLabel: string;
  }>
> = {
  invalid_card_details: {
    title: "Invalid Card Details",
    message:
      "PayMongo could not verify the card details. Check them in checkout and try again.",
    icon: "card-outline",
    primaryLabel: "Try a different card",
  },
  expired_card: {
    title: "Expired Card",
    message: "This card has expired. Use another card to continue.",
    icon: "card-outline",
    primaryLabel: "Try another card",
  },
  insufficient_funds: {
    title: "Insufficient Funds",
    message:
      "The card issuer reported insufficient funds. Try a different card.",
    icon: "card-outline",
    primaryLabel: "Try a different card",
  },
  payment_declined: {
    title: "Payment Declined",
    message:
      "The payment provider or card issuer declined this payment. Try a different card.",
    icon: "business-outline",
    primaryLabel: "Try a different card",
  },
  authentication_failed: {
    title: "Authentication Failed",
    message:
      "The bank could not authenticate this payment. Retry authentication or use another card.",
    icon: "lock-closed-outline",
    primaryLabel: "Retry payment",
  },
  connection_timeout: {
    title: "Connection Timeout",
    message:
      "We couldn't confirm the payment status. Check your booking before trying again to avoid paying twice.",
    icon: "cloud-offline-outline",
    primaryLabel: "Check payment status",
  },
  duplicate_payment: {
    title: "Duplicate Payment Detected",
    message:
      "This booking may already be paid. Check its status before attempting another payment.",
    icon: "copy-outline",
    primaryLabel: "View my booking",
  },
  paid: {
    title: "Payment Successful",
    message: "Your payment is confirmed and your itinerary booking is confirmed.",
    icon: "checkmark-circle-outline",
    primaryLabel: "View my itinerary",
  },
};

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

function PaymentResultScreen({
  result,
  isProcessing,
  onPrimaryPress,
  onCancel,
}: Readonly<{
  result: PaymentResult;
  isProcessing: boolean;
  onPrimaryPress: () => void;
  onCancel: () => void;
}>) {
  const content = PAYMENT_RESULT_CONTENT[result.kind];
  const primaryLabel =
    result.kind === "connection_timeout" && !result.orderId
      ? "Check my bookings"
      : content.primaryLabel;

  return (
    <SafeAreaView className="flex-1 bg-background px-6">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 items-center justify-center">
        <View className="mb-5 h-16 w-16 items-center justify-center rounded-full border-2 border-primary">
          <Ionicons name={content.icon} size={30} color={colors.primary} />
        </View>
        <Text className="text-center font-poppins-semibold text-xl text-textMain">
          {content.title}
        </Text>
        <Text className="mt-3 max-w-sm text-center font-poppins text-sm leading-6 text-slate-600">
          {content.message}
        </Text>
      </View>

      <View className="gap-3 pb-5">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={primaryLabel}
          accessibilityState={{ disabled: isProcessing }}
          disabled={isProcessing}
          onPress={onPrimaryPress}
          className={`items-center rounded-xl bg-salmon-600 py-4 ${
            isProcessing ? "opacity-60" : "active:opacity-80"
          }`}
        >
          <Text className="font-poppins-semibold text-white">
            {isProcessing ? "Checking..." : primaryLabel}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancel and view bookings"
          onPress={onCancel}
          className="items-center rounded-xl bg-teal-50 py-4 active:opacity-80"
        >
          <Text className="font-poppins-medium text-primary">
            Cancel
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default function Payment() {
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
  }>();

  const packageId = getParam(params.id);

  const itinerary = PACKAGE_SPOTS.find(
    (spot) => String(spot.id) === String(packageId),
  );

  const [selectedMethod, setSelectedMethod] = useState<SelectedMethod>(null);

  const [walletExpanded, setWalletExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
    null,
  );

  if (!itinerary || !packageId) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <StatusBar barStyle="dark-content" />

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
        bookingId: getParam(params.bookingId),
        bookingReference: getParam(params.bookingReference),
        totalPrice: getParam(params.totalPrice),
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

  const verifyPaymentStatus = async (orderId: number) => {
    setIsProcessing(true);
    try {
      let paymentStatus = "pending";
      let failureReason: PaymentFailureReason | null = null;

      for (let attempt = 0; attempt < 6; attempt += 1) {
        const status = await getPaymentStatus(orderId);
        paymentStatus = status.payment_status;
        failureReason = status.failure_reason;

        if (paymentStatus !== "pending") {
          break;
        }

        if (attempt < 5) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      if (paymentStatus === "paid") {
        setPaymentResult({ kind: "paid", orderId });
      } else if (paymentStatus === "failed") {
        setPaymentResult({
          kind: failureReason ?? "payment_declined",
          orderId,
        });
      } else {
        setPaymentResult({ kind: "connection_timeout", orderId });
      }
    } catch {
      setPaymentResult({ kind: "connection_timeout", orderId });
    } finally {
      setIsProcessing(false);
    }
  };

  const continueWithSelection = async () => {
    if (isProcessing) {
      return;
    }

    if (!selectedMethod) {
      Alert.alert("Select a payment method", "Choose how you want to pay.");
      return;
    }

    const bookingId = Number(getParam(params.bookingId));

    if (!Number.isFinite(bookingId) || bookingId <= 0) {
      Alert.alert("Missing booking", "Booking reference is missing.");
      return;
    }

    setIsProcessing(true);

    const paymentMethodType =
      selectedMethod === "gcash" || selectedMethod === "paymaya"
        ? selectedMethod
        : "card";

    let orderId: number;

    try {
      const checkout = await createCheckout(bookingId, paymentMethodType);
      orderId = checkout.order_id;
      await WebBrowser.openBrowserAsync(checkout.checkout_url);
    } catch (error) {
      const reason = getCheckoutFailureReason(error);

      if (reason) {
        setPaymentResult({ kind: reason });
      } else {
        Alert.alert("Unable to start checkout", getErrorMessage(error));
      }

      setIsProcessing(false);
      return;
    }

    setIsProcessing(false);
    await verifyPaymentStatus(orderId);
  };

  const handleResultPrimaryPress = () => {
    if (!paymentResult) {
      return;
    }

    if (paymentResult.kind === "paid" || paymentResult.kind === "duplicate_payment") {
      const bookingId = getParam(params.bookingId);
      if (bookingId) {
        router.replace({
          pathname: "/my-itineraries/[bookingId]",
          params: { bookingId },
        });
      } else {
        router.replace("/my-itineraries");
      }
      return;
    }

    if (paymentResult.kind === "connection_timeout") {
      if (paymentResult.orderId) {
        void verifyPaymentStatus(paymentResult.orderId);
      } else {
        router.replace("/my-itineraries");
      }
      return;
    }

    setPaymentResult(null);
    void continueWithSelection();
  };

  if (paymentResult) {
    return (
      <PaymentResultScreen
        result={paymentResult}
        isProcessing={isProcessing}
        onPrimaryPress={handleResultPrimaryPress}
        onCancel={() => router.replace("/my-itineraries")}
      />
    );
  }

  const renderRadio = (checked: boolean) => (
    <View
      className={`h-6 w-6 items-center justify-center rounded-full border ${
        checked ? "border-primary" : "border-slate-200"
      } bg-white`}
    >
      {checked && <View className="h-3 w-3 rounded-full bg-primary" />}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      >
        {/* Hero Image */}
        <View className="relative w-full">
          <ItineraryHero itinerary={itinerary} />

          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="absolute left-4 top-12 z-20 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </Pressable>
        </View>

        {/* Payment Content */}
        <View className="-mt-5 min-h-[520px] rounded-t-[30px] bg-white px-5 pb-8 pt-5">
          <Text className="mb-6 font-poppins-semibold text-2xl leading-8 text-textMain">
            Select Payment{"\n"}Method
          </Text>

          {/* Payment Methods Card */}
          <View className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <View className="gap-5">
              {PAYMENT_METHODS.map((method) => {
                const isWallet = method.id === "ewallet";

                const isSelected = isWallet
                  ? selectedMethod === "gcash" || selectedMethod === "paymaya"
                  : selectedMethod === method.id;

                return (
                  <View key={method.id}>
                    {/* Payment Method */}
                    <Pressable
                      accessibilityRole="radio"
                      accessibilityState={{
                        checked: isSelected,
                      }}
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
                      className="h-11 flex-row items-center rounded-xl bg-teal-50 px-4"
                    >
                      <View className="w-10 items-start justify-center">
                        <PaymentMethodIcon method={method} />
                      </View>

                      <Text className="ml-2 flex-1 font-poppins-medium text-base text-textMain">
                        {method.name}
                      </Text>

                      {renderRadio(isSelected)}
                    </Pressable>

                    {/* E-wallet Options */}
                    {isWallet && walletExpanded && (
                      <View className="ml-8 mt-2 gap-2">
                        {WALLET_METHODS.map((wallet) => {
                          const walletSelected = selectedMethod === wallet.id;

                          return (
                            <Pressable
                              key={wallet.id}
                              accessibilityRole="radio"
                              accessibilityState={{
                                checked: walletSelected,
                              }}
                              onPress={() => setSelectedMethod(wallet.id)}
                              className="h-11 flex-row items-center rounded-xl border border-teal-100 bg-white px-4"
                            >
                              <View
                                className="mr-3 h-7 w-7 items-center justify-center rounded-md"
                                style={{
                                  backgroundColor: wallet.color,
                                }}
                              >
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

      {/* Continue Button */}
      <View className="bg-white px-5 py-3">
        <Buttons
          title={isProcessing ? "Checking payment..." : "Continue"}
          onPress={continueWithSelection}
          disabled={isProcessing}
          width="w-full"
          className="bg-salmon-600"
        />
      </View>
    </SafeAreaView>
  );
}
