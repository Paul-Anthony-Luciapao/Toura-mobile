import { INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import type { Guest } from "@/data/types";
import { colors } from "@/styles/global";
import Buttons from "@components/buttons/Buttons";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import Review from "@components/itineraries/itinerary-packages/Review";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const createGuest = (): Guest => ({
  id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  phone: "",
  email: "",
});

export default function ReviewScreen() {
  const { id, guests: guestsParam } = useLocalSearchParams<{
    id?: string | string[];
    guests?: string | string[];
  }>();

  const packageId = Array.isArray(id) ? id[0] : id;

  const serializedGuests = Array.isArray(guestsParam)
    ? guestsParam[0]
    : guestsParam;

  const itinerary = INITIAL_TOURIST_SPOTS.find(
    (spot) => String(spot.id) === String(packageId),
  );

  const [guests, setGuests] = useState<Guest[]>(() => {
    if (!serializedGuests) {
      return [createGuest()];
    }

    const parsedGuests = JSON.parse(serializedGuests) as (Omit<
      Guest,
      "dateOfBirth"
    > & { dateOfBirth: string | null })[];

    return parsedGuests.map((guest) => ({
      ...guest,
      dateOfBirth: guest.dateOfBirth ? new Date(guest.dateOfBirth) : null,
    }));
  });

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

  if (!itinerary) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Itinerary package not found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-10">
        <ItineraryHero itinerary={itinerary} />

        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-4 top-4 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70">
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>

        <Review guests={guests} onUpdateGuest={updateGuest} />

        {/* Confirm and proceed */}
        <Buttons
          title="Confirm and Proceed"
          onPress={() => {
            router.push(`/itinerary-packages/${packageId}/payment`);
          }}
          width="w-[225px]"
          className="mt-5 self-center"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
