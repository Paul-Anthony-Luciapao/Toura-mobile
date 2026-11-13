import type { Destination } from "@/types/activities";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = Readonly<{
  destination: Destination;
  onPress?: (destination: Destination) => void;
  className?: string;
}>;

export default function DestinationCard({
  destination,
  onPress,
  className = "mr-3.5 w-[280px]",
}: Props) {
  const activityPreview = destination.activities
    .slice(0, 3)
    .map((activity) => activity.name)
    .join(" · ");

  return (
    <Pressable
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={`${destination.name}, ${destination.activities.length} activities`}
      onPress={onPress ? () => onPress(destination) : undefined}
      className={`rounded-[18px] border border-coral-100 bg-white p-4 shadow-sm shadow-black/[0.06] active:opacity-80 ${className}`}
    >
      <View className="mb-3 h-10 w-10 items-center justify-center rounded-full bg-coral-50">
        <Ionicons name="location" size={19} color="#E88768" />
      </View>

      <Text className="font-poppins-semibold text-[17px] text-textMain">
        {destination.name}
      </Text>
      <Text className="mt-1 font-poppins-medium text-[12px] text-coral-500">
        {destination.subtitle}
      </Text>

      <View className="mt-3 flex-row items-center">
        <Ionicons name="map-outline" size={14} color="#64748B" />
        <Text className="ml-1 font-poppins text-[11px] text-textMuted">
          {destination.location}
        </Text>
      </View>

      <Text
        numberOfLines={3}
        className="mt-3 min-h-[54px] font-poppins text-[12px] leading-[18px] text-textMuted"
      >
        {destination.description}
      </Text>

      <View className="mt-3 border-t border-slate-100 pt-3">
        <View className="flex-row items-center">
          <Ionicons name="sparkles-outline" size={14} color="#E88768" />
          <Text className="ml-1 font-poppins-semibold text-[11px] text-textMain">
            {destination.activities.length} activities
          </Text>
        </View>
        <Text
          numberOfLines={2}
          className="mt-1 font-poppins text-[11px] leading-[16px] text-textMuted"
        >
          {activityPreview}
        </Text>
      </View>
    </Pressable>
  );
}
