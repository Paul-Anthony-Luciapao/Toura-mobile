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
      className={`w-full overflow-hidden rounded-[18px] bg-white shadow-md shadow-black/10 ${className}`}
    >
      {/* Image */}
      <Image
        source={{ uri: spot.image }}
        resizeMode="cover"
        className="h-[180px] w-full bg-slate-200"
      />

      {/* Content */}
      <View className="px-3 pb-4 pt-3">
        {/* Name */}
        <Text
          className="font-poppins-semibold text-[15px] text-textMain"
          numberOfLines={1}
        >
          {spot.name}
        </Text>

        {/* Municipality */}
        <Text className="mt-1 font-poppins text-[12px] text-textMuted">
          · {spot.municipality}
        </Text>

        {/* Rating + Price */}
        <View className="mt-2 flex-row items-center justify-between">
          {/* Rating */}
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

          {/* Price */}
          <Text className="font-poppins-bold text-[13px] text-textMain">
            $ {spot.price.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
