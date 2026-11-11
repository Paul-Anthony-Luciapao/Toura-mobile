import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import type { Hotel } from "@/types/hotel";

type Props = Readonly<{
  hotel: Hotel;
  onPress: () => void;
}>;

export default function HotelCard({ hotel, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View details for ${hotel.name}`}
      onPress={onPress}
      className="overflow-hidden rounded-[16px] border border-coral-100 bg-white shadow-sm shadow-black/[0.06] active:opacity-90"
    >
      <Image
        source={hotel.image}
        resizeMode="cover"
        accessibilityLabel={`${hotel.name} hotel photo`}
        className="h-[196px] w-full bg-slate-100"
      />
      <View className="p-4">
        <Text className="font-poppins-semibold text-[16px] leading-6 text-[#111729]">
          {hotel.name}
        </Text>
        <Text className="mt-1 font-poppins text-[12px] leading-[18px] text-[#364153]">
          {hotel.description}
        </Text>
        <View className="mt-4 flex-row items-center justify-between border-t border-slate-100 pt-3">
          <Text className="font-poppins text-[11px] text-[#364153]">
            {hotel.municipality}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="bed-outline" size={13} color="#D97264" />
            <Text className="ml-1 font-poppins-medium text-[11px] text-slate-500">
              Hotel
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
