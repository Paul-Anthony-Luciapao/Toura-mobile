import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/global";
import { Image, Text, View } from "react-native";

export type TouristSpotCardData = {
  id: string;
  name: string;
  municipality: string;
  image: string;
  rating?: number;
  reviewCount?: string;
  price?: number;
};

type Props = Readonly<{
  spot: TouristSpotCardData;
}>;

export default function TouristSpotCard({ spot }: Props) {
  const hasRating = spot.rating !== undefined;

  return (
    <View className="w-[170px] overflow-hidden rounded-[18px] border border-coral-100 bg-white shadow-sm shadow-black/[0.06]">
      <Image
        source={{ uri: spot.image }}
        className="h-[130px] w-full bg-coral-100"
      />
      <View className="p-3">
        <Text
          className="text-[14px] font-semibold text-ink"
          numberOfLines={1}>
          {spot.name}
        </Text>
        <Text className="mt-1 mb-1.5 text-[12px] text-ink-500">
          · {spot.municipality}
        </Text>
        <View className="flex-row items-center justify-between">
          {hasRating ? (
            <View className="flex-row items-center gap-[3px]">
              <Ionicons name="star" size={13} color={colors.gold} />
              <Text className="text-[12px] text-ink-500">
                {spot.rating} ({spot.reviewCount})
              </Text>
            </View>
          ) : (
            <View />
          )}
          {spot.price !== undefined ? (
            <Text className="text-[13px] font-bold text-coral-600">
              $ {spot.price.toLocaleString()}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
