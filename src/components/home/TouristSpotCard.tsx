import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export type TouristSpotCardData = {
  id: string;
  name: string;
  municipality: string;
  image: string;
  rating: number;
  reviewCount: string;
  price: number;
};

type Props = Readonly<{
  spot: TouristSpotCardData;
  className?: string;
}>;

export default function TouristSpotCard({
  spot,
  className = "",
}: Props) {
  return (
    <View
      className={`overflow-hidden rounded-3xl bg-surface ${className}`}
    >
      {/* Image */}
      <Image
        source={{ uri: spot.image }}
        resizeMode="cover"
        className="h-[180px] w-full rounded-3xl bg-surfaceMuted"
      />

      {/* Content */}
      <View className="px-3 pb-4 pt-3">
        <Text
          className="font-poppins-semibold text-[15px] text-textMain"
          numberOfLines={1}
        >
          {spot.name}
        </Text>

        <Text className="mt-1 font-poppins text-[12px] text-textMuted">
          · {spot.municipality}
        </Text>

        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center gap-[3px]">
            <Ionicons
              name="star"
              size={13}
              color={colors.primary}
            />

            <Text className="font-poppins text-[12px] text-textMuted">
              {spot.rating} ({spot.reviewCount})
            </Text>
          </View>

          <Text className="font-poppins-bold text-[13px] text-textMain">
            $ {spot.price.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}