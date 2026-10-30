import { PACKAGE_SPOTS } from "@/data/mockData";
import type { Guest } from "@/data/types";
import { getErrorMessage } from "@/services/api";
import { createItineraryBooking } from "@/services/itineraryBookings";
import { colors } from "@/styles/global";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import Review from "@components/itineraries/itinerary-packages/Review";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SerializedGuest = Omit<Guest, "dateOfBirth"> & {
  dateOfBirth: string | null;
};

function isSerializedGuest(value: unknown): value is SerializedGuest {
  if (typeof value !== "object" || value === null) return false;

  const guest = value as Record<string, unknown>;
  return (
    typeof guest.id === "string" &&
    typeof guest.firstName === "string" &&
    typeof guest.lastName === "string" &&
    (typeof guest.dateOfBirth === "string" || guest.dateOfBirth === null) &&
    typeof guest.phone === "string" &&
    typeof guest.email === "string"
  );
}

function parseSerializedGuests(serialized?: string): {
  guests: Guest[];
  failed: boolean;
} {
  if (!serialized) return { guests: [createGuest()], failed: false };

  try {
    const parsed: unknown = JSON.parse(serialized);
    if (
      !Array.isArray(parsed) ||
      parsed.length === 0 ||
      !parsed.every(isSerializedGuest)
    ) {
      throw new Error("Invalid guest data.");
    }

    const guests = parsed.map((guest) => {
      const dateOfBirth = guest.dateOfBirth
        ? new Date(guest.dateOfBirth)
        : null;
      if (dateOfBirth && Number.isNaN(dateOfBirth.getTime())) {
        throw new Error("Invalid guest date of birth.");
      }

      return { ...guest, dateOfBirth };
    });

    return { guests, failed: false };
  } catch {
    return { guests: [createGuest()], failed: true };
  }
}

function toLocalDate(value: string): string | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toLocalTime(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

const createGuest = (): Guest => ({
  id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  phone: "",
  email: "",
});

export default function ReviewScreen() {
  const {
    id,
    guests: guestsParam,
    arrivalDate,
    arrivalTime,
    departureDate,
    departureTime,
  } = useLocalSearchParams<{
    id?: string | string[];
    guests?: string | string[];
    arrivalDate?: string | string[];
    arrivalTime?: string | string[];
    departureDate?: string | string[];
    departureTime?: string | string[];
  }>();

  const packageId = Array.isArray(id) ? id[0] : id;
  const arrivalDateParam = Array.isArray(arrivalDate)
    ? arrivalDate[0]
    : arrivalDate;
  const arrivalTimeParam = Array.isArray(arrivalTime)
    ? arrivalTime[0]
    : arrivalTime;
  const departureDateParam = Array.isArray(departureDate)
    ? departureDate[0]
    : departureDate;
  const departureTimeParam = Array.isArray(departureTime)
    ? departureTime[0]
    : departureTime;

  const serializedGuests = Array.isArray(guestsParam)
    ? guestsParam[0]
    : guestsParam;

  const itinerary = PACKAGE_SPOTS.find(
    (spot) => String(spot.id) === String(packageId),
  );

  const [guestData] = useState(() => parseSerializedGuests(serializedGuests));
  const [guests, setGuests] = useState<Guest[]>(guestData.guests);
  const [submitting, setSubmitting] = useState(false);
  const submissionInProgress = useRef(false);

  useEffect(() => {
    if (guestData.failed) {
      Alert.alert(
        "Guest details could not be restored",
        "Please review and re-enter the guest information.",
      );
    }
  }, [guestData.failed]);

  const updateGuest = (
    guestId: string,
    field: keyof Omit<Guest, "id">,
    value: string | Date | null,
  ) => {
    setGuests((currentGuests) =>
      currentGuests.map((guest) =>
        guest.id === guestId ? { ...guest, [field]: value } : guest,
      ),
    );
  };

  if (!packageId || !itinerary) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Itinerary package not found.
        </Text>
      </SafeAreaView>
    );
  }

  const handleContinue = async () => {
    // A ref blocks rapid repeat taps before React can render the disabled/loading state.
    if (submissionInProgress.current) return;

    const invalidGuest = guests.some(
      (guest) =>
        !guest.firstName.trim() ||
        !guest.lastName.trim() ||
        !guest.dateOfBirth ||
        (!guest.phone.trim() && !guest.email.trim()),
    );
    if (invalidGuest) {
      Alert.alert(
        "Guest information required",
        "Enter each guest's first and last name, date of birth, and either a phone number or email.",
      );
      return;
    }

    const arrivalDateValue = arrivalDateParam
      ? toLocalDate(arrivalDateParam)
      : null;
    const departureDateValue = departureDateParam
      ? toLocalDate(departureDateParam)
      : null;
    if (
      !arrivalDateValue ||
      !departureDateValue ||
      departureDateValue <= arrivalDateValue
    ) {
      Alert.alert(
        "Invalid travel dates",
        "Choose a valid departure date after your arrival date.",
      );
      return;
    }

    submissionInProgress.current = true;
    setSubmitting(true);
    try {
      const booking = await createItineraryBooking({
        itinerary_package_id: packageId,
        arrival_date: arrivalDateValue,
        arrival_time: toLocalTime(arrivalTimeParam),
        departure_date: departureDateValue,
        departure_time: toLocalTime(departureTimeParam),
        guests: guests.map((guest) => ({
          first_name: guest.firstName.trim(),
          last_name: guest.lastName.trim(),
          date_of_birth: guest.dateOfBirth
            ? toLocalDate(guest.dateOfBirth.toISOString())
            : null,
          phone: guest.phone.trim() || null,
          email: guest.email.trim() || null,
        })),
      });

      router.push({
        pathname: "/itinerary-packages/[id]/payment",
        params: {
          id: packageId,
          bookingId: String(booking.id),
          bookingReference: booking.booking_reference,
          totalPrice: booking.total_price,
          guestCount: String(guests.length),
          arrivalDate: arrivalDateParam,
          arrivalTime: arrivalTimeParam,
          departureDate: departureDateParam,
          departureTime: departureTimeParam,
        },
      });
    } catch (error) {
      Alert.alert("Could not create itinerary booking", getErrorMessage(error));
    } finally {
      submissionInProgress.current = false;
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <StatusBar hidden={false} barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-10"
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

        <Review guests={guests} onUpdateGuest={updateGuest} />
      </ScrollView>
      <View className="bg-background items-center justify-center px-4 py-4">
        <Pressable
          onPress={() => void handleContinue()}
          disabled={submitting}
          accessibilityRole="button"
          accessibilityLabel="Continue"
          className={`mt-5 w-[350px] items-center justify-center rounded-xl bg-salmon-600 py-4 ${
            submitting ? "opacity-50" : "active:opacity-70"
          }`}
        >
          <Text className="font-poppins-semibold text-base text-white">
            {submitting ? "Processing..." : "Continue"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
