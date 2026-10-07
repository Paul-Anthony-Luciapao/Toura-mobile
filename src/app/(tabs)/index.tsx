import CategoryIcons from '@/components/home/CategoryIcons';
import HeroBanner from '@/components/home/HeroBanner';
import SectionHeader from '@/components/home/SectionHeader';
import TouristSpotCard from '@/components/home/TouristSpotCard';
import { INITIAL_TOURIST_SPOTS } from '@/data/mockData';
import { api } from '@/services/api';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const testLaravel = async () => {
      try {
        const response = await api.get('/test');
        console.log(response.data);
      } catch (error) {
        console.error('Laravel API error:', error);
      }
    };

    testLaravel();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="pb-10"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" />

      {/* Hero Banner */}
      <HeroBanner
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85"
        headline={'Discover\nYour Next\nAdventure'}
        subtext="Explore breathing destinations, curated itinerary packages, and unforgettable experience."
      />

      <View className="px-5">
        {/* Category Icons */}
        <View className="-mt-10 z-10 rounded-2xl px-2 py-3.5 shadow-md shadow-black/10">
          <CategoryIcons />
        </View>

        {/* Itinerary Packages */}
        <View className="mt-5">
          <SectionHeader
            title="Itinerary Packages"
            action="View all"
            onActionPress={() => router.push('/itinerary-packages')}
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
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tour Packages */}
        <View className="mt-7">
          <SectionHeader
            title="Tour Packages"
            action="View all"
            onActionPress={() => router.push('/tour-package')}
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
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
