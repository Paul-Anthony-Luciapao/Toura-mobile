import { TouristSpot } from "@/data/types";
import { Image, Text, View } from "react-native";

export type ItineraryCardData = TouristSpot & {
  arrival?: string;
  departure?: string;
  days?: string;
};

type Props = Readonly<{
  spot: ItineraryCardData;
  className?: string;
}>;

export default function ItineraryCards({ spot, className = "" }: Props) {
  const arrival = spot.arrival ?? "To be confirmed";
  const departure = spot.departure ?? "To be confirmed";

  return (
    <View className={`w-full ${className}`}>
      <Text
        className="mb-2 font-poppins-semibold text-[15px] text-textMain"
        numberOfLines={1}
      >
        {spot.name} Package
      </Text>

      <View className="h-[140px] w-full flex-row overflow-hidden rounded-[18px] bg-white shadow-md shadow-black/10">
        {/* Image */}
        <Image
          source={{ uri: spot.image }}
          resizeMode="cover"
          className="h-full w-[140px] bg-slate-200"
        />

        <View className="flex-1 justify-center px-6 py-3">
          <Text className="font-poppins font-bold text-[12px] text-textMuted">
            Date of Arrival
          </Text>
          <Text className="font-poppins text-[12px] text-textMuted">
            {arrival}
          </Text>
          <Text className="mt-5 font-poppins font-bold text-[12px] text-textMuted">
            Date of Departure
          </Text>
          <Text className="font-poppins text-[12px] text-textMuted">
            {departure}
          </Text>
        </View>
      </View>
    </View>
  );
}
