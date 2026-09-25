import CategoryIcons from "@/components/home/CategoryIcons";
import HeroBanner from "@/components/home/HeroBanner";
import ResortCard from "@/components/home/ResortCard";
import SectionHeader from "@/components/home/SectionHeader";
import TourPackageCard from "@/components/home/TourPackageCard";
import TouristSpotCard from "@/components/home/TouristSpotCard";
import { INITIAL_RESORTS, INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import { api } from "@/services/api";
import { colors } from "@/styles/global";
import { useEffect } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

export default function Index() {
  //!  This useEffect is for testing Frontend Backend connection remove during production
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
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" />

      <HeroBanner
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85"
        headline={"Discover\nYour Next\nAdventure"}
        subtext="Explore breathing destinations, curated itinerary packages, and unforgettable experience."
      />

      <View style={styles.body}>
        <View style={styles.categorySection}>
          <CategoryIcons />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Places to stay" action="View all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}>
            {INITIAL_RESORTS.map((resort) => (
              <View key={resort.id} style={styles.cardSpacing}>
                <ResortCard resort={resort} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Itinerary Packages" action="View all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}>
            {INITIAL_TOURIST_SPOTS.map((spot) => (
              <View key={spot.id} style={styles.cardSpacing}>
                <TouristSpotCard spot={spot} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Tour Packages" action="View all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}>
            {INITIAL_TOURIST_SPOTS.map((spot) => (
              <View key={spot.id} style={styles.cardSpacing}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 40,
  },
  body: {
    paddingHorizontal: 20,
  },
  categorySection: {
    marginTop: 20,
  },
  section: {
    marginTop: 28,
  },
  horizontalList: {
    paddingBottom: 4,
  },
  cardSpacing: {
    marginRight: 14,
  },
});
