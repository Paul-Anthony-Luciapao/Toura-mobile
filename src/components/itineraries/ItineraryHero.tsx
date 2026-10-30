import { getPackageSpotImage } from "@/data/packageImages";
import type { TouristSpot } from "@/data/types";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = Readonly<{
  itinerary: TouristSpot;
}>;

export default function ItineraryHero({ itinerary }: Props) {
  return (
    <View className="relative w-full">
      <Image
        source={getPackageSpotImage(itinerary.image)}
        resizeMode="cover"
        className="h-[240px] w-full bg-slate-200"
      />

      <View className="absolute left-4 top-36">
        <Text className="font-poppins-semibold text-2xl text-white">
          Your Trip to
        </Text>

        <Text className="font-poppins-bold text-4xl text-white">
          {itinerary.name}
        </Text>

        <Text className="mt-1 font-poppins text-sm text-white">
          Explore • Relax • Discover
        </Text>
      </View>
    </View>
  );
}
