import { getCustomTabBarContentPadding } from "@/components/CustomTabBar";
import { getErrorMessage } from "@/services/api";
import {
    fetchMyItineraryBookings,
    type ItineraryBooking,
} from "@/services/itineraryBookings";
import { fetchMyTourBookings, type TourBooking } from "@/services/tourBookings";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

type BookingCategory = "hotel" | "resort" | "itinerary" | "tour";
type BookingFilter = "all" | BookingCategory;

const bookingFilters: BookingFilter[] = [
  "all",
  "hotel",
  "resort",
  "itinerary",
  "tour",
];

type BookingItem =
  | { kind: "itinerary"; booking: ItineraryBooking }
  | { kind: "tour"; booking: TourBooking };

function getDate(item: BookingItem): string {
  return item.kind === "itinerary"
    ? `${item.booking.arrival_date} – ${item.booking.departure_date}`
    : item.booking.tour_date;
}

function getTitle(item: BookingItem): string {
  return item.kind === "itinerary"
    ? item.booking.itinerary_package.title
    : item.booking.tour_package.name;
}

function getStatus(item: BookingItem): string {
  const payment = item.booking.payment_status;

  return payment === "paid"
    ? item.booking.status
    : `${item.booking.status} · payment ${payment}`;
}

function getAmount(item: BookingItem): string {
  const amount =
    item.kind === "itinerary"
      ? Number(item.booking.total_price)
      : Number(item.booking.total_amount);

  return Number.isFinite(amount) ? `₱${amount.toLocaleString("en-PH")}` : "—";
}

export default function MyBookingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<BookingFilter>("all");

  const loadBookings = useCallback(async () => {
    try {
      const [itineraries, tours] = await Promise.all([
        fetchMyItineraryBookings(),
        fetchMyTourBookings(),
      ]);

      const items: BookingItem[] = [
        ...itineraries.map((booking) => ({
          kind: "itinerary" as const,
          booking,
        })),
        ...tours.map((booking) => ({
          kind: "tour" as const,
          booking,
        })),
      ];

      items.sort((a, b) =>
        b.booking.created_at.localeCompare(a.booking.created_at),
      );

      setBookings(items);
      setError(null);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadBookings();
    }, [loadBookings]),
  );

  const contentBottomPadding = getCustomTabBarContentPadding(insets.bottom);

  const filteredBookings =
    selectedFilter === "all"
      ? bookings
      : bookings.filter((item) => item.kind === selectedFilter);

  const getFilterCount = (filter: BookingFilter) => {
    if (filter === "all") {
      return bookings.length;
    }

    return bookings.filter((item) => item.kind === filter).length;
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* HEADER */}
      <View className="flex-row items-center gap-3 px-5 pb-4 pt-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>

        <Text className="font-poppins-semibold text-xl text-textMain">
          My Bookings
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center font-poppins text-slate-600">
            {error}
          </Text>

          <Pressable
            onPress={() => void loadBookings()}
            className="mt-4 rounded-xl bg-primary px-5 py-3"
          >
            <Text className="font-poppins-semibold text-white">Retry</Text>
          </Pressable>
        </View>
      ) : (
        <View className="flex-1">
          {/* CATEGORY FILTERS - FIXED AT TOP */}
          <View className="shrink-0">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 16,
                paddingTop: 2,
                gap: 10,
                alignItems: "center",
              }}
            >
              {bookingFilters.map((filter) => {
                const isSelected = selectedFilter === filter;
                const count = getFilterCount(filter);
                const label = filter === "all" ? "All" : filter;

                return (
                  <Pressable
                    key={filter}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: isSelected,
                    }}
                    onPress={() => setSelectedFilter(filter)}
                    className={`flex-row items-center justify-center rounded-full border px-5 py-2.5 ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-slate-200 bg-white"
                    }`}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.75 : 1,
                    })}
                  >
                    <Text
                      className={`font-poppins-medium text-sm capitalize ${
                        isSelected ? "text-white" : "text-slate-600"
                      }`}
                    >
                      {label}
                    </Text>

                    {/* COUNT BADGE */}
                    <View
                      className={`ml-2 min-w-[22px] items-center justify-center rounded-full px-1.5 py-0.5 ${
                        isSelected ? "bg-white/20" : "bg-slate-100"
                      }`}
                    >
                      <Text
                        className={`font-poppins-medium text-xs ${
                          isSelected ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {count}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* BOOKINGS LIST - ONLY THIS AREA CHANGES */}
          <FlatList
            style={{ flex: 1 }}
            data={filteredBookings}
            keyExtractor={(item) => `${item.kind}-${item.booking.id}`}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: contentBottomPadding,
              flexGrow: 1,
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  void loadBookings();
                }}
                tintColor={colors.primary}
              />
            }
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Ionicons
                  name="receipt-outline"
                  size={48}
                  color={colors.primary}
                />

                <Text className="mt-4 font-poppins-semibold capitalize text-textMain">
                  No {selectedFilter === "all" ? "" : `${selectedFilter} `}
                  bookings yet
                </Text>

                <Text className="mt-2 text-center font-poppins text-sm text-slate-500">
                  {selectedFilter === "all"
                    ? "Your hotel, resort, itinerary, and tour bookings will appear here."
                    : `Your ${selectedFilter} bookings will appear here.`}
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              const title = getTitle(item);

              return (
                <Pressable
                  accessibilityRole={
                    item.kind === "itinerary" ? "button" : undefined
                  }
                  onPress={
                    item.kind === "itinerary"
                      ? () =>
                          router.push({
                            pathname: "/my-itineraries/[bookingId]",
                            params: {
                              bookingId: String(item.booking.id),
                            },
                          })
                      : undefined
                  }
                  className="mb-3 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  {/* BOOKING TITLE AND STATUS */}
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1">
                      <Text className="font-poppins-semibold text-base text-textMain">
                        {title}
                      </Text>

                      <Text className="mt-1 font-poppins text-xs capitalize text-slate-500">
                        {item.kind} · {getStatus(item)}
                      </Text>
                    </View>

                    {item.kind === "itinerary" ? (
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={colors.primary}
                      />
                    ) : null}
                  </View>

                  {/* DATE */}
                  <View className="mt-3 flex-row items-center">
                    <Ionicons
                      name="calendar-outline"
                      size={17}
                      color={colors.textSecondary}
                    />

                    <Text className="ml-2 font-poppins text-sm text-slate-600">
                      {getDate(item)}
                    </Text>
                  </View>

                  {/* REFERENCE AND PRICE */}
                  <View className="mt-2 flex-row items-center justify-between">
                    <Text className="font-poppins text-xs text-slate-500">
                      {item.booking.booking_reference}
                    </Text>

                    <Text className="font-poppins-semibold text-sm text-primary">
                      {getAmount(item)}
                    </Text>
                  </View>

                  {/* TOUR MANAGEMENT */}
                  {item.kind === "tour" ? (
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => router.push("/my-tours")}
                      className="mt-3 self-start"
                    >
                      <Text className="font-poppins-medium text-sm text-primary">
                        Manage tour bookings
                      </Text>
                    </Pressable>
                  ) : null}
                </Pressable>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
