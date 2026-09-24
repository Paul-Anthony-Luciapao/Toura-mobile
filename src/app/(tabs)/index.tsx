import CategoryIcons from "@/components/home/CategoryIcons";
import HeroBanner from "@/components/home/HeroBanner";
import SectionHeader from "@/components/home/SectionHeader";
import TourPackageCard from "@/components/home/TourPackageCard";
import TouristSpotCard from "@/components/home/TouristSpotCard";
import { INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import { api } from "@/services/api";
import { useEffect } from "react";
import { ScrollView, StatusBar, View } from "react-native";

export default function Index() {
  useEffect(() => {
    const testLaravel = async () => {
      try {
        const response = await api.get("/test");

        console.log(response.data);
      } catch (error) {
        console.error("Laravel API error:", error);
      }
    };

    testLaravel();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="pb-10">
      <StatusBar barStyle="light-content" />

      <HeroBanner
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85"
        headline={"Discover\nYour Next\nAdventure"}
        subtext="Explore breathing destinations, curated itinerary packages, and unforgettable experience."
      />

      <View className="px-5">
        <View className="mt-5">
          <CategoryIcons />
        </View>

        <View className="mt-7">
          <SectionHeader title="Itinerary Packages" action="View all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1">
            {INITIAL_TOURIST_SPOTS.map((spot) => (
              <View key={spot.id} className="mr-[14px]">
                <TouristSpotCard spot={spot} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="mt-7">
          <SectionHeader title="Tour Packages" action="View all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1">
            {INITIAL_TOURIST_SPOTS.map((spot) => (
              <View key={spot.id} className="mr-[14px]">
                <TourPackageCard
                  item={{ id: spot.id, title: spot.name, image: spot.image }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
