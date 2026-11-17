import HomeTourCard from "@/app/itinerary-packages/HomeTourCard";
import TourPackageCard from "@/app/itinerary-packages/TourPackageCard";
import { getCustomTabBarContentPadding } from "@/components/CustomTabBar";
import CategoryIcons from "@/components/home/CategoryIcons";
import HeroBanner from "@/components/home/HeroBanner";
import SectionHeader from "@/components/home/SectionHeader";
import {
    INITIAL_ITINERARY_PACKAGES,
    PACKAGE_RESORTS,
    PACKAGE_SPOTS,
} from "@/data/itineraryPackage";
import { getPackageSpotImage } from "@/data/packageImages";
import { tourPackages } from "@/data/tourPackages";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const heroImage = require("../../../assets/images/elnido.jpg");

const HOME_PACKAGES = INITIAL_ITINERARY_PACKAGES.map((pkg) => {
  const spot = PACKAGE_SPOTS.find((item) => item.id === pkg.spotId);
  const resort = PACKAGE_RESORTS.find((item) => item.id === pkg.resortId);

  if (!spot || !resort) {
    throw new Error(`Missing mock data for itinerary ${pkg.spotId}`);
  }

  return { pkg, spot };
});

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [favoritePackageIds, setFavoritePackageIds] = useState<string[]>([]);
  const renderItineraryCards = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="pb-1"
    >
      {HOME_PACKAGES.map(({ pkg, spot }) => {
        return (
          <View key={pkg.id} className="mr-3.5 w-[280px]">
            <TourPackageCard
              title={pkg.name}
              image={getPackageSpotImage(spot.image)}
              rating={spot.rating}
              reviewCount={spot.reviewCount}
              detail={pkg.activities.slice(0, 2).join(" · ")}
              duration={pkg.duration}
              price={pkg.price}
              priceBasis={pkg.priceBasis}
              isPopular={pkg.popular}
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

  const renderTourCards = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="pb-1"
    >
      {tourPackages.slice(0, 6).map((tour) => {
        const image =
          tour.municipality === "Coron"
            ? require("../../../assets/images/coron.jpg")
            : tour.municipality === "Puerto Princesa"
              ? require("../../../assets/images/puertoprinsesa.jpg")
              : tour.municipality === "San Vicente"
                ? require("../../../assets/images/sanvicente.jpg")
                : require("../../../assets/images/elnido.jpg");

        return (
          <View key={tour.id} className="mr-3.5 w-[280px]">
            <HomeTourCard
              item={tour}
              image={image}
              onPress={() =>
                router.push({
                  pathname: "/tours/[id]",
                  params: { id: tour.id },
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
      contentContainerStyle={{
        paddingBottom: getCustomTabBarContentPadding(insets.bottom),
      }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" />

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
              if (item.id === "activities") {
                router.push("/activities");
              } else if (item.id === "car-rentals") {
                router.push("/car-rentals");
              } else if (item.id === "hotels") {
                router.push("/hotels");
              } else if (item.id === "esims") {
                router.push("/esim");
              } else if (item.id === "more") {
                router.push("/all-services");
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
          {renderItineraryCards()}
        </View>

        {/* Tour Packages */}
        <View className="mt-7">
          <SectionHeader
            title="Tour Packages"
            action="View all"
            onActionPress={() => router.push("/tours")}
          />
          {renderTourCards()}
        </View>
      </View>
    </ScrollView>
  );
}
