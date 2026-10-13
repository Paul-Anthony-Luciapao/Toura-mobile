import { ItineraryPackages, amenities } from "@/data/mockData";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function Inclusion() {
  const packageData = ItineraryPackages[0];

  return (
    <View className="mt-2 rounded-2xl pb-4">
      {/* Package Price */}
      <Text className="m-3 font-poppins-medium text-3xl text-textMain">
        Package Price
      </Text>

      <View className="px-4">
        <Text className="font-poppins-medium text-lg text-textMain">
          Total Package: {packageData.price}
        </Text>

        <Text className="pt-3 font-poppins text-sm text-textMuted">
          For transparency, you can view the detailed cost breakdown.
        </Text>

        {/* Cost Breakdown */}
        <View className="mt-2 gap-2">
          <Text className="font-poppins text-sm text-textMain">
            {"\u2022"} Accommodation
          </Text>

          <Text className="font-poppins text-sm text-textMain">
            {"\u2022"} Transportation
          </Text>

          <Text className="font-poppins text-sm text-textMain">
            {"\u2022"} Activities and entrance fees
          </Text>
        </View>
      </View>

      {/* Amenities */}
      <View className="mt-6 px-4">
        <Text className="mb-4 font-poppins-medium text-3xl text-textMain">
          Amenities
        </Text>

        <View className="border border-black flex-row flex-wrap">
          {amenities.map((amenity) => (
            <View
              key={amenity.name}
              className="mb-4 mr-4 items-center"
            >
              {/* Amenity Icon */}
              <View className="h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Ionicons
                  name={amenity.icon}
                  size={24}
                  color={colors.primary}
                />
              </View>

              {/* Amenity Label */}
              <Text className="mt-2 text-center font-poppins text-xs text-primary">
                {amenity.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}