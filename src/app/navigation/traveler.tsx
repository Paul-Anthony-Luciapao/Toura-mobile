import { StyleSheet, Text, View } from "react-native";

export default function TravelerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traveler</Text>
      <Text style={styles.subtitle}>Manage your travel preferences and plans.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    color: "#666",
    textAlign: "center",
  },
});
