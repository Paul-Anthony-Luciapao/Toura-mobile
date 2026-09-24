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
      <Pressable className="mr-4 w-[280px] overflow-hidden rounded-[18px] bg-white shadow-sm shadow-black/5">
        <Image
          source={{ uri: resort.coverImage }}
          className="h-[190px] w-full bg-slate-200"
        />

        <View className="p-[14px]">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-[12px] font-bold text-[#0f766e]">
              {resort.municipality}
            </Text>
            <Text className="text-[12px] font-bold text-[#f59e0b]">
              ★ {resort.rating}
            </Text>
          </View>

          <Text className="mb-1.5 text-[18px] font-extrabold text-slate-900">
            {resort.name}
          </Text>
          <Text className="min-h-[36px] text-[12px] leading-[18px] text-slate-700">
            {resort.tagline}
          </Text>

          <View className="mt-3 flex-row items-end justify-between">
            <View>
              <Text className="text-[18px] font-extrabold text-slate-900">
                {formatCurrency(resort.basePrice)}
              </Text>
              <Text className="text-[11px] text-slate-500">per night</Text>
            </View>
            <Text className="text-[11px] font-bold text-slate-500">
              {resort.reviewCount} reviews
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
