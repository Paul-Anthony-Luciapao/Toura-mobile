import { colors } from "@/styles/global";
import { getErrorMessage } from "@/services/api";
import {
  cancelTourBooking,
  fetchMyTourBookings,
  type TourBooking,
} from "@/services/tourBookings";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyToursScreen() {
  const [bookings, setBookings] = useState<TourBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyBookingId, setBusyBookingId] = useState<number | null>(null);

  const loadBookings = useCallback(async () => {
    try {
      setBookings(await fetchMyTourBookings());
      setError(null);
    } catch {
      setError("Could not load your tour bookings. Try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    void loadBookings();
  }, [loadBookings]));

  const handleCancel = (booking: TourBooking) => {
    Alert.alert(
      "Cancel tour booking?",
      "This will cancel the pending booking.",
      [
        { text: "Keep booking", style: "cancel" },
        {
          text: "Cancel booking",
          style: "destructive",
          onPress: () => {
            setBusyBookingId(booking.id);
            void cancelTourBooking(booking.id)
              .then(loadBookings)
              .catch((error: unknown) =>
                Alert.alert("Could not cancel booking", getErrorMessage(error)),
              )
              .finally(() => setBusyBookingId(null));
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center gap-3 px-5 py-4">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text className="font-poppins-semibold text-xl text-textMain">My Tour Bookings</Text>
      </View>
      {loading ? (
        <View className="flex-1 items-center justify-center"><ActivityIndicator color={colors.primary} /></View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center font-poppins text-slate-600">{error}</Text>
          <Pressable onPress={() => void loadBookings()} className="mt-4 rounded-xl bg-primary px-5 py-3">
            <Text className="font-poppins-semibold text-white">Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => String(item.id)}
          contentContainerClassName="gap-3 px-5 pb-8"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                void loadBookings();
              }}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <View className="items-center py-12">
              <Text className="font-poppins text-slate-500">You have no tour bookings yet.</Text>
              <Pressable onPress={() => router.replace("/tours")} className="mt-4 rounded-xl bg-primary px-5 py-3">
                <Text className="font-poppins-semibold text-white">Browse tours</Text>
              </Pressable>
            </View>
          }
          renderItem={({ item }) => (
            <View className="rounded-2xl bg-white p-4">
              <Text className="font-poppins-semibold text-base text-textMain">{item.tour_package.name}</Text>
              <Text className="mt-1 font-poppins text-sm text-slate-500">
                {item.tour_date} · {item.total_participants} participants
              </Text>
              <Text className="mt-2 font-poppins-semibold text-primary">
                ₱{Number(item.total_amount).toLocaleString("en-PH")}
              </Text>
              <View className="mt-3 flex-row justify-between">
                <Text className="font-poppins text-xs text-slate-500">{item.booking_reference}</Text>
                <Text className="font-poppins-medium text-xs capitalize text-textMain">
                  {item.status} · payment {item.payment_status}
                </Text>
              </View>
              {item.status === "pending" ? (
                <View className="mt-3 flex-row gap-3">
                  <Pressable
                    disabled={busyBookingId === item.id}
                    onPress={() =>
                      router.push({
                        pathname: "/tours/payment",
                        params: {
                          bookingId: String(item.id),
                          bookingReference: item.booking_reference,
                          amount: item.total_amount,
                          tourName: item.tour_package.name,
                        },
                      })
                    }
                    className="flex-1 items-center rounded-lg bg-salmon-600 py-3"
                  >
                    <Text className="font-poppins-semibold text-sm text-white">Continue payment</Text>
                  </Pressable>
                  <Pressable
                    disabled={busyBookingId === item.id}
                    onPress={() => handleCancel(item)}
                    className="items-center rounded-lg border border-red-200 px-4 py-3"
                  >
                    <Text className="font-poppins-medium text-sm text-red-700">
                      {busyBookingId === item.id ? "Cancelling..." : "Cancel"}
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
