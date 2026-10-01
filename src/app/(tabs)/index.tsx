import CategoryIcons from "@/components/home/CategoryIcons";
import HeroBanner from "@/components/home/HeroBanner";
import SectionHeader from "@/components/home/SectionHeader";
import TourPackageCard from "@/components/home/TourPackageCard";
import TouristSpotCard from "@/components/home/TouristSpotCard";
import { INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import { api } from "@/services/api";
<<<<<<< HEAD
import { useRouter } from "expo-router";
=======
>>>>>>> origin/main
import { useEffect } from "react";
import { ScrollView, StatusBar, View } from "react-native";

export default function Index() {
<<<<<<< HEAD
  const router = useRouter();

=======
>>>>>>> origin/main
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
<<<<<<< HEAD
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="pb-10"
      showsVerticalScrollIndicator={false}
    >
=======
    <ScrollView className="flex-1 bg-white" contentContainerClassName="pb-10">
>>>>>>> origin/main
      <StatusBar barStyle="light-content" />

      {/* Hero Banner */}
      <HeroBanner
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85"
        headline={"Discover\nYour Next\nAdventure"}
        subtext="Explore breathing destinations, curated itinerary packages, and unforgettable experience."
      />

      <View className="px-5">
<<<<<<< HEAD
        {/* Category Icons */}
        <View className=" -mt-10 z-10 rounded-2xl px-2 py-3.5 shadow-md shadow-black/10">
          <CategoryIcons />
        </View>

        {/* Itinerary Packages */}
        <View className="mt-5">
          <SectionHeader
            title="Itinerary Packages"
            action="View all"
            onActionPress={() => router.push("/itinerary-packages")}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1"
          >
            {INITIAL_TOURIST_SPOTS.map((spot) => (
              <View
                key={spot.id}
                className="mr-3.5 w-[280px]"
              >
                <TouristSpotCard
                  spot={spot}
                  className="w-full"
                />
=======
        <View className="-mt-[26px]">
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
>>>>>>> origin/main
              </View>
            ))}
          </ScrollView>
        </View>

<<<<<<< HEAD
        {/* Tour Packages */}
        <View className="mt-7">
          <SectionHeader
            title="Tour Packages"
            action="View all"
            onActionPress={() => router.push("/tour-package")}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1"
          >
            {INITIAL_TOURIST_SPOTS.map((spot) => (
              <View
                key={spot.id}
                className="mr-3.5 w-[280px]"
              >
=======
        <View className="mt-7">
          <SectionHeader title="Tour Packages" action="View all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1">
            {INITIAL_TOURIST_SPOTS.map((spot) => (
              <View key={spot.id} className="mr-[14px]">
>>>>>>> origin/main
                <TourPackageCard
                  item={{
                    id: spot.id,
                    title: spot.name,
                    image: spot.image,
                  }}
                  className="w-full"
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
