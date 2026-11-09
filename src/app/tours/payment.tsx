import { colors } from "@/styles/global";
import {
  getCheckoutFailureReason,
  createCheckout,
  getPaymentStatus,
} from "@/services/payment";
import { getErrorMessage } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PaymentState = "ready" | "pending" | "paid" | "failed";
type Method = "card" | "gcash" | "paymaya";

function getParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function TourPaymentScreen() {
  const params = useLocalSearchParams<{
    bookingId?: string | string[];
    bookingReference?: string | string[];
    amount?: string | string[];
    tourName?: string | string[];
  }>();
  const bookingId = Number(getParam(params.bookingId));
  const bookingReference = getParam(params.bookingReference);
  const amount = Number(getParam(params.amount));
  const tourName = getParam(params.tourName) ?? "Tour booking";
  const [method, setMethod] = useState<Method>("card");
  const [paymentState, setPaymentState] = useState<PaymentState>("ready");
  const [processing, setProcessing] = useState(false);
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const checkStatus = async (id: number) => {
    setProcessing(true);
    try {
      let state: PaymentState = "pending";
      for (let attempt = 0; attempt < 6; attempt += 1) {
        const status = await getPaymentStatus(id);
        if (status.payment_status === "paid") {
          state = "paid";
          break;
        }
        if (status.payment_status === "failed") {
          state = "failed";
          break;
        }
        if (attempt < 5) await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setPaymentState(state);
    } catch (error) {
      setPaymentState("pending");
      Alert.alert("Payment status unavailable", getErrorMessage(error));
    } finally {
      setProcessing(false);
    }
  };

  const beginPayment = async () => {
    if (!Number.isInteger(bookingId) || bookingId < 1) {
      Alert.alert("Booking missing", "Return to the tour and start your booking again.");
      return;
    }
    if (processing) return;
    setProcessing(true);
    try {
      const checkout = await createCheckout(bookingId, method, "tour");
      setOrderId(checkout.order_id);
      setCheckoutStarted(true);
      await WebBrowser.openBrowserAsync(checkout.checkout_url);
      setProcessing(false);
      await checkStatus(checkout.order_id);
    } catch (error) {
      setProcessing(false);
      const reason = getCheckoutFailureReason(error);
      if (reason === "duplicate_payment") {
        setPaymentState("paid");
        return;
      }
      Alert.alert("Unable to start checkout", getErrorMessage(error));
    }
  };

  const checkCurrentPaymentStatus = () => {
    if (orderId !== null) {
      void checkStatus(orderId);
    }
  };

  if (paymentState === "paid") {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-6">
        <Ionicons name="checkmark-circle" size={64} color={colors.primary} />
        <Text className="mt-4 font-poppins-semibold text-2xl text-textMain">Payment confirmed</Text>
        <Text className="mt-2 text-center font-poppins text-slate-600">
          Your tour booking {bookingReference ? `(${bookingReference}) ` : ""}is confirmed.
        </Text>
        <Pressable onPress={() => router.replace("/my-tours")} className="mt-8 w-full items-center rounded-xl bg-salmon-600 py-4">
          <Text className="font-poppins-semibold text-white">View my tour bookings</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background px-5 pt-4">
      <Pressable onPress={() => router.back()} className="mb-5 h-10 w-10 items-center justify-center rounded-full bg-white">
        <Ionicons name="chevron-back" size={22} color={colors.text} />
      </Pressable>
      <View className="rounded-2xl bg-white p-5">
        <Text className="font-poppins-semibold text-xl text-textMain">Complete tour payment</Text>
        <Text className="mt-2 font-poppins text-slate-600">{tourName}</Text>
        <Text className="mt-3 font-poppins-semibold text-lg text-primary">
          ₱{Number.isFinite(amount) ? amount.toLocaleString("en-PH") : "—"}
        </Text>
        <Text className="mt-1 font-poppins text-xs text-slate-500">
          Booking reference: {bookingReference ?? "Not available"}
        </Text>
      </View>

      <Text className="mb-3 mt-6 font-poppins-semibold text-textMain">Payment method</Text>
      {([
        ["card", "Credit or debit card"],
        ["gcash", "GCash"],
        ["paymaya", "Maya"],
      ] as const).map(([id, label]) => (
        <Pressable
          key={id}
          accessibilityRole="radio"
          accessibilityState={{
            checked: method === id,
            disabled: checkoutStarted && paymentState === "pending",
          }}
          disabled={checkoutStarted && paymentState === "pending"}
          onPress={() => setMethod(id)}
          className="mb-3 flex-row items-center justify-between rounded-xl bg-white px-4 py-4"
        >
          <Text className="font-poppins-medium text-textMain">{label}</Text>
          <Ionicons
            name={method === id ? "radio-button-on" : "radio-button-off"}
            size={22}
            color={colors.primary}
          />
        </Pressable>
      ))}

      {paymentState === "pending" && (
        <Text className="mt-3 font-poppins text-sm text-slate-600">
          Payment is not confirmed yet. Check again before starting another checkout.
        </Text>
      )}
      {paymentState === "failed" && (
        <Text className="mt-3 font-poppins text-sm text-red-600">
          The payment was not completed. You can try checkout again.
        </Text>
      )}

      <View className="mt-auto pb-5">
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: processing }}
          disabled={processing}
          onPress={() => void beginPayment()}
          className={`items-center rounded-xl bg-salmon-600 py-4 ${processing ? "opacity-60" : ""}`}
        >
          <Text className="font-poppins-semibold text-white">
            {processing
              ? "Checking payment..."
              : paymentState === "pending"
                  ? "Return to secure checkout"
                : paymentState === "failed"
                  ? "Try payment again"
                  : "Continue to secure checkout"}
          </Text>
        </Pressable>
        {paymentState === "pending" && orderId !== null ? (
          <Pressable
            disabled={processing}
            onPress={checkCurrentPaymentStatus}
            className="mt-2 items-center rounded-xl border border-primary py-3"
          >
            <Text className="font-poppins-medium text-primary">Check payment status</Text>
          </Pressable>
        ) : null}
        <Pressable onPress={() => router.replace("/my-tours")} className="mt-3 items-center py-3">
          <Text className="font-poppins-medium text-primary">View my bookings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
