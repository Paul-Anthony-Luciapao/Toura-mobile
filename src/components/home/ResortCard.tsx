import { formatCurrency } from "@/lib/formatters";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export type ResortCardData = {
  id: string;
  name: string;
  municipality: string;
  location: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  basePrice: number;
  tagline: string;
};

type Props = Readonly<{
  resort: ResortCardData;
}>;

export default function ResortCard({ resort }: Props) {
  return (
    <Link
      href={{ pathname: "/resort/[id]", params: { id: resort.id } }}
      asChild>
      <Pressable className="mr-4 w-[280px] overflow-hidden rounded-[18px] border border-coral-100 bg-white shadow-sm shadow-black/[0.06]">
        <Image
          source={{ uri: resort.coverImage }}
          className="h-[190px] w-full bg-coral-100"
        />

        <View className="p-[14px]">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-[12px] font-bold text-coral-400">
              {resort.municipality}
            </Text>
            <Text className="text-[12px] font-bold text-coral-300">
              ★ {resort.rating}
            </Text>
          </View>

          <Text className="mb-1.5 text-[18px] font-extrabold text-ink">
            {resort.name}
          </Text>
          <Text className="min-h-[36px] text-[12px] leading-[18px] text-ink-600">
            {resort.tagline}
          </Text>

          <View className="mt-3 flex-row items-end justify-between">
            <View>
              <Text className="text-[18px] font-extrabold text-coral-600">
                {formatCurrency(resort.basePrice)}
              </Text>
              <Text className="text-[11px] text-ink-500">per night</Text>
            </View>
            <Text className="text-[11px] font-bold text-ink-500">
              {resort.reviewCount} reviews
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
