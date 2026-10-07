import { formatCurrency, formatReviewCount } from "@/lib/formatters";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export type TouristSpotCardData = {
  id: string;
  name: string;
  municipality: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
};

type Props = Readonly<{
  spot: TouristSpotCardData;
  className?: string;
  /** Set false to render the card without navigation (e.g. static previews). */
  navigable?: boolean;
}>;

export default function TouristSpotCard({
  spot,
  className = "",
  navigable = true,
}: Props) {
  const content = (
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
            <Ionicons name="star" size={13} color={colors.primary} />

            <Text className="font-poppins text-[12px] text-textMuted">
              {spot.rating} ({formatReviewCount(spot.reviewCount)})
            </Text>
          </View>

          {/* Price */}
          <Text className="font-poppins-bold text-[13px] text-textMain">
            {formatCurrency(spot.price)}
          </Text>
        </View>
      </View>
    </View>
  );

  if (!navigable) {
    return content;
  }

  return (
    <Link
      href={{
        pathname: "/itinerary-packages/[id]",
        params: { id: spot.id },
      }}
      asChild
    >
      <Pressable
        className={`w-full overflow-hidden rounded-[18px] bg-white shadow-md shadow-black/10 active:opacity-70 ${className}`}
      >
        {content}
      </Pressable>
    </Link>
  );
}
