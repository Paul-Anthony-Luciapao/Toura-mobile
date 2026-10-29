import { PACKAGE_SPOTS } from "@/data/mockData";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(value?: string) {
  if (!value) return "Not provided";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not provided";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ReceiptRow({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <View className="mb-2 flex-row items-center justify-between">
      <Text className="font-poppins text-sm text-slate-600">{label}</Text>
      <Text className="ml-3 flex-1 text-right font-poppins-medium text-sm text-textMain">
        {value}
      </Text>
    </View>
  );
}

export default function PaymentSuccessScreen() {
  const params = useLocalSearchParams<{
    id?: string | string[];
    bookingId?: string | string[];
    bookingReference?: string | string[];
    totalPrice?: string | string[];
    guestCount?: string | string[];
    arrivalDate?: string | string[];
    departureDate?: string | string[];
    cardLast4?: string | string[];
    paymentMethod?: string | string[];
    paymentMethodName?: string | string[];
  }>();

  const packageId = getParam(params.id);
  const itinerary = PACKAGE_SPOTS.find(
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

  const guestCount = Math.max(1, Number(getParam(params.guestCount)) || 1);
  const bookingReference = getParam(params.bookingReference);
  const totalPrice = Number(getParam(params.totalPrice));
  const dateRange = `${formatDate(getParam(params.arrivalDate))} – ${formatDate(
    getParam(params.departureDate),
  )}`;
  const last4 = getParam(params.cardLast4);
  const paymentMethodId = getParam(params.paymentMethod);
  const paymentMethodName =
    getParam(params.paymentMethodName) ?? "Payment method";
  const isCardPayment =
    paymentMethodId === "card" ||
    paymentMethodId === "jcb" ||
    paymentMethodId === "visa";
  const paidVia =
    isCardPayment && last4
      ? `${paymentMethodName} •••• ${last4} (demo)`
      : `${paymentMethodName} (demo)`;
  const bookingId = getParam(params.bookingId);

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
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center">
          <View className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <View className="mb-4 items-center">
              <View
                className="h-16 w-16 items-center justify-center rounded-full border-4 border-salmon-600">
                <Ionicons
                  name="checkmark"
                  size={36}
                  color="salmon"
                />
              </View>
            </View>

            <Text className="text-center font-poppins-semibold text-2xl text-textMain">
              Demo Payment Successful!
            </Text>
            <Text className="mt-2 text-center font-poppins text-sm text-slate-500">
              This is a prototype confirmation. No payment was processed.
            </Text>

            <View className="my-5 flex-row items-center justify-between">
              <Text className="flex-1 font-poppins-medium text-sm text-textMain">
                Demo receipt (not emailed)
              </Text>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <ReceiptRow
              label="Booking reference"
              value={bookingReference ?? "Not available"}
            />
            <ReceiptRow label="Demo transaction ID" value="DEMO-123456" />
            <ReceiptRow
              label="Date"
              value={new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            />
            <ReceiptRow
              label="Amount"
              value={
                Number.isFinite(totalPrice) && totalPrice > 0
                  ? `₱${totalPrice.toLocaleString("en-PH")}`
                  : "Not available"
              }
            />
            <ReceiptRow label="Paid via" value={paidVia} />

            <View className="mt-4 flex-row rounded-xl border border-slate-200 p-3">
              <Image
                source={{ uri: itinerary.image }}
                resizeMode="cover"
                className="h-28 w-24 rounded-lg"
              />
              <View className="ml-3 flex-1 justify-center">
                <Text className="font-poppins-semibold text-base text-textMain">
                  {itinerary.name} Itinerary Package
                </Text>
                <View className="mt-3 flex-row items-center">
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color={colors.text}
                  />
                  <Text className="ml-2 flex-1 font-poppins text-xs text-slate-600">
                    {dateRange}
                  </Text>
                </View>
                <View className="mt-2 flex-row items-center">
                  <Ionicons
                    name="people-outline"
                    size={18}
                    color={colors.text}
                  />
                  <Text className="ml-2 font-poppins text-xs text-slate-600">
                    {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-5 gap-3">
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace("/(tabs)")}
            className="items-center rounded-xl bg-salmon-600 py-4"
          >
            <Text className="font-poppins-semibold text-white">
              Back to Home Page
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace("/(tabs)/itinerary")}
            className="items-center rounded-xl border border-dashed border-salmon-600 bg-teal-50 py-4"
          >
            <Text
              onPress={() => {
                if (!bookingId) {
                  Alert.alert(
                    "Itinerary unavailable",
                    "The booking ID is missing.",
                  );
                  return;
                }

                router.replace({
                  pathname: "/my-itineraries/[bookingId]",
                  params: { bookingId },
                });
              }}
              className="font-poppins-semibold text-salmon-600"
            >
              View my Itinerary
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
