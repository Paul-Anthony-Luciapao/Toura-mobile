import type { Driver, TouristSpot } from "@/data/types";
import { Text, View } from "react-native";

type Props = Readonly<{
  itinerary: TouristSpot;
  driver: Driver;
  dayName: string;
}>;

export default function DrawerContent({
  itinerary,
  driver,
  dayName,
}: Props) {
  return (
    <View>
      <Text className="font-poppins-semibold text-[14px] text-textMain">
        {dayName}
      </Text>

      <View className="mt-2 gap-1">
        <Text className="font-poppins text-[13px] text-textMuted">
          {"\u2022"} Time — Country
        </Text>

        <Text className="font-poppins text-[13px] text-textMuted">
          {"\u2022"} Time — Airport Pick-up
        </Text>
      </View>

      <Text className="mt-4 font-poppins-semibold text-[14px] text-textMain">
        Transportation
      </Text>

      <View className="mt-2 gap-1">
        <Text className="font-poppins text-[13px] text-textMuted">
          {"\u2022"} Name of Driver: {driver.name}
        </Text>

        <Text className="font-poppins text-[13px] text-textMuted">
          {"\u2022"} Plate Number: {driver.plateNumber}
        </Text>

        <Text className="font-poppins text-[13px] text-textMuted">
          {"\u2022"} Car: {driver.car}
        </Text>

        <Text className="font-poppins text-[13px] text-textMuted">
          {"\u2022"} Mobile Number: {driver.mobileNumber}
        </Text>
      </View>

      <Text className="mt-4 font-poppins-semibold text-[14px] text-textMain">
        Hotel
      </Text>

      <Text className="mt-1 font-poppins text-[13px] leading-5 text-textMuted">
        {itinerary.description}
      </Text>
    </View>
  );
}