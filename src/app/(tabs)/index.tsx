import TourPackageCard from "@/app/itinerary-packages/TourPackageCard";
import CategoryIcons from "@/components/home/CategoryIcons";
import HeroBanner from "@/components/home/HeroBanner";
import SectionHeader from "@/components/home/SectionHeader";
import {
    INITIAL_ITINERARY_PACKAGES,
    PACKAGE_RESORTS,
    PACKAGE_SPOTS,
} from "@/data/mockData";
import { getPackageSpotImage } from "@/data/packageImages";
import type { ItineraryPackage } from "@/data/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";

const heroImage = require("../../../assets/images/elnido.jpg");

const HOME_PACKAGES = INITIAL_ITINERARY_PACKAGES.map((pkg) => {
  const spot = PACKAGE_SPOTS.find((item) => item.id === pkg.spotId);
  const resort = PACKAGE_RESORTS.find((item) => item.id === pkg.resortId);

  if (!spot || !resort) {
    throw new Error(`Missing mock data for itinerary ${pkg.spotId}`);
  }

  return { pkg, spot, resort };
});

const getPackageTotal = (pkg: ItineraryPackage) =>
  pkg.priceBreakdown.reduce((total, line) => total + line.amount, 0);

const MOST_POPULAR_PACKAGE_ID = HOME_PACKAGES.reduce<{
  id: string;
  count: number;
} | null>((best, { pkg, spot }) => {
  return !best || spot.reviewCount > best.count
    ? { id: pkg.id, count: spot.reviewCount }
    : best;
}, null)?.id;

export default function Index() {
  const router = useRouter();

  const [favoritePackageIds, setFavoritePackageIds] = useState<string[]>([]);
  const renderPackageCards = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="pb-1"
    >
      {HOME_PACKAGES.map(({ pkg, spot, resort }) => {
        const bedCount = resort.accommodations[0]?.bedCount;
        const detailParts = [
          bedCount ? `${bedCount} ${bedCount === 1 ? "Bed" : "Beds"}` : null,
          "Free breakfast",
        ].filter(Boolean);

        return (
          <View key={pkg.id} className="mr-3.5 w-[280px]">
            <TourPackageCard
              title={`${spot.name} Itinerary Package`}
              image={getPackageSpotImage(spot.image)}
              rating={spot.rating}
              reviewCount={spot.reviewCount}
              detail={`· ${detailParts.join(" · ")}`}
              days={pkg.days.length}
              price={getPackageTotal(pkg)}
              isPopular={pkg.id === MOST_POPULAR_PACKAGE_ID}
              isFavorite={favoritePackageIds.includes(pkg.id)}
              onToggleFavorite={() =>
                setFavoritePackageIds((current) =>
                  current.includes(pkg.id)
                    ? current.filter((id) => id !== pkg.id)
                    : [...current, pkg.id],
                )
              }
              onPress={() =>
                router.push({
                  pathname: "/itinerary-packages/[id]",
                  params: { id: pkg.id },
                })
              }
            />
          </View>
        );
      })}
    </ScrollView>
  );

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="pb-10"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="auto" />

      {/* Hero Banner */}
      <HeroBanner
        image={heroImage}
        headline={"Discover\nYour Next\nAdventure"}
        subtext={
          "Explore breathing destinations,\ncurated itinerary packages, and\nunforgettable experience."
        }
      />

      <View className="px-5">
        {/* Category Icons */}
        <View className="-mt-10 z-10 rounded-2xl bg-transparent px-2 py-3.5">
          <CategoryIcons
            onSelect={(item) => {
              if (item.id === "hotels") {
                router.push("/hotels");
              } else if (item.id === "esims") {
                router.push("/esim");
              }
            }}
          />
        </View>

        {/* Itineraries */}
        <View>
          <SectionHeader
            title="Itinerary Packages"
            action="View all"
            onActionPress={() => router.push("/itinerary-packages")}
          />
          {renderPackageCards()}
        </View>

        {/* Tour Packages */}
        <View className="mt-7">
          <SectionHeader
            title="Tour Packages"
            action="View all"
            onActionPress={() => router.push("/itinerary-packages")}
          />
          {renderPackageCards()}
        </View>
      </View>
    </ScrollView>
  );
}
