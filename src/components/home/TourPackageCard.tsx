import { colors } from "@/styles/global";
import { Image, StyleSheet, Text, View } from "react-native";

export type TourPackageCardData = {
  id: string;
  title: string;
  image: string;
};

type Props = Readonly<{
  item: TourPackageCardData;
}>;

export default function TourPackageCard({ item }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 18,
    backgroundColor: colors.surfaceMuted,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins_600Bold",
    color: colors.text,
    marginTop: 8,
  },
});
