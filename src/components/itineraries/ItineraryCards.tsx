import { TouristSpot } from '@/data/types';
import React from 'react';
import { Image, Text, View } from 'react-native';

const Dates = [
    {dateArrival: "October 1, 2023", dateDeparture: "October 5, 2023", daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]},
    {dateArrival: "October 10, 2023", dateDeparture: "October 15, 2023", daysOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]},
    {dateArrival: "October 20, 2023", dateDeparture: "October 25, 2023", daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]},
    {dateArrival: "November 1, 2023", dateDeparture: "November 5, 2023", daysOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]},
    {dateArrival: "November 10, 2023", dateDeparture: "November 15, 2023", daysOfWeek: ["Friday", "Saturday", "Sunday", "Monday", "Tuesday"]},
]

type Props = Readonly<{
  spot: TouristSpot;
  dateArrival?: string;
  dateDeparture?: string;
  daysOfWeek?: string[];
  className?: string;
}>;

const ItineraryCards = ({
  spot,
  dateArrival,
  dateDeparture,
  daysOfWeek = [],
  className,
}: Props) => {
  return (
    <View className={`w-full ${className ?? ''}`}>
      {/* Spot Name */}
      <Text
        className="mb-2 text-lg font-bold text-slate-900"
        numberOfLines={1}
      >
        {spot.name}
      </Text>

      {/* White Card */}
      <View className="w-full flex-row overflow-hidden rounded-[18px] bg-white shadow-md shadow-black/10">
        {/* Image */}
        <Image
          source={{ uri: spot.image }}
          resizeMode="cover"
          className="h-[120px] w-[130px] rounded-[18px] bg-slate-200"
        />

        {/* Content */}
        <View className="flex-1 justify-start p-2">
          {/* Arrival / Departure */}

            <Text className="text-base font-semibold text-slate-800 text-[11px] pl-4">
                Date of Arrival
            </Text>

            {Dates[0].dateArrival && Dates[0].daysOfWeek.length > 0 && (
            <Text className="pl-4">
               {Dates[0].daysOfWeek[0]} {Dates[0].dateArrival}
            </Text>
            )}

            <Text className="text-base font-semibold text-slate-800 text-[11px] pt-4 pl-4">
                Date of Departure
            </Text>

            {Dates[0].dateDeparture && Dates[0].daysOfWeek.length > 0 && (
            <Text className="pl-4">
               {Dates[0].daysOfWeek[0]} {Dates[0].dateDeparture}
            </Text>
            )}
        </View>
      </View>
    </View>
  );
};

export default ItineraryCards;
