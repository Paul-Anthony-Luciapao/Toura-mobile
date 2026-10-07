import {
  INITIAL_ITINERARY_PACKAGES,
  INITIAL_RESORTS,
  INITIAL_TOURIST_SPOTS,
} from "@/data/mockData";
import { formatCurrency, formatReviewCount } from "@/lib/formatters";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Tab = "itinerary" | "inclusion" | "reviews";

function formatDayDate(startDate: string, dayIndex: number) {
  const date = new Date(`${startDate}T12:00:00`);
  date.setDate(date.getDate() + dayIndex);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CurrentItineraryPackage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { id, source } = useLocalSearchParams<{
    id?: string | string[];
    source?: string | string[];
  }>();

  const packageId = Array.isArray(id) ? id[0] : id;
  const packageSource = Array.isArray(source) ? source[0] : source;
  const packageData = INITIAL_ITINERARY_PACKAGES.find(
    (item) => item.id === packageId,
  );
  const spot = INITIAL_TOURIST_SPOTS.find(
    (item) => item.id === packageData?.spotId,
  );
  const resort = INITIAL_RESORTS.find(
    (item) => item.id === packageData?.resortId,
  );

  const [activeTab, setActiveTab] = useState<Tab>("itinerary");
  const [favorite, setFavorite] = useState(false);
  const [openDay, setOpenDay] = useState<string | null>(
    packageData?.days[0]?.id ?? null,
  );
  const [galleryIndex, setGalleryIndex] = useState(0);

  const gallery =
    spot && resort
      ? [
          ...new Set([
            spot.image,
            resort.coverImage,
            ...resort.images,
            ...resort.accommodations.map((room) => room.image),
          ]),
        ].slice(0, 7)
      : [];

  if (!packageData || !spot || !resort) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Itinerary package not found.
        </Text>
        <Pressable onPress={() => router.back()} className="mt-4 p-3">
          <Text className="font-poppins-semibold text-primary">Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const totalPrice = packageData.priceBreakdown.reduce(
    (total, line) => total + line.amount,
    0,
  );

  const sharePackage = async () => {
    try {
      await Share.share({
        message: `${spot.name} itinerary package in ${spot.municipality}`,
      });
    } catch {
      Alert.alert("Share unavailable", "Could not open the share menu.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="relative">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              setGalleryIndex(
                Math.round(event.nativeEvent.contentOffset.x / width),
              );
            }}>
            {gallery.map((image) => (
              <Image
                key={image}
                source={{ uri: image }}
                resizeMode="cover"
                style={{ width, height: 270 }}
              />
            ))}
          </ScrollView>

          <View className="absolute inset-0 justify-between p-4">
            <View className="flex-row justify-between">
              <Pressable
                onPress={() => router.back()}
                accessibilityLabel="Go back"
                className="h-10 w-10 items-center justify-center rounded-full bg-black/40">
                <Ionicons name="arrow-back" size={22} color="white" />
              </Pressable>

              <View className="flex-row gap-2">
                <Pressable
                  onPress={sharePackage}
                  accessibilityLabel="Share itinerary"
                  className="h-10 w-10 items-center justify-center rounded-full bg-black/40">
                  <Ionicons name="share-outline" size={21} color="white" />
                </Pressable>
                <Pressable
                  onPress={() => setFavorite((value) => !value)}
                  accessibilityLabel={
                    favorite ? "Remove favorite" : "Add favorite"
                  }
                  className="h-10 w-10 items-center justify-center rounded-full bg-black/40">
                  <Ionicons
                    name={favorite ? "heart" : "heart-outline"}
                    size={22}
                    color={favorite ? colors.accent : "white"}
                  />
                </Pressable>
              </View>
            </View>

            <View>
              <Text className="self-end rounded-full bg-white/90 px-3 py-1 font-poppins text-[12px] text-textMain">
                {galleryIndex + 1}/{gallery.length}
              </Text>
              <Text className="mt-3 font-poppins-semibold text-[25px] leading-7 text-white">
                {spot.municipality} Itinerary{"\n"}Packages
              </Text>
              <Text className="mt-1 font-poppins text-[12px] text-white">
                5 days · 4 nights
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row border-b border-border">
          {(
            [
              ["itinerary", "Itinerary"],
              ["inclusion", "Inclusions"],
              ["reviews", "Reviews"],
            ] as const
          ).map(([tab, label]) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === tab }}
              className={`flex-1 items-center border-b-2 py-3 ${
                activeTab === tab ? "border-primary" : "border-transparent"
              }`}>
              <Text className="font-poppins-semibold text-[14px] text-textMain">
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === "itinerary" && (
          <View className="px-4 pt-4">
            {packageData.days.map((day, index) => {
              const expanded = openDay === day.id;

              return (
                <View
                  key={day.id}
                  className="mb-3 rounded-xl bg-surfaceSoft p-4">
                  <Pressable
                    onPress={() => setOpenDay(expanded ? null : day.id)}
                    accessibilityRole="button"
                    accessibilityState={{ expanded }}
                    className="flex-row items-center justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="font-poppins-semibold text-[15px] text-textMain">
                        Day {index + 1}
                      </Text>
                      <Text className="mt-1 font-poppins-medium text-[13px] text-textMain">
                        {day.title}
                      </Text>
                      <Text className="mt-1 font-poppins text-[11px] text-textMuted">
                        {formatDayDate(packageData.startDate, index)}
                      </Text>
                    </View>
                    <Ionicons
                      name={expanded ? "chevron-up" : "chevron-down"}
                      size={20}
                      color={colors.primary}
                    />
                  </Pressable>

                  {expanded && (
                    <View className="mt-4 border-t border-white pt-3">
                      {day.notes.map((note) => (
                        <Text
                          key={note}
                          className="mb-1 font-poppins text-[13px] leading-5 text-textSoft">
                          {"•  "}
                          {note}
                        </Text>
                      ))}

                      <Text className="mt-3 font-poppins-semibold text-[14px] text-textMain">
                        Transportation
                      </Text>

                      <Text className="mt-1 font-poppins text-[13px] text-textSoft">
                        Pickup details are sample demo data.
                      </Text>

                      <Text className="mt-3 font-poppins-semibold text-[14px] text-textMain">
                        Hotel
                      </Text>
                      <Text className="mt-1 font-poppins text-[13px] text-textSoft">
                        {resort.name}
                      </Text>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mt-3">
                        {resort.accommodations.map((room) => (
                          <Image
                            key={room.id}
                            source={{ uri: room.image }}
                            resizeMode="cover"
                            className="mr-3 h-20 w-20 rounded-xl"
                          />
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {activeTab === "inclusion" && (
          <View className="m-4 rounded-xl bg-surfaceSoft p-4">
            <Text className="font-poppins-semibold text-[19px] text-textMain">
              Package Price
            </Text>
            <Text className="mt-2 font-poppins-semibold text-[14px] text-textMain">
              Demo estimate: {formatCurrency(totalPrice)}
            </Text>
            <Text className="mb-3 mt-2 font-poppins text-[12px] text-textMuted">
              This sample breakdown is not a live quote.
            </Text>
            {packageData.priceBreakdown.map((line) => (
              <View key={line.label} className="flex-row justify-between py-1">
                <Text className="flex-1 pr-3 font-poppins text-[12px] text-textSoft">
                  {line.label}
                </Text>
                <Text className="font-poppins text-[12px] text-textSoft">
                  {formatCurrency(line.amount)}
                </Text>
              </View>
            ))}
            <Text className="mb-1 mt-4 font-poppins-semibold text-[14px] text-textMain">
              Included
            </Text>
            {packageData.inclusions.map((item) => (
              <Text
                key={item}
                className="py-1 font-poppins text-[12px] text-textSoft">
                {"•  "}
                {item}
              </Text>
            ))}
          </View>
        )}

        {activeTab === "reviews" && (
          <View className="px-4 pt-4">
            <Text className="mb-3 font-poppins-semibold text-[19px] text-textMain">
              {spot.rating} · {formatReviewCount(spot.reviewCount)} Reviews
            </Text>
            {resort.amenities.slice(0, 4).map((amenity) => (
              <Text
                key={amenity}
                className="mb-2 font-poppins text-[12px] text-primary">
                {amenity}
              </Text>
            ))}
            {packageData.reviews.map((review) => (
              <View
                key={review.id}
                className="mb-4 border-t border-border pt-3">
                <Text className="font-poppins-semibold text-[14px] text-textMain">
                  {review.name} · {"★".repeat(review.rating)}
                </Text>
                <Text className="mt-2 font-poppins text-[13px] leading-5 text-textMain">
                  {review.text}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View
        className="border-t border-border bg-white px-4 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        {packageSource === "my-itineraries" ? (
          <Pressable
            onPress={() =>
              Alert.alert(
                "Demo",
                "More itinerary actions are not available yet.",
              )
            }
            className="items-center py-3">
            <Text className="font-poppins-semibold text-primary">See more</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() =>
              Alert.alert(
                "Demo only",
                "Live availability is not connected yet.",
              )
            }
            className="items-center rounded-xl bg-[#ff7f73] py-3">
            <Text className="font-poppins-semibold text-white">
              Check Availability
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
