import { formatCurrency } from "@/lib/formatters";
import type { TourPackage } from "@/types/tourPackage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, Text, View } from "react-native";

type Props = Readonly<{
  item: TourPackage;
  image: ImageSourcePropType;
  onPress: () => void;
}>;

export default function HomeTourCard({ item, image, onPress }: Props) {
  const priceBasis = item.priceType === "per_group" ? "group" : "person";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.municipality}, ${item.duration}`}
      onPress={onPress}
      className="rounded-2xl border border-slate-200 bg-white active:opacity-90">
      <View className="overflow-hidden rounded-t-2xl bg-slate-200">
        <Image
          source={image}
          resizeMode="cover"
          style={{ width: "100%", height: 184 }}
        />
        <LinearGradient
          pointerEvents="none"
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.38)"]}
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 72 }}
        />
        <View className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1">
          <Text className="font-poppins-medium text-[11px] text-[#364153]">
            {item.category}
          </Text>
        </View>
        {item.rating ? (
          <View className="absolute bottom-3 left-3 flex-row items-center rounded-full bg-black/35 px-2.5 py-1">
            <Ionicons name="star" size={13} color="#FFD166" />
            <Text className="ml-1 font-poppins-medium text-xs text-white">
              {item.rating.toFixed(1)}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="px-3.5 pb-3.5 pt-3">
        <Text
          className="font-poppins-semibold text-base leading-6 text-[#111729]"
          numberOfLines={2}>
          {item.name}
        </Text>
        <View className="mt-2 flex-row items-center">
          <Ionicons name="location-outline" size={14} color="#64748B" />
          <Text className="ml-1 font-poppins text-xs text-slate-500" numberOfLines={1}>
            {item.municipality}
          </Text>
          <Ionicons name="time-outline" size={14} color="#64748B" style={{ marginLeft: 10 }} />
          <Text className="ml-1 font-poppins text-xs text-slate-500" numberOfLines={1}>
            {item.duration}
          </Text>
        </View>
        <View className="mt-3 flex-row items-center justify-between border-t border-slate-100 pt-3">
          <Text className="font-poppins text-xs text-slate-500">
            From <Text className="font-poppins-semibold text-base text-[#111729]">{formatCurrency(item.price)}</Text>
            <Text className="font-poppins text-xs text-slate-500">/{priceBasis}</Text>
          </Text>
          <Ionicons name="arrow-forward-circle" size={22} color="#418076" />
        </View>
      </View>
    </Pressable>
  );
}
