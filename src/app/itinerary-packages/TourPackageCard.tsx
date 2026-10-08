import { formatCurrency, formatReviewCount } from "@/lib/formatters";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";

type Props = Readonly<{
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  /** Line under the title, e.g. "· 2 Beds · Free breakfast". */
  detail: string;
  days: number;
  price: number;
  /** The most popular package shows the "Popular" badge instead of a heart. */
  isPopular: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
}>;

// No reviewer photos exist in the data, so the avatar stack uses placeholder initials.
const AVATARS = [
  { initial: "A", color: "#4F9B8F" },
  { initial: "M", color: "#EA8677" },
  { initial: "J", color: "#364153" },
  { initial: "L", color: "#878A93" },
] as const;

export default function TourPackageCard({
  title,
  image,
  rating,
  reviewCount,
  detail,
  days,
  price,
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
      className="active:opacity-90">
      {/* Image */}
      <View className="overflow-hidden rounded-[16px] bg-slate-200">
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          className="h-[196px] w-full"
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

        {isPopular ? (
          <View className="absolute right-[20px] top-[19px] rounded-full bg-[#418076] px-[10px] py-[2px]">
            <Text className="font-poppins-medium text-[12px] text-white">
              Popular
            </Text>
          </View>
        ) : (
          <Pressable
            onPress={onToggleFavorite}
            hitSlop={10}
            accessibilityLabel={isFavorite ? "Remove favorite" : "Add favorite"}
            className="absolute right-[20px] top-[19px]">
            <Ionicons
              name="heart"
              size={26}
              color={isFavorite ? "#EA8677" : "rgba(255,255,255,0.8)"}
            />
          </Pressable>
        )}

        {/* Avatars + rating */}
        <View className="absolute bottom-[12px] left-[20px] flex-row items-center">
          <View className="flex-row">
            {AVATARS.map((avatar, index) => (
              <View
                key={avatar.initial}
                className="h-[20px] w-[20px] items-center justify-center rounded-full border-[1.5px] border-white"
                style={{
                  backgroundColor: avatar.color,
                  marginLeft: index === 0 ? 0 : -8,
                }}>
                <Text className="font-poppins-semibold text-[9px] text-white">
                  {avatar.initial}
                </Text>
              </View>
            ))}
          </View>

          <Ionicons
            name="star"
            size={14}
            color="#D97264"
            style={{ marginLeft: 8 }}
          />
          <Text className="ml-1 font-poppins text-[11px] text-white">
            {rating.toFixed(1)} ({formatReviewCount(reviewCount)})
          </Text>
        </View>
      </View>

      {/* Text */}
      <View className="pt-2">
        <Text
          className="font-poppins text-[16px] leading-6 text-[#111729]"
          numberOfLines={1}>
          {title}
        </Text>

        <View className="mt-0.5 flex-row items-center">
          <Text
            className="flex-1 pr-3 font-poppins text-[12px] text-[#364153]"
            numberOfLines={1}>
            {detail}
          </Text>

          <Text className="font-poppins text-[13px] text-[#364153]">
            {days} Days
          </Text>

          <Text className="ml-3 font-poppins-semibold text-[14px] text-[#111729]">
            {formatCurrency(price)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
