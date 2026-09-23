import { StyleSheet, Text, View } from "react-native";

export default function TouristSpotsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tourist Spots</Text>
      <Text style={styles.subtitle}>Explore places to visit in Palawan.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { marginTop: 8, color: "#666" },
});
