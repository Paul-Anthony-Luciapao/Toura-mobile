import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

export type TouristSpotCardData = {
  id: string;
  name: string;
  municipality: string;
  image: string;
  rating: number;
  reviewCount: string;
  price: number;
};

type Props = Readonly<{
  spot: TouristSpotCardData;
}>;

export default function TouristSpotCard({ spot }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: spot.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {spot.name}
        </Text>
        <Text style={styles.location}>· {spot.municipality}</Text>
        <View style={styles.row}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={colors.primary} />
            <Text style={styles.rating}>
              {spot.rating} ({spot.reviewCount})
            </Text>
          </View>
          <Text style={styles.price}>$ {spot.price.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    overflow: "hidden",
    width: 170,
  },
  image: {
    width: "100%",
    height: 130,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    paddingTop: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins_600Bold",
    color: colors.text,
  },
  location: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  rating: {
    fontSize: 12,
    color: colors.textMuted,
  },
  price: {
    fontSize: 13,
    fontFamily: "Poppins_700Bold",
    color: colors.text,
  },
});
