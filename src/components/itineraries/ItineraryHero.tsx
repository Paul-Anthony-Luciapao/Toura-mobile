import { getPackageSpotImage } from "@/data/packageImages";
import type { TouristSpot } from "@/data/types";
import React from "react";
import { Dimensions, ImageBackground, Text, View } from "react-native";

type Props = Readonly<{
  itinerary: TouristSpot;
}>;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ItineraryHero({ itinerary }: Props) {
  return (
    <View className="relative w-full">
      <ImageBackground
        source={getPackageSpotImage(itinerary.image)}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 300,
        }}
      >
        {/* Dark overlay for better text visibility */}
        <View
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(0,0,0,0.30)",
          }}
        />

        {/* Hero text */}
        <View className="absolute bottom-7 left-5 right-5">
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
      </ImageBackground>
    </View>
  );
}
