import { formatCurrency, formatReviewCount } from "@/lib/formatters";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, Text, View } from "react-native";

type Props = Readonly<{
  title: string;
  image: ImageSourcePropType;
  rating: number;
  reviewCount: number;
  /** Short activity preview shown under the title. */
  detail: string;
  duration: string;
  price: number;
  priceBasis: string;
  /** The most popular package shows the "Popular" badge instead of a heart. */
  isPopular: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
}>;

export default function TourPackageCard({
  title,
  image,
  rating,
  reviewCount,
  detail,
  duration,
  price,
  priceBasis,
  isPopular,
  isFavorite,
  onToggleFavorite,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      className="rounded-2xl border border-slate-200 bg-white active:opacity-90">
      {/* Image */}
      <View className="overflow-hidden rounded-t-2xl bg-slate-200">
        <Image
          source={image}
          resizeMode="cover"
          style={{ width: "100%", height: 184 }}
          className="h-[184px] w-full"
        />

        {/* Keeps the rating readable over bright photos */}
        <LinearGradient
          pointerEvents="none"
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 80,
          }}
        />

        {isPopular && (
          <View className="absolute left-3 top-3 rounded-full bg-[#418076] px-3 py-1">
            <Text className="font-poppins-medium text-[12px] text-white">
              Popular
            </Text>
          </View>
        )}

        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? "Remove favorite" : "Add favorite"}
          className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-black/30">
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#EA8677" : "white"}
          />
        </Pressable>

        {/* Rating */}
        <View className="absolute bottom-3 left-3 flex-row items-center rounded-full bg-black/35 px-2.5 py-1">
          <Ionicons name="star" size={14} color="#FFD166" />
          <Text className="ml-1 font-poppins-medium text-xs text-white">
            {rating.toFixed(1)} ({formatReviewCount(reviewCount)})
          </Text>
        </View>
      </View>

      {/* Text */}
      <View className="px-3.5 pb-3.5 pt-3">
        <Text
          className="font-poppins-semibold text-base leading-6 text-[#111729]"
          numberOfLines={2}>
          {title}
        </Text>

        <View className="mt-2 flex-row items-center">
          <Ionicons name="time-outline" size={14} color="#64748B" />
          <Text className="ml-1.5 font-poppins-medium text-xs text-slate-600">
            {duration}
          </Text>
        </View>

        <Text
          className="mt-1.5 font-poppins text-xs leading-5 text-slate-500"
          numberOfLines={1}>
          {detail}
        </Text>

        <View className="mt-3 flex-row items-center justify-between border-t border-slate-100 pt-3">
          <Text
            className="font-poppins text-xs text-slate-500">
            From <Text className="font-poppins-semibold text-base text-[#111729]">{formatCurrency(price)}</Text>
            <Text className="font-poppins text-xs text-slate-500">/{priceBasis}</Text>
          </Text>
          <Ionicons name="arrow-forward-circle" size={22} color="#418076" />
        </View>
      </View>
    </Pressable>
  );
}
