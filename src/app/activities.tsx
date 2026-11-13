import { safeBack } from "@/lib/navigation";
import ActivityCard from "@/components/activities/ActivityCard";
import SearchBar from "@/components/common/SearchBar";
import { getActivityImage } from "@/data/activityImages";
import { adventureActivities, palawanDestinations } from "@/data/activities";
import type { Activity } from "@/types/activities";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ADVENTURE_FILTER = "Fun & Adventure";
const CATEGORY_WIDTHS: Record<string, number> = {
  All: 52,
  Coron: 64,
  "El Nido": 72,
  "Puerto Princesa": 124,
  "Port Barton & San Vicente": 172,
  [ADVENTURE_FILTER]: 142,
};

type ActivityListing = {
  id: string;
  destinationId: string;
  municipality: string;
  place: string;
  activity: Activity;
};

const ACTIVITY_LISTINGS: ActivityListing[] = [
  ...palawanDestinations.flatMap((destination) =>
    destination.activities.map((activity) => ({
      id: `${destination.id}-${activity.id}`,
      destinationId: destination.id,
      municipality: destination.name,
      place: destination.name,
      activity,
    })),
  ),
  ...adventureActivities.map((activity) => ({
    id: `adventure-${activity.id}`,
    destinationId: "adventure",
    municipality: ADVENTURE_FILTER,
    place: "Palawan",
    activity,
  })),
];

function ActivityCategoryChip({
  item,
  selected,
  onPress,
}: {
  item: string;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(selected ? 1 : 0)).current;
  const width = CATEGORY_WIDTHS[item] ?? 124;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: selected ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress, selected]);

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F1F5F9", "#4F9B8F"],
  });
  const borderColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E2E8F0", "#4F9B8F"],
  });
  const textColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["#334155", "#FFFFFF"],
  });

  const animateScale = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 28,
      bounciness: 5,
    }).start();
  };

  return (
    <Animated.View
      style={{
        width,
        height: 32,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: width,
        transform: [{ scale }],
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={item}
        onPress={onPress}
        onPressIn={() => animateScale(0.94)}
        onPressOut={() => animateScale(1)}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            borderWidth: 1,
            backgroundColor,
            borderColor,
            paddingHorizontal: 10,
          }}
        >
          <Animated.Text
            numberOfLines={1}
            style={{
              color: textColor,
              fontFamily: "Poppins_500Medium",
              fontSize: 12,
              lineHeight: 16,
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            {item}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

export default function ActivitiesScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [municipality, setMunicipality] = useState("All");
  const categories = [
    "All",
    ...palawanDestinations.map((destination) => destination.name),
    ADVENTURE_FILTER,
  ];

  const activities = ACTIVITY_LISTINGS.filter((listing) => {
    const matchesMunicipality =
      municipality === "All" || listing.municipality === municipality;
    const term = search.trim().toLocaleLowerCase();
    const matchesSearch =
      !term ||
      listing.activity.name.toLocaleLowerCase().includes(term) ||
      listing.activity.description.toLocaleLowerCase().includes(term) ||
      listing.place.toLocaleLowerCase().includes(term);

    return matchesMunicipality && matchesSearch;
  });

  const openActivity = (destinationId: string, activityId: string) => {
    router.push({
      pathname: "/activities/[destinationId]/[activityId]",
      params: { destinationId, activityId },
    });
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center gap-3 px-5 pb-4">
        <Pressable
          onPress={() => safeBack()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-9 w-9 items-center justify-center rounded-full border border-slate-200"
        >
          <Ionicons name="chevron-back" size={20} color="#0f172a" />
        </Pressable>
        <Text className="flex-1 font-poppins-semibold text-[18px] text-slate-900">
          Activities in Palawan
        </Text>
      </View>

      <View className="px-5 pb-3">
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search activities or places"
          accessibilityLabel="Search activities"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 42, flexGrow: 0, flexShrink: 0 }}
        contentContainerStyle={{
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 20,
        }}
      >
        {categories.map((item) => (
          <ActivityCategoryChip
            key={item}
            item={item}
            selected={municipality === item}
            onPress={() => setMunicipality(item)}
          />
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{
          width: "100%",
          maxWidth: 720,
          alignSelf: "center",
          gap: 16,
          paddingHorizontal: 20,
          paddingBottom: 40,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        {activities.length ? (
          activities.map((listing) => (
            <ActivityCard
              key={listing.id}
              activity={listing.activity}
              place={listing.place}
              image={getActivityImage(
                listing.activity.id,
                listing.destinationId,
              )}
              onPress={() =>
                openActivity(listing.destinationId, listing.activity.id)
              }
            />
          ))
        ) : (
          <View className="items-center px-6 pt-12">
            <Text className="text-center font-poppins-semibold text-[15px] text-slate-800">
              No activities found
            </Text>
            <Text className="mt-2 text-center font-poppins text-[13px] text-slate-500">
              Try another activity name or place, or clear your filters.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setSearch("");
                setMunicipality("All");
              }}
              className="mt-4 rounded-full border border-slate-200 px-4 py-2 active:opacity-70"
            >
              <Text className="font-poppins-medium text-[13px] text-slate-700">
                Clear filters
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
