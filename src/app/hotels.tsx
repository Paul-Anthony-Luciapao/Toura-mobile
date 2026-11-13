import { safeBack } from "@/lib/navigation";
import SearchBar from "@/components/common/SearchBar";
import HotelCard from "@/components/hotels/HotelCard";
import Skeleton from "@/components/ui/Skeleton";
import { getErrorMessage } from "@/services/api";
import { fetchHotels } from "@/services/hotels";
import type { Hotel } from "@/types/hotel";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Animated,
    Easing,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MUNICIPALITY_CHIP_WIDTHS: Record<string, number> = {
  All: 52,
  Coron: 64,
  "El Nido": 72,
  "Puerto Princesa": 124,
};

const PRIMARY_COLOR = "#4F9B8F";
const INACTIVE_COLOR = "#F1F5F9";

// Municipality Chip Component
function MunicipalityChip({
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

  useEffect(() => {
    Animated.timing(progress, {
      toValue: selected ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [selected, progress]);

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [INACTIVE_COLOR, PRIMARY_COLOR],
  });

  const borderColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E2E8F0", PRIMARY_COLOR],
  });

  const textColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["#334155", "#FFFFFF"],
  });

  const width = MUNICIPALITY_CHIP_WIDTHS[item] ?? 124;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 25,
      bounciness: 6,
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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={{
            flex: 1,
            width,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            borderWidth: 1,
            backgroundColor,
            borderColor,
            paddingHorizontal: 12,
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

// Animated Hotel Card Component
function AnimatedHotelCard({
  hotel,
  index,
}: {
  hotel: Hotel;
  index: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(20);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      <HotelCard
        hotel={hotel}
        onPress={() => router.push({ pathname: "/hotel/[id]", params: { id: hotel.id } })}
      />
    </Animated.View>
  );
}

// Main Hotels Screen
export default function HotelsScreen() {
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState("");
  const [municipality, setMunicipality] = useState("All");
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setAllHotels(await fetchHotels());
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadHotels();
  }, [loadHotels]);

  // Municipality List
  const municipalities = useMemo(
    () => [
      "All",
      ...new Set(allHotels.map((hotel) => hotel.municipality).sort()),
    ],
    [allHotels],
  );

  // Hotel Filtering
  const hotels = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();

    return allHotels.filter((hotel) => {
      const matchesMunicipality =
        municipality === "All" || hotel.municipality === municipality;

      const matchesSearch =
        !term ||
        hotel.name.toLocaleLowerCase().includes(term) ||
        hotel.municipality.toLocaleLowerCase().includes(term) ||
        hotel.description.toLocaleLowerCase().includes(term);

      return matchesMunicipality && matchesSearch;
    });
  }, [allHotels, municipality, search]);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top + 8 }}>
      {/* Header */}
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

        <Text className="flex-1 font-['Poppins_600SemiBold'] text-[18px] text-slate-900">
          Hotels in Palawan
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 pb-3">
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search hotel or municipality"
          accessibilityLabel="Search hotels"
        />
      </View>

      {/* Municipality Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          height: 42,
          flexGrow: 0,
          flexShrink: 0,
        }}
        contentContainerStyle={{
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 20,
        }}
      >
        {municipalities.map((item) => (
          <MunicipalityChip
            key={item}
            item={item}
            selected={municipality === item}
            onPress={() => setMunicipality(item)}
          />
        ))}
      </ScrollView>

      {/* Hotel Cards */}
      <ScrollView
        contentContainerClassName="gap-4 px-5 pb-10 pt-2"
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          [0, 1, 2].map((item) => (
            <View
              key={`hotel-skeleton-${item}`}
              className="overflow-hidden rounded-[16px] border border-coral-100 bg-white"
            >
              <Skeleton width="100%" height={196} radius={0} />
              <View className="gap-2 p-4">
                <Skeleton width="65%" height={18} />
                <Skeleton width="100%" height={12} />
                <Skeleton width="80%" height={12} />
              </View>
            </View>
          ))
        ) : error ? (
          <View className="items-center px-6 pt-12">
            <Text className="text-center font-poppins-semibold text-[15px] text-slate-800">
              Could not load hotels
            </Text>
            <Text className="mt-2 text-center font-poppins text-[13px] text-slate-500">
              {error}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => void loadHotels()}
              className="mt-4 rounded-full border border-slate-200 px-4 py-2 active:opacity-70"
            >
              <Text className="font-poppins-medium text-[13px] text-slate-700">
                Try again
              </Text>
            </Pressable>
          </View>
        ) : hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <AnimatedHotelCard key={hotel.id} hotel={hotel} index={index} />
          ))
        ) : (
          /* Empty State */
          <View className="items-center px-6 pt-12">
            <Text className="text-center font-poppins-semibold text-[15px] text-slate-800">
              No hotels found
            </Text>

            <Text className="mt-2 text-center font-poppins text-[13px] text-slate-500">
              Try another hotel name or municipality, or clear your filters.
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
