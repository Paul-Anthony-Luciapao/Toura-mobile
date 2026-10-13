import type { TouristSpot } from "@/data/types";
import React from "react";
import { Image, Text, View } from "react-native";
import type { ItineraryDates } from "@/data/types";

type Props = Readonly<{
  itinerary: TouristSpot;
  dates: ItineraryDates;
  className?: string;
}>;

/**
 * Summary of the itinerary package the traveler has selected.
 * Rendered at the top of the detail screen, above the day-by-day breakdown.
 */
export default function SelectedItineraryCard({
  itinerary,
  dates,
  className = "",
}: Props) {
  return (
    <View
      className={`flex w-full overflow-hidden bg-white shadow-md shadow-black/10 ${className}`}
    >
      {/* Image */}
      <Image
        source={{ uri: itinerary.image }}
        resizeMode="cover"
        className="h-[240px] w-full bg-slate-200"
      />

      {/* Content */}
      <View className="px-4 pb-4 pt-3">
        <View className="relative flex-row">
          <View className="absolute -top-28 left-0 z-1 ">
            {/* Name */}
            <Text
              className="font-poppins-semibold text-2xl text-white"
              numberOfLines={2}
            >
              {itinerary.name} Itinerary {"\n"} Package
            </Text>

            <View className="ml-1.5 w-20">
              <Text className="font-poppins-medium text-[11px] text-white">
                {dates.daysOfWeek.length} days
              </Text>
            </View>
          </View>

          {/* Municipality */}
          {/* <View className="flex-row items-center gap-1 ml-2 mb-.5">
            <Ionicons name="location-outline" size={12} color={colors.textMuted} />

            <Text className="font-poppins items-center mt-1 text-[12px] text-textMuted">
              {itinerary.municipality}
            </Text>
          </View> */}

          {/* Rating */}
          {/* <View className="flex-row items-center gap-1 ml-24">
            <Ionicons name="star" size={13} color={colors.primary} />

            <Text className="font-poppins items-center mt-1 text-[12px] text-textMuted">
              {itinerary.rating} ({itinerary.reviewCount})
            </Text>
          </View> */}
        </View>

        {/* Arrival / Departure and availability details live in the Availability component. */}

        {/* Price */}
        {/* <View className="mt-4 flex-row items-baseline justify-between">
          <View>
            <Text className="font-poppins-bold text-[20px] text-textMain">
              {formatCurrency(itinerary.price)} / Traveler
            </Text>
          </View>


        </View> */}
      </View>
    </View>
  );
}
