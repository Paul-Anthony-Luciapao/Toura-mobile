import { safeBack } from "@/lib/navigation";
import { adventureActivities, palawanDestinations } from "@/data/activities";
import { getActivityImage } from "@/data/activityImages";
import type { Activity } from "@/types/activities";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ActivityDetailScreen() {
  const { destinationId: rawDestinationId, activityId: rawActivityId } =
    useLocalSearchParams<{
      destinationId?: string | string[];
      activityId?: string | string[];
    }>();
  const destinationId = Array.isArray(rawDestinationId)
    ? rawDestinationId[0]
    : rawDestinationId;
  const activityId = Array.isArray(rawActivityId)
    ? rawActivityId[0]
    : rawActivityId;
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const destination = palawanDestinations.find(
    (item) => item.id === destinationId,
  );
  const activity: Activity | undefined =
    destinationId === "adventure"
      ? adventureActivities.find((item) => item.id === activityId)
      : destination?.activities.find((item) => item.id === activityId);
  const place = destination?.name ?? "Palawan";
  const location = destination?.location ?? "Palawan, Philippines";

  const openMap = async () => {
    if (!activity) return;
    const placeQuery = destination
      ? `${place}, Palawan, Philippines`
      : "Palawan, Philippines";
    const query = encodeURIComponent(`${activity.name}, ${placeQuery}`);
    await Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
    );
  };

  if (!activity) {
    return (
      <View
        className="flex-1 items-center justify-center bg-white px-8"
        style={{ paddingTop: insets.top }}
      >
        <Ionicons name="sparkles-outline" size={36} color="#D97264" />
        <Text className="mt-3 text-center font-poppins-semibold text-[17px] text-slate-900">
          Activity details unavailable
        </Text>
        <Text className="mt-2 text-center font-poppins text-[13px] text-slate-500">
          This activity could not be found.
        </Text>
        <Pressable
          onPress={() => safeBack()}
          className="mt-4 rounded-full bg-[#4F9B8F] px-4 py-2"
        >
          <Text className="font-poppins-medium text-[13px] text-white">
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="pb-10">
      <View className="relative">
        <Image
          source={getActivityImage(activity.id, destinationId ?? "adventure")}
          resizeMode="cover"
          accessibilityLabel={`${activity.name} in ${place}`}
          className="h-[270px] w-full bg-coral-50"
        />
        <Pressable
          onPress={() => safeBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-5 h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm"
          style={{ top: insets.top + 8 }}
        >
          <Ionicons name="chevron-back" size={21} color="#0f172a" />
        </Pressable>
      </View>

      <View className="px-5 pt-5">
        <Text className="font-poppins-medium text-[12px] uppercase tracking-wide text-[#4F9B8F]">
          {place}, Palawan
        </Text>
        <Text className="mt-1 font-poppins-semibold text-[25px] leading-8 text-[#111729]">
          {activity.name}
        </Text>

        <View className="mt-5 border-t border-slate-100 pt-4">
          <Text className="font-poppins-semibold text-[17px] text-slate-900">
            About this activity
          </Text>
          <Text className="mt-2 font-poppins text-[14px] leading-[22px] text-slate-600">
            {activity.description}
          </Text>
        </View>

        {activity.category || activity.difficulty || activity.estimatedDuration ? (
          <View className="mt-5 flex-row flex-wrap gap-2">
            {activity.category ? (
              <View className="rounded-full bg-coral-50 px-3 py-2">
                <Text className="font-poppins-medium text-[12px] text-coral-600">
                  {activity.category}
                </Text>
              </View>
            ) : null}
            {activity.difficulty ? (
              <View className="rounded-full bg-slate-100 px-3 py-2">
                <Text className="font-poppins-medium text-[12px] text-slate-700">
                  {activity.difficulty}
                </Text>
              </View>
            ) : null}
            {activity.estimatedDuration ? (
              <View className="rounded-full bg-slate-100 px-3 py-2">
                <Text className="font-poppins-medium text-[12px] text-slate-700">
                  {activity.estimatedDuration}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}

        <View className="mt-5 rounded-2xl border border-slate-100 p-4">
          <View className="flex-row items-start">
            <Ionicons name="location-outline" size={20} color="#D97264" />
            <View className="ml-3 flex-1">
              <Text className="font-poppins-semibold text-[14px] text-slate-900">
                Where to find it
              </Text>
              <Text className="mt-1 font-poppins text-[13px] leading-5 text-slate-600">
                {destination
                  ? `${place}, ${location}`
                  : `Popular locations across ${location}`}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => void openMap()}
            accessibilityRole="link"
            className="mt-4 flex-row items-center justify-center rounded-xl bg-[#4F9B8F] py-3"
          >
            <Ionicons name="map-outline" size={17} color="white" />
            <Text className="ml-2 font-poppins-medium text-[13px] text-white">
              Open in Maps
            </Text>
          </Pressable>
        </View>

        {activity.highlights?.length ? (
          <View className="mt-5">
            <Text className="font-poppins-semibold text-[17px] text-slate-900">
              Highlights
            </Text>
            {activity.highlights.map((highlight) => (
              <View key={highlight} className="mt-3 flex-row items-start">
                <Ionicons name="checkmark-circle" size={17} color="#4F9B8F" />
                <Text className="ml-2 flex-1 font-poppins text-[13px] leading-5 text-slate-600">
                  {highlight}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {activity.tips?.length ? (
          <View className="mt-5 rounded-2xl bg-[#F8FAFC] p-4">
            <Text className="font-poppins-semibold text-[15px] text-slate-900">
              Before you go
            </Text>
            {activity.tips.map((tip) => (
              <Text
                key={tip}
                className="mt-2 font-poppins text-[13px] leading-5 text-slate-600"
              >
                • {tip}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
