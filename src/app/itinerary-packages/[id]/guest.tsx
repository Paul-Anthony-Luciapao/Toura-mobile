import {
  getItineraryPackageSpot,
  INITIAL_ITINERARY_PACKAGES,
} from "@/data/itineraryPackage";
import { useAuth } from "@/context/AuthContext";
import type { Guest } from "@/data/types";
import type { AuthUser } from "@/services/auth";
import { colors } from "@/styles/global";
import Button from "@components/buttons/Buttons";
import GuestCard from "@components/itineraries/GuestCard";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const createGuest = (): Guest => ({
  id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  phone: "",
  email: "",
});

function createPrimaryGuest(user: AuthUser | null): Guest {
  const [firstName = "", ...lastNameParts] = user?.name.trim().split(/\s+/) ?? [];

  return {
    ...createGuest(),
    id: "primary",
    firstName,
    lastName: lastNameParts.join(" "),
    phone: user?.phone ?? "",
    email: user?.email ?? "",
  };
}

export default function GuestScreen() {
  const { user, loading } = useAuth();
  const { id, arrivalDate, arrivalTime, departureDate, departureTime } =
    useLocalSearchParams<{
      id?: string | string[];
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

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <GuestBookingForm
      user={user}
      packageId={packageId}
      arrivalDate={arrivalDateParam}
      arrivalTime={arrivalTimeParam}
      departureDate={departureDateParam}
      departureTime={departureTimeParam}
    />
  );
}

type GuestBookingFormProps = {
  user: AuthUser | null;
  packageId?: string;
  arrivalDate?: string;
  arrivalTime?: string;
  departureDate?: string;
  departureTime?: string;
};

function GuestBookingForm({
  user,
  packageId,
  arrivalDate,
  arrivalTime,
  departureDate,
  departureTime,
}: GuestBookingFormProps) {
  const itinerary = getItineraryPackageSpot(packageId);
  const selectedPackage = INITIAL_ITINERARY_PACKAGES.find(
    (item) => item.id === packageId,
  );
  const requiredGroupSize =
    selectedPackage?.priceBasis === "couple"
      ? 2
      : selectedPackage?.priceBasis === "family of 4"
        ? 4
        : null;

  const [guests, setGuests] = useState<Guest[]>(() => [
    createPrimaryGuest(user),
  ]);

  const addGuest = () => {
    setGuests((currentGuests) =>
      currentGuests.length < 20
        ? [...currentGuests, createGuest()]
        : currentGuests,
    );
  };

  const updateGuest = (
    id: string,
    field: keyof Omit<Guest, "id">,
    value: string | Date | null,
  ) => {
    setGuests((currentGuests) =>
      currentGuests.map((guest) =>
        guest.id === id
          ? {
              ...guest,
              [field]: value,
            }
          : guest,
      ),
    );
  };

  const removeGuest = (guestId: string) => {
    setGuests((currentGuests) => {
      // Keep the primary guest and at least one traveler for a valid booking.
      if (guestId === "primary" || currentGuests.length <= 1) {
        return currentGuests;
      }

      return currentGuests.filter((guest) => guest.id !== guestId);
    });
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

  const handleContinue = () => {
    if (requiredGroupSize !== null && guests.length !== requiredGroupSize) {
      Alert.alert(
        "Package group size",
        `This package price applies to exactly ${requiredGroupSize} guests. Add or remove guests to continue.`,
      );
      return;
    }

    const errors = guests.flatMap((guest, index) => {
      const missing: string[] = [];
      if (!guest.firstName.trim()) missing.push("first name");
      if (!guest.lastName.trim()) missing.push("last name");
      if (!guest.dateOfBirth) missing.push("date of birth");

      if (!guest.phone.trim() && !guest.email.trim()) {
        missing.push("phone number or email");
      }
      return missing.length
        ? [`Guest ${index + 1}: please enter ${missing.join(", ")}.`]
        : [];
    });

    if (errors.length > 0) {
      Alert.alert("Required guest information", errors.join("\n"));
      return;
    }

    router.push({
      pathname: "/itinerary-packages/[id]/review",
      params: {
        id: packageId,
        guests: JSON.stringify(guests),
        arrivalDate,
        arrivalTime,
        departureDate,
        departureTime,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <StatusBar hidden={false} barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        <ItineraryHero itinerary={itinerary} />

        {/* Back button */}
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-4 top-12 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70"
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>

        <View className="-mt-5 rounded-t-[30px] bg-white px-5 pt-6">
          {/* Header */}
          <Text className="pb-6 font-poppins-semibold text-2xl">
            Guest Information
          </Text>

          {/* Description */}
          <Text className="pb-6 font-poppins text-slate-600">
            {user
              ? "Your profile details are filled in for Guest 1. Add other guests as needed."
              : "Add the guest details for your trip."}
          </Text>
          {requiredGroupSize !== null ? (
            <Text className="mb-4 rounded-xl bg-amber-50 p-3 font-poppins text-sm text-amber-900">
              This package price covers exactly {requiredGroupSize} guests.
            </Text>
          ) : null}

          {/* Guest Cards */}
          {guests.map((guest, index) => (
            <GuestCard
              key={guest.id}
              guestNumber={index + 1}
              guest={guest}
              onChange={(field, value) => updateGuest(guest.id, field, value)}
              onRemove={() => removeGuest(guest.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="bg-background items-center justify-center px-4 py-4">
        {/* Add Guest */}
        <Pressable
          onPress={addGuest}
          disabled={guests.length >= 20}
          className="w-full flex-row items-center justify-center rounded-xl border border-dashed border-salmon-600 py-4"
        >
          <Ionicons name="add-circle-outline" size={21} color="#D66957" />

          <Text className="ml-2 font-poppins-semibold text-salmon-600">
            {guests.length >= 20 ? "Maximum guests reached" : "Add another guest"}
          </Text>
        </Pressable>

        {/* Confirm and Proceed */}
        <Button
          title="Confirm and Proceed"
          onPress={handleContinue}
          width="w-full"
          className="mt-2 self-center bg-salmon-600"
        />
      </View>
    </SafeAreaView>
  );
}
