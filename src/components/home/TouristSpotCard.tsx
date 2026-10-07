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

export default function TouristSpotCard({ spot, className = "" }: Props) {
  return (
    <View
      className={`w-full overflow-hidden rounded-[18px] bg-white shadow-md shadow-black/10 ${className}`}>
      {/* Image */}
      <Image
        source={{ uri: spot.image }}
        className="h-[130px] w-full bg-slate-200"
      />
      <View className="pt-2">
        <Text
          className="font-poppins-semibold text-[15px] text-textMain"
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
