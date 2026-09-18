import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/common/PrimaryButton";
import ResortCard from "../components/home/ResortCard";
import SectionHeader from "../components/home/SectionHeader";
import TouristSpotCard from "../components/home/TouristSpotCard";
import { INITIAL_RESORTS, INITIAL_TOURIST_SPOTS } from "../data/mockData";
import { colors, globalStyles } from "../styles/global";

export default function Index() {
  return (
    <ScrollView
      style={[globalStyles.container, styles.container]}
      contentContainerStyle={styles.content}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerCard}>
        <Text style={styles.kicker}>Palawan escapes</Text>
        <Text style={styles.title}>Find your next island getaway</Text>
        <Text style={styles.subtitle}>
          Discover boutique resorts, lagoon views, and unforgettable coastal
          stays.
        </Text>

        <View style={styles.buttonRow}>
          <PrimaryButton label="Explore stays" />
          <PrimaryButton label="Saved" variant="secondary" />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Featured stays"
          subtitle="Curated homes in Palawan"
          action="See all"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}>
          {INITIAL_RESORTS.map((resort) => (
            <ResortCard
              key={resort.id}
              resort={{
                id: resort.id,
                name: resort.name,
                municipality: resort.municipality,
                location: resort.location,
                coverImage: resort.coverImage,
                rating: resort.rating,
                reviewCount: resort.reviewCount,
                basePrice: resort.basePrice,
                tagline: resort.tagline,
              }}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Top attractions"
          subtitle="Must-see destinations"
          action="View map"
        />
        {INITIAL_TOURIST_SPOTS.slice(0, 3).map((spot) => (
          <TouristSpotCard key={spot.id} spot={spot} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 38,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  section: {
    marginTop: 18,
  },
  horizontalList: {
    paddingBottom: 4,
  },
});
