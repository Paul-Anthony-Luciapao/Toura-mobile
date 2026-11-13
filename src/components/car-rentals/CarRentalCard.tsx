import type { CarRentalProvider } from "@/types/carRental";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type Props = Readonly<{
  provider: CarRentalProvider;
  onPress: () => void;
}>;

export default function CarRentalCard({ provider, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View details for ${provider.name}`}
      onPress={onPress}
      className="h-[386px] overflow-hidden rounded-[16px] border border-coral-100 bg-white shadow-sm shadow-black/[0.06] active:opacity-90"
    >
      <Image
        source={provider.image}
        resizeMode="cover"
        accessibilityLabel={`${provider.name} rental vehicle`}
        className="h-[176px] w-full bg-[#EAF5F2]"
      />

      <View className="h-[210px] p-4">
        <Text
          numberOfLines={2}
          className="h-12 font-poppins-semibold text-[16px] leading-6 text-[#111729]"
        >
          {provider.name}
        </Text>

        <View className="mt-2 h-[18px] flex-row items-center">
          <Ionicons name="location-outline" size={15} color="#D97264" />
          <Text numberOfLines={1} className="ml-1 flex-1 font-poppins text-[12px] text-[#364153]">
            {provider.location}
          </Text>
          <View className="ml-2 flex-row items-center">
            <Ionicons
              name={provider.rating !== undefined ? "star" : "chevron-forward"}
              size={13}
              color={provider.rating !== undefined ? "#E3A326" : "#64748B"}
            />
            {provider.rating !== undefined ? (
              <Text className="ml-1 font-poppins-medium text-[12px] text-[#364153]">
                {provider.rating.toFixed(1)}
              </Text>
            ) : null}
          </View>
        </View>

        <View className="mt-4 flex-1 border-t border-slate-100 pt-3">
          <Text
            numberOfLines={2}
            className="font-poppins text-[12px] leading-[18px] text-[#364153]"
          >
            {provider.services.length
              ? provider.services.join(" · ")
              : "Tap to view this provider's rental options."}
          </Text>
          <View className="mt-auto flex-row items-center justify-end">
            <Text className="font-poppins-medium text-[11px] text-[#4F9B8F]">
              View details
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color="#4F9B8F"
              style={{ marginLeft: 3 }}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
