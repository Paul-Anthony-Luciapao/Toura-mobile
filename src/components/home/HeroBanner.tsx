import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Header from "./Header";

type Props = Readonly<{
  image: string;
  headline: string;
  subtext: string;
}>;

export default function HeroBanner({ image, headline, subtext }: Props) {
  return (
    <ImageBackground source={{ uri: image }} style={styles.background}>
      <View style={styles.overlay} />
      <Header variant="light" />
      <View style={styles.content}>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.subtext}>{subtext}</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            placeholder="Search destinations, itineraries..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 480,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.heroOverlayBottom,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  headline: {
    fontSize: 34,
    fontWeight: "700",
    color: colors.white,
    lineHeight: 40,
  },
  subtext: {
    fontSize: 14,
    color: colors.white,
    marginTop: 12,
    lineHeight: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 20,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
});
