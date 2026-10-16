import { PACKAGE_SPOTS } from "@/data/mockData";
import { colors } from "@/styles/global";
import Button from "@components/buttons/Buttons";
import ItineraryHero from "@components/itineraries/ItineraryHero";
import VerificationCard from "@components/itineraries/VerificationCard";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificationScreen() {
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

  const index = PACKAGE_SPOTS.findIndex(
    (spot) => String(spot.id) === String(packageId),
  );

  const itinerary = PACKAGE_SPOTS[index];

  if (!packageId || !itinerary) {
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
        contentContainerClassName="pb-10"
      >
        {/* Hero */}
        <ItineraryHero itinerary={itinerary} />

        {/* Back button */}
        <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="absolute left-4 top-4 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.white}
            />
        </Pressable>

        {/* Verification Card */}
        <View className="-mt-5 rounded-t-[30px] bg-white px-5 pt-6">
          <VerificationCard />

          {/* Continue Button */}
          <Button
            title="Confirm and Proceed"
            onPress={() => {
              router.push({
                pathname: "/itinerary-packages/[id]/guest",
                params: {
                  id: packageId,
                  arrivalDate: arrivalDateParam,
                  arrivalTime: arrivalTimeParam,
                  departureDate: departureDateParam,
                  departureTime: departureTimeParam,
                },
              });
            }}
            width="w-[225px]"
            className="mt-5 self-center"
          />

          <View className="h-6" />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
