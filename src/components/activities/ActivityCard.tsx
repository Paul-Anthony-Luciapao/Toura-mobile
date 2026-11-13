import type { Activity } from "@/types/activities";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";

type Props = Readonly<{
  activity: Activity;
  place: string;
  image: ImageSourcePropType;
  onPress: () => void;
}>;

export default function ActivityCard({ activity, place, image, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${activity.name} in ${place}`}
      onPress={onPress}
      className="overflow-hidden rounded-[16px] border border-coral-100 bg-white shadow-sm shadow-black/[0.06] active:opacity-90"
    >
      <Image
        source={image}
        accessibilityLabel={`${activity.name} in ${place}`}
        resizeMode="cover"
        className="h-[196px] w-full bg-slate-100"
      />

      <View className="p-4">
        <Text className="font-poppins-semibold text-[16px] leading-6 text-[#111729]">
          {activity.name}
        </Text>
        <Text
          numberOfLines={3}
          className="mt-1 font-poppins text-[12px] leading-[18px] text-[#364153]"
        >
          {activity.description}
        </Text>

        <View className="mt-4 flex-row items-center justify-between border-t border-slate-100 pt-3">
          <Text className="font-poppins text-[11px] text-[#364153]">
            {place}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="sparkles-outline" size={13} color="#D97264" />
            <Text className="ml-1 font-poppins-medium text-[11px] text-slate-500">
              {activity.category ?? "Activity"}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
