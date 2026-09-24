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
}>;

export default function TouristSpotCard({ spot }: Props) {
  return (
    <View className="w-[170px] overflow-hidden rounded-t-[18px] bg-white">
      <Image
        source={{ uri: spot.image }}
        className="h-[130px] w-full bg-slate-200"
      />
      <View className="pt-2">
        <Text
          className="text-[14px] font-semibold text-slate-900"
          numberOfLines={1}>
          {spot.name}
        </Text>
        <Text className="mt-1 mb-1.5 text-[12px] text-slate-500">
          · {spot.municipality}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-[3px]">
            <Ionicons name="star" size={13} color="#0f766e" />
            <Text className="text-[12px] text-slate-500">
              {spot.rating} ({spot.reviewCount})
            </Text>
          </View>
          <Text className="text-[13px] font-bold text-slate-900">
            $ {spot.price.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
