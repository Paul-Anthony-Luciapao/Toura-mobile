import { TouristSpot } from "@/data/types";
import { Image, Text, View } from "react-native";

export type ItineraryCardData = TouristSpot & {
  arrival: string;
  departure: string;
  days: string;
};

type Props = Readonly<{
  spot: ItineraryCardData;
  className?: string;
}>;

export default function ItineraryCard({
  spot,
  className = "",
}: Props) {
  return (
    <View className={`w-full ${className}`}>
      {/* Name above card */}
      <Text className="mb-2 font-poppins-semibold text-[15px] text-textMain" numberOfLines={1} >
        {spot.name} Package
      </Text>

      {/* Card */}
      <View className="h-[140px] w-full flex-row overflow-hidden rounded-[18px] bg-white shadow-md shadow-black/10">
        {/* Image */}
        <Image
          source={{ uri: spot.image }}
          resizeMode="cover"
          className="h-full w-[140px] bg-slate-200"
        />

        {/* Details */}
        <View className="flex-1 px-10 py-3">
          <Text className="font-poppins font-bold text-[12px] text-textMuted">
            Date Arrival
          </Text>

          <Text className="font-poppins text-[12px] text-textMuted">
            {spot.arrival}
          </Text>

          <Text className="mt-8 font-poppins font-bold text-[12px] text-textMuted">
            Date Departure
          </Text>

        <Text className="font-poppins text-[12px] text-textMuted">
            {spot.departure}
          </Text>
        </View>
      </View>
    </View>
  );
}
