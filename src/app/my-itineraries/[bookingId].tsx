import { getErrorMessage } from "@/services/api";
import {
  deleteItineraryBooking,
  fetchItineraryBooking,
  type ItineraryBooking,
} from "@/services/itineraryBookings";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getParam(value?: string | string[]): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

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
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const [hoursString, minutesString] = value.split(":");
  const hours = Number(hoursString);
  const minutes = Number(minutesString);

  if (
    !Number.isInteger(hours) ||
    hours < 0 ||
    hours > 23 ||
    !Number.isInteger(minutes) ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
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

function DetailRow({
  icon,
  label,
  value,
}: Readonly<{
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
}>) {
  return (
    <View className="flex-row items-start py-2">
      <Ionicons name={icon} size={19} color={colors.textSecondary} />
      <View className="ml-3 flex-1">
        <Text className="font-poppins text-xs text-slate-500">{label}</Text>
        <Text className="mt-0.5 font-poppins-medium text-sm text-textMain">
          {value}
        </Text>
      </View>
    </View>
  );
}

function SectionTitle({ children }: Readonly<{ children: string }>) {
  return (
    <Text className="mb-3 font-poppins-semibold text-lg text-textMain">
      {children}
    </Text>
  );
}

export default function ItineraryDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    bookingId?: string | string[];
  }>();
  const bookingId = getParam(params.bookingId);

  const [booking, setBooking] = useState<ItineraryBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadBooking = async () => {
        if (!bookingId) {
          setError("The itinerary booking ID is missing.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const result = await fetchItineraryBooking(bookingId);

          if (isActive) {
            setBooking(result);
          }
        } catch (requestError) {
          if (isActive) {
            setError(getErrorMessage(requestError));
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      void loadBooking();

      return () => {
        isActive = false;
      };
    }, [bookingId]),
  );

  const handleDelete = async () => {
    if (!booking || deleting) {
      return;
    }

    setDeleting(true);

    try {
      await deleteItineraryBooking(booking.id);
      router.replace("/my-itineraries");
    } catch (requestError) {
      Alert.alert("Could not delete itinerary", getErrorMessage(requestError));
      setDeleting(false);
    }
  };

  const confirmDelete = () => {
    if (!booking || deleting) {
      return;
    }

    Alert.alert(
      "Delete itinerary?",
      "This will permanently delete this itinerary and its guest details.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => void handleDelete(),
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center bg-background"
        edges={["top"]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-3 font-poppins text-sm text-slate-500">
          Loading itinerary...
        </Text>
      </SafeAreaView>
    );
  }

  if (error || !booking) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
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
            Itinerary
          </Text>
        </View>

        <View className="flex-1 items-center justify-center px-8">
          <Ionicons
            name="alert-circle-outline"
            size={44}
            color={colors.primary}
          />
          <Text className="mt-4 text-center font-poppins-semibold text-base text-textMain">
            Could not load this itinerary
          </Text>
          <Text className="mt-2 text-center font-poppins text-sm text-slate-500">
            {error ?? "This itinerary could not be found."}
          </Text>

          {bookingId ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace("/my-itineraries")}
              className="mt-5 rounded-xl bg-primary px-6 py-3">
              <Text className="font-poppins-semibold text-white">
                Back to my itineraries
              </Text>
            </Pressable>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }

  const isUnpaid = booking.status.toLowerCase() === "pending";
  const arrivalTime = formatTime(booking.arrival_time);
  const departureTime = formatTime(booking.departure_time);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
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
          Itinerary
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <View className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {booking.itinerary_package.image ? (
            <Image
              source={{ uri: booking.itinerary_package.image }}
              resizeMode="cover"
              className="h-48 w-full"
            />
          ) : (
            <View className="h-36 items-center justify-center bg-teal-50">
              <Ionicons name="map-outline" size={48} color={colors.primary} />
            </View>
          )}

          <View className="p-4">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1">
                <Text className="font-poppins-semibold text-xl text-textMain">
                  {booking.itinerary_package.title}
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

            {isUnpaid ? (
              <View className="mt-4 flex-row items-start rounded-xl bg-amber-50 p-3">
                <Ionicons
                  name="alert-circle-outline"
                  size={19}
                  color="#92400E"
                />
                <Text className="ml-2 flex-1 font-poppins text-sm text-amber-900">
                  This itinerary is unpaid. Demo payment has not been processed.
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <SectionTitle>Booking details</SectionTitle>

          <DetailRow
            icon="receipt-outline"
            label="Booking reference"
            value={booking.booking_reference}
          />
          <DetailRow
            icon="calendar-outline"
            label="Arrival"
            value={`${formatDate(booking.arrival_date)}${
              arrivalTime ? ` at ${arrivalTime}` : ""
            }`}
          />
          <DetailRow
            icon="calendar-outline"
            label="Departure"
            value={`${formatDate(booking.departure_date)}${
              departureTime ? ` at ${departureTime}` : ""
            }`}
          />
          <DetailRow
            icon="people-outline"
            label="Guests"
            value={`${booking.guest_count} ${
              booking.guest_count === 1 ? "guest" : "guests"
            }`}
          />
          <DetailRow
            icon="cash-outline"
            label="Total"
            value={formatPrice(booking.total_price)}
          />
        </View>

        <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <SectionTitle>Day-by-day itinerary</SectionTitle>

          {booking.itinerary_package.days.length > 0 ? (
            booking.itinerary_package.days.map((day, index) => (
              <View
                key={day.id}
                className={`flex-row ${
                  index < booking.itinerary_package.days.length - 1
                    ? "border-b border-slate-100"
                    : ""
                } py-3`}>
                <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-teal-50">
                  <Text className="font-poppins-semibold text-sm text-primary">
                    {index + 1}
                  </Text>
                </View>

                <View className="flex-1">
                  <Text className="font-poppins-medium text-sm text-textMain">
                    {day.title}
                  </Text>

                  {day.notes.length > 0 ? (
                    day.notes.map((note, noteIndex) => (
                      <Text
                        key={`${day.id}-note-${noteIndex}`}
                        className="mt-1 font-poppins text-sm text-slate-500">
                        {note}
                      </Text>
                    ))
                  ) : (
                    <Text className="mt-1 font-poppins text-sm text-slate-500">
                      No additional details for this day.
                    </Text>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text className="font-poppins text-sm text-slate-500">
              No day-by-day details are available for this itinerary.
            </Text>
          )}
        </View>

        {booking.itinerary_package.inclusions.length > 0 ? (
          <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <SectionTitle>Included</SectionTitle>

            {booking.itinerary_package.inclusions.map((inclusion, index) => (
              <View
                key={`${inclusion}-${index}`}
                className="mb-2 flex-row items-center">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color={colors.primary}
                />
                <Text className="ml-2 flex-1 font-poppins text-sm text-slate-600">
                  {inclusion}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <SectionTitle>Guests</SectionTitle>

          {booking.guests.map((guest, index) => (
            <View
              key={guest.id}
              className={`py-3 ${
                index < booking.guests.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}>
              <Text className="font-poppins-medium text-sm text-textMain">
                {guest.first_name} {guest.last_name}
              </Text>

              {guest.email ? (
                <Text className="mt-1 font-poppins text-sm text-slate-500">
                  {guest.email}
                </Text>
              ) : null}

              {guest.phone ? (
                <Text className="mt-1 font-poppins text-sm text-slate-500">
                  {guest.phone}
                </Text>
              ) : null}
            </View>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Delete itinerary"
          disabled={deleting}
          onPress={confirmDelete}
          className="mt-5 flex-row items-center justify-center rounded-xl border border-red-300 bg-white py-4 active:opacity-80">
          {deleting ? (
            <ActivityIndicator color="#B91C1C" />
          ) : (
            <>
              <Ionicons name="trash-outline" size={19} color="#B91C1C" />
              <Text className="ml-2 font-poppins-semibold text-red-700">
                Delete itinerary
              </Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
