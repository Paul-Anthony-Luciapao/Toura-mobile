import { INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import type { Guest } from "@/data/types";
import { colors } from "@/styles/global";
import Button from "@components/buttons/Buttons";
import GuestCard from "@components/itineraries/GuestCard";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const createGuest = (): Guest => ({
  id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  phone: "",
  email: "",
});

export default function GuestScreen() {
  const {
    id,
    arrivalDate,
    arrivalTime,
    departureDate,
    departureTime,
  } = useLocalSearchParams<{
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

  const index = INITIAL_TOURIST_SPOTS.findIndex(
    (spot) => String(spot.id) === String(packageId),
  );

  const itinerary = INITIAL_TOURIST_SPOTS[index];

  const [guests, setGuests] = useState<Guest[]>([
    {
      ...createGuest(),
      id: "primary",
    },
  ]);

  const addGuest = () => {
    setGuests((currentGuests) => [...currentGuests, createGuest()]);
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
        arrivalDate: arrivalDateParam,
        arrivalTime: arrivalTimeParam,
        departureDate: departureDateParam,
        departureTime: departureTimeParam,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10">
        <ItineraryHero itinerary={itinerary} />

        {/* Back button */}
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-4 top-4 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70">
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>

        <View className="-mt-5 rounded-t-[30px] bg-white px-5 pt-6">
          {/* Header */}
          <Text className="pb-6 font-poppins-semibold text-2xl">
            Guest Information
          </Text>

          {/* Description */}
          <Text className="pb-6 font-poppins text-slate-600">
            Add the Guest Details for your trip
          </Text>

          {/* Guest Cards */}
          {guests.map((guest, index) => (
            <GuestCard
              key={guest.id}
              guestNumber={index + 1}
              guest={guest}
              onChange={(field, value) => updateGuest(guest.id, field, value)}
            />
          ))}

          {/* Add Guest */}
          <Pressable
            onPress={addGuest}
            className="flex-row items-center justify-center rounded-xl border border-dashed border-primary py-4">
            <Ionicons name="add-circle-outline" size={21} color="#FFA69B" />

            <Text className="ml-2 font-poppins-semibold text-primary">
              Add another guest
            </Text>
          </Pressable>

          {/* Confirm and Proceed */}
          <Button
            title="Confirm and Proceed"
            onPress={handleContinue}
            width="w-[360px]"
            className="mt-2 self-center"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
