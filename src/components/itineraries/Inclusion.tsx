import { ItineraryPackages } from '@/data/mockData';
import React from 'react';
import { Text, View } from 'react-native';

export default function Inclusion() {
  const packageData = ItineraryPackages[0];

  return (
    <View className="h-max mt-2 pb-2 bg-slate-100 rounded-2xl">
      <Text className="text-4xl font-poppins-medium m-3">
        Package Price
      </Text>

      <View className="p-3">
        <Text className="text-lg font-poppins-medium">
          Total Package {packageData.price}
        </Text>

        <Text className="pt-3">For transparency, you can view the detailed cost breakdown.</Text>
        <Text className="p-2">{"\u2022"} info</Text>
        <Text className="p-2">{"\u2022"} info</Text>
        <Text className="p-2">{"\u2022"} info</Text>
      </View>
    </View>
  );
}
