import { Dates } from "@/data/mockData";
import type { TouristSpot } from "@/data/types";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";


type Props = Readonly<{
  spot: TouristSpot;
  date: (typeof Dates)[number];
  className?: string;
}>;

const ItineraryCards = ({ spot, date, className = "" }: Props) => (
  <View className={`w-full ${className}`}>
    <Text
      className="mb-2 text-lg font-bold text-slate-900"
      numberOfLines={1}
    >
      {spot.name}
    </Text>

    <Link
      href={{
        pathname: "/itinerary-packages/[id]",
        params: { id: spot.id, source: "my-itineraries" },
      }}
      asChild
    >
      <Pressable className="h-[120px] w-full flex-row overflow-hidden rounded-[18px] bg-white shadow-md shadow-black/10 active:opacity-70">
        <Image
          source={{ uri: spot.image }}
          resizeMode="cover"
          className="h-full w-[130px] bg-slate-200"
        />

        <View className="flex-1 justify-center p-3">
          <Text className="font-poppins text-[11px] font-bold text-textMuted">
            Date of Arrival
          </Text>
          <Text className="font-poppins text-[12px] text-textMuted">
            {date.daysOfWeek[0]} {date.dateArrival}
          </Text>

          <Text className="mt-4 font-poppins text-[11px] font-bold text-textMuted">
            Date of Departure
          </Text>
          <Text className="font-poppins text-[12px] text-textMuted">
            {date.daysOfWeek[date.daysOfWeek.length - 1]} {date.dateDeparture}
          </Text>
        </View>
      </Pressable>
    </Link>
  </View>
);

export default ItineraryCards;
