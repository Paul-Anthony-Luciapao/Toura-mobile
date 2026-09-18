import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../components/common/PrimaryButton";
import { INITIAL_RESORTS } from "../../data/mockData";
import { formatCurrency } from "../../lib/formatters";
import { colors, globalStyles } from "../../styles/global";

export default function ResortDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const resort = INITIAL_RESORTS.find((item) => item.id === id);

  if (!resort) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Resort not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[globalStyles.container, styles.container]}
      contentContainerStyle={styles.content}>
      <Image source={{ uri: resort.coverImage }} style={styles.coverImage} />

      <View style={styles.section}>
        <Text style={styles.municipality}>{resort.municipality}</Text>
        <Text style={styles.title}>{resort.name}</Text>
        <Text style={styles.tagline}>{resort.tagline}</Text>

        <View style={styles.row}>
          <Text style={styles.rating}>★ {resort.rating}</Text>
          <Text style={styles.review}>({resort.reviewCount} reviews)</Text>
        </View>

        <Text style={styles.description}>{resort.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.chipWrap}>
          {resort.amenities.map((item) => (
            <Text key={item} style={styles.chip}>
              {item}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available stays</Text>
        {resort.accommodations.map((room) => (
          <View key={room.id} style={styles.roomCard}>
            <Image source={{ uri: room.image }} style={styles.roomImage} />
            <View style={styles.roomContent}>
              <Text style={styles.roomTitle}>{room.title}</Text>
              <Text style={styles.roomDesc}>{room.description}</Text>
              <Text style={styles.roomMeta}>
                {room.capacity} guests • {room.bedType} • {room.size}
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.roomPrice}>
                  {formatCurrency(room.pricePerNight)}
                </Text>
                <Text style={styles.roomMeta}>/ night</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special offers</Text>
        {resort.offers.map((offer) => (
          <View key={offer.id} style={styles.offerCard}>
            <Text style={styles.offerTag}>{offer.tag}</Text>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerText}>{offer.description}</Text>
            <Text style={styles.offerDiscount}>{offer.discountRate}</Text>
          </View>
        ))}
      </View>

      <View style={styles.ctaBox}>
        <Text style={styles.ctaPrice}>
          From {formatCurrency(resort.basePrice)} / night
        </Text>
        <PrimaryButton label="Book this stay" />
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
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  coverImage: {
    width: "100%",
    height: 260,
    backgroundColor: colors.surfaceMuted,
  },
  section: {
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  municipality: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 6,
  },
  tagline: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  rating: {
    color: colors.warning,
    fontWeight: "800",
    fontSize: 15,
  },
  review: {
    color: colors.textMuted,
    fontSize: 13,
    marginLeft: 8,
  },
  description: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    color: colors.primaryDark,
    fontWeight: "600",
    fontSize: 12,
  },
  roomCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  roomImage: {
    width: "100%",
    height: 170,
    backgroundColor: colors.surfaceMuted,
  },
  roomContent: {
    padding: 14,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },
  roomDesc: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  roomMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 12,
  },
  roomPrice: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 22,
  },
  offerCard: {
    backgroundColor: colors.warningSoft,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#fed7aa",
  },
  offerTag: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  offerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 8,
  },
  offerText: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  offerDiscount: {
    color: "#b45309",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 10,
  },
  ctaBox: {
    marginHorizontal: 18,
    marginTop: 18,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  ctaPrice: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
});
