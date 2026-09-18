import { formatCurrency } from "@/lib/formatters";
import { colors } from "@/styles/global";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export type ResortCardData = {
  id: string;
  name: string;
  municipality: string;
  location: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  basePrice: number;
  tagline: string;
};

type Props = Readonly<{
  resort: ResortCardData;
}>;

export default function ResortCard({ resort }: Props) {
  return (
    <Link
      href={{ pathname: "/resort/[id]", params: { id: resort.id } }}
      asChild>
      <Pressable style={styles.card}>
        <Image source={{ uri: resort.coverImage }} style={styles.image} />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.location}>{resort.municipality}</Text>
            <Text style={styles.rating}>★ {resort.rating}</Text>
          </View>

          <Text style={styles.title}>{resort.name}</Text>
          <Text style={styles.tagline}>{resort.tagline}</Text>

          <View style={styles.footer}>
            <View>
              <Text style={styles.price}>
                {formatCurrency(resort.basePrice)}
              </Text>
              <Text style={styles.meta}>per night</Text>
            </View>
            <Text style={styles.review}>{resort.reviewCount} reviews</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: colors.surface,
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 190,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    padding: 14,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  rating: {
    color: colors.warning,
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  tagline: {
    color: colors.textSoft,
    fontSize: 12,
    lineHeight: 18,
    minHeight: 36,
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  price: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 18,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 11,
  },
  review: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "bold",
  },
});
