import type { TouristSpot } from "@/data/types";
import { Image, Text, View } from "react-native";

export const Dates = [
  {
    dateArrival: "October 1, 2023",
    dateDeparture: "October 5, 2023",
    daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
  },
  {
    dateArrival: "October 10, 2023",
    dateDeparture: "October 15, 2023",
    daysOfWeek: [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    dateArrival: "October 20, 2023",
    dateDeparture: "October 25, 2023",
    daysOfWeek: [
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
    ],
  },
  {
    dateArrival: "November 1, 2023",
    dateDeparture: "November 5, 2023",
    daysOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  {
    dateArrival: "November 10, 2023",
    dateDeparture: "November 15, 2023",
    daysOfWeek: [
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
    ],
  },
];

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

    <View className="h-[120px] w-full flex-row overflow-hidden rounded-[18px] bg-white shadow-md shadow-black/10">
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
    </View>
  </View>
);

export default ItineraryCards;
