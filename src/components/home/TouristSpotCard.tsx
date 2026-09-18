import { colors } from "@/styles/global";
import { Image, StyleSheet, Text, View } from "react-native";

export type TouristSpotCardData = {
  id: string;
  name: string;
  municipality: string;
  category: string;
  description: string;
  image: string;
};

type Props = Readonly<{
  spot: TouristSpotCardData;
}>;

export default function TouristSpotCard({ spot }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: spot.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{spot.category}</Text>
        <Text style={styles.title}>{spot.name}</Text>
        <Text style={styles.location}>{spot.municipality}</Text>
        <Text style={styles.description}>{spot.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    padding: 14,
  },
  category: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  location: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 8,
  },
  description: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
  },
});
