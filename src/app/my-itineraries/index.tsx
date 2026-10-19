import { getErrorMessage } from "@/services/api";
import {
  fetchMyItineraryBookings,
  type ItineraryBooking,
} from "@/services/itineraryBookings";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function formatDate(value: string): string {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);

  if (!year || !month || !day) {
    return "Date unavailable";
  }

  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatPrice(value: string): string {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "Price unavailable";
  }

  return `₱${amount.toLocaleString("en-PH")}`;
}

function getStatusLabel(status: string): string {
  if (status.toLowerCase() === "pending") {
    return "Unpaid";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function ItineraryCard({
  booking,
  onPress,
}: Readonly<{
  booking: ItineraryBooking;
  onPress: () => void;
}>) {
  const isUnpaid = booking.status.toLowerCase() === "pending";
  const title = booking.itinerary_package.title;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${getStatusLabel(booking.status)}`}
      onPress={onPress}
      className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 active:opacity-80">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="font-poppins-semibold text-base text-textMain">
            {title}
          </Text>

          {booking.itinerary_package.destination ? (
            <Text className="mt-1 font-poppins text-sm text-slate-500">
              {booking.itinerary_package.destination}
            </Text>
          ) : null}
        </View>

        <View
          className={`rounded-full px-3 py-1 ${
            isUnpaid ? "bg-amber-100" : "bg-teal-50"
          }`}>
          <Text
            className={`font-poppins-medium text-xs ${
              isUnpaid ? "text-amber-800" : "text-primary"
            }`}>
            {getStatusLabel(booking.status)}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center">
        <Ionicons name="calendar-outline" size={18} color={colors.text} />
        <Text className="ml-2 flex-1 font-poppins text-sm text-slate-600">
          {formatDate(booking.arrival_date)} –{" "}
          {formatDate(booking.departure_date)}
        </Text>
      </View>

      <View className="mt-2 flex-row items-center">
        <Ionicons name="people-outline" size={18} color={colors.text} />
        <Text className="ml-2 flex-1 font-poppins text-sm text-slate-600">
          {booking.guest_count} {booking.guest_count === 1 ? "guest" : "guests"}
        </Text>
      </View>

      <View className="mt-2 flex-row items-center">
        <Ionicons name="receipt-outline" size={18} color={colors.text} />
        <Text className="ml-2 flex-1 font-poppins text-sm text-slate-600">
          {booking.booking_reference}
        </Text>
      </View>

      <View className="mt-3 flex-row items-center justify-between border-t border-slate-100 pt-3">
        <Text className="font-poppins-medium text-sm text-textMain">
          {formatPrice(booking.total_price)}
        </Text>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </View>

      {isUnpaid ? (
        <View className="mt-3 flex-row items-start rounded-xl bg-amber-50 p-3">
          <Ionicons name="alert-circle-outline" size={18} color="#92400E" />
          <Text className="ml-2 flex-1 font-poppins text-xs text-amber-900">
            Unpaid — demo payment has not been processed.
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export default function MyItinerariesScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState<ItineraryBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchMyItineraryBookings();
      setBookings(result);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadBookings();
    }, [loadBookings]),
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center justify-center border-b border-slate-100 px-5 py-4">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          hitSlop={10}
          className="absolute left-5 h-9 w-9 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>

        <Text className="font-poppins-semibold text-xl text-textMain">
          My Itineraries
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="mt-3 font-poppins text-sm text-slate-500">
            Loading your itineraries...
          </Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons
            name="cloud-offline-outline"
            size={42}
            color={colors.primary}
          />
          <Text className="mt-4 text-center font-poppins-semibold text-base text-textMain">
            Could not load your itineraries
          </Text>
          <Text className="mt-2 text-center font-poppins text-sm text-slate-500">
            {error}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void loadBookings()}
            className="mt-5 rounded-xl bg-primary px-6 py-3">
            <Text className="font-poppins-semibold text-white">Try again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(booking) => String(booking.id)}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 20,
            paddingBottom: 32,
            flexGrow: bookings.length === 0 ? 1 : undefined,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center px-8">
              <Ionicons name="map-outline" size={48} color={colors.primary} />
              <Text className="mt-4 text-center font-poppins-semibold text-base text-textMain">
                No itineraries yet
              </Text>
              <Text className="mt-2 text-center font-poppins text-sm text-slate-500">
                Itineraries you create will appear here.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ItineraryCard
              booking={item}
              onPress={() =>
                router.push({
                  pathname: "/my-itineraries/[bookingId]",
                  params: { bookingId: String(item.id) },
                })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
