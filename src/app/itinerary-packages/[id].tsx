import Button, { SeeMoreButton } from "@/components/buttons/Buttons";
import { DRIVERS, Dates, INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import { colors } from "@/styles/global";
import Drawer from "@components/itineraries/Drawer";
import DrawerContent from "@components/itineraries/DrawerContent";
import Inclusion from "@components/itineraries/Inclusion";
import SelectedItineraryCard from "@components/itineraries/SelectedItineraryCard";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CurrentItineraryPackage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "itinerary" | "inclusion" | "reviews"
  >("itinerary");

  const [favorite, setFavorite] = useState(false);

  const { id, source } = useLocalSearchParams<{
    id?: string | string[];
    source?: string | string[];
  }>();

  const packageId = Array.isArray(id) ? id[0] : id;
  const packageSource = Array.isArray(source)
    ? source[0]
    : source;

  const index = INITIAL_TOURIST_SPOTS.findIndex(
    (spot) => String(spot.id) === String(packageId),
  );

  const itinerary = INITIAL_TOURIST_SPOTS[index];

  if (!itinerary) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center bg-background"
        edges={["top"]}
      >
        <Text className="font-poppins-semibold text-[16px] text-textMain">
          Itinerary package not found.
        </Text>

        <View className="mt-4">
          <Button
            title="Go back"
            onPress={() => router.back()}
          />
        </View>
      </SafeAreaView>
    );
  }

  const dates = Dates[index % Dates.length];

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top"]}
    >
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        {/* Hero */}
        <View className="relative w-full">
          <SelectedItineraryCard
            itinerary={itinerary}
            dates={dates}
          />

          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="absolute left-4 top-4 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.white}
            />
          </Pressable>

          {/* Favorite button */}
          <Pressable
            onPress={() =>
              setFavorite((prev) => !prev)
            }
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
              favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            className="absolute right-4 top-4 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/30 active:opacity-70"
          >
            <Ionicons
              name={
                favorite
                  ? "heart"
                  : "heart-outline"
              }
              size={24}
              color={
                favorite
                  ? colors.accent
                  : colors.white
              }
            />
          </Pressable>
        </View>

        {/* Tabs */}
        <View className="flex-row items-center justify-between px-5">
          {(
            [
              "itinerary",
              "inclusion",
              "reviews",
            ] as const
          ).map((tab) => {
            const label =
              tab === "inclusion"
                ? "Inclusion"
                : tab === "reviews"
                  ? "Reviews"
                  : "Itinerary";

            const isActive =
              activeTab === tab;

            return (
              <Pressable
                key={tab}
                onPress={() =>
                  setActiveTab(tab)
                }
                accessibilityRole="tab"
                accessibilityState={{
                  selected: isActive,
                }}
                className={`flex-1 items-center border-b-2 py-3 ${
                  isActive
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Text
                  className={`font-poppins-semibold text-[15px] ${
                    isActive
                      ? "text-primary"
                      : "text-textMuted"
                  }`}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Tab Content */}
        {activeTab === "itinerary" ? (
          <View className="mt-4">
            <Drawer dates={dates}>
              {(day, dayIndex) => (
                <DrawerContent
                  itinerary={itinerary}
                  driver={
                    DRIVERS[
                      dayIndex %
                        DRIVERS.length
                    ]
                  }
                  dayName={day.name}
                />
              )}
            </Drawer>

            {/* CTA: "See more" link from My Itineraries, solid "Check availability" otherwise */}
            <View className="items-center">
              {packageSource === "my-itineraries" ? (
                <SeeMoreButton
                  onPress={() => {
                    console.log("Pressed: See more");
                  }}
                />
              ) : (
                <Button
                  title="Check availability"
                  onPress={() => {
                    console.log("Pressed: Check availability");
                  }}
                />
              )}
            </View>
          </View>
        ) : activeTab === "inclusion" ? (
          <View className="mt-4 px-4">
            <Inclusion />
          </View>
        ) : (
          <View className="mt-4 px-4">
            <Text className="font-poppins text-[13px] text-textMuted">
              Reviews will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
