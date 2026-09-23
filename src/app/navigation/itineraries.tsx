import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { INITIAL_RESORTS, INITIAL_TOURIST_SPOTS } from "../../data/mockData";
import { colors } from "../../styles/global";

const shortcuts = [
  { label: "Activities", icon: "list-outline" },
  { label: "Hotels", icon: "business-outline" },
  { label: "Car Rentals", icon: "car-sport-outline" },
  { label: "E-Sims", icon: "phone-portrait-outline" },
  { label: "More", icon: "ellipsis-vertical" },
] as const;

export default function ItinerariesScreen() {
  const packages = INITIAL_TOURIST_SPOTS.slice(0, 2);
  const hotels = INITIAL_RESORTS.slice(0, 2);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topRow}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </Pressable>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={22} color={colors.text} />
          <TextInput placeholder="Search" placeholderTextColor={colors.textMuted} style={styles.searchInput} />
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" hitSlop={12}>
          <Ionicons name="notifications-outline" size={27} color={colors.text} />
          <View style={styles.notificationDot} />
        </Pressable>
      </View>

      <View style={styles.shortcuts}>
        {shortcuts.map((item) => (
          <Pressable key={item.label} style={styles.shortcut}>
            <View style={styles.shortcutIcon}><Ionicons name={item.icon} size={24} color={colors.text} /></View>
            <Text style={styles.shortcutLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {packages.map((spot) => (
          <Pressable key={spot.id} style={styles.card}>
            <Image source={{ uri: spot.image }} style={styles.cardImage} />
            <Text numberOfLines={1} style={styles.cardTitle}>{spot.name} Tour</Text>
            <Text style={styles.cardMeta}>• 4 Guests</Text>
            <View style={styles.cardFooter}>
              <AvatarGroup />
              <Text style={styles.rating}>★ 4.9 <Text style={styles.reviewCount}>(1.3M)</Text></Text>
            </View>
            <Text style={styles.price}>₱ 2,800</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Hotels In Palawan</Text>
        <Pressable style={styles.viewAll}><Text style={styles.viewAllText}>View all</Text><Ionicons name="arrow-forward" size={16} color={colors.primary} /></Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {hotels.map((hotel) => (
          <Pressable key={hotel.id} style={styles.card}>
            <Image source={{ uri: hotel.coverImage }} style={styles.cardImage} />
            <Text numberOfLines={1} style={styles.cardTitle}>{hotel.name}</Text>
            <Text numberOfLines={1} style={styles.cardMeta}>{hotel.municipality} · Up to 4 guests</Text>
            <View style={styles.cardFooter}>
              <AvatarGroup />
              <Text style={styles.rating}>★ {hotel.rating.toFixed(1)} <Text style={styles.reviewCount}>({hotel.reviewCount})</Text></Text>
            </View>
            <Text style={styles.price}>₱ {hotel.basePrice.toLocaleString()}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

function AvatarGroup() {
  return <View style={styles.avatars}><View style={styles.avatar} /><View style={[styles.avatar, styles.avatarOverlap]} /><View style={[styles.avatar, styles.avatarOverlap]} /></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface }, content: { paddingTop: 20, paddingBottom: 32 },
  topRow: { flexDirection: "row", alignItems: "center", gap: 16, paddingHorizontal: 20 },
  searchBox: { flex: 1, height: 46, flexDirection: "row", alignItems: "center", gap: 9, paddingHorizontal: 14, borderWidth: 1, borderColor: "#d7dce4", borderRadius: 10, backgroundColor: "#fff" }, searchInput: { flex: 1, fontSize: 15, color: colors.text, paddingVertical: 0 },
  notificationDot: { position: "absolute", top: 0, right: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: "#21a78e" },
  shortcuts: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 18, marginTop: 16, marginBottom: 24 }, shortcut: { alignItems: "center", width: 60 }, shortcutIcon: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: "#eaf8f6" }, shortcutLabel: { marginTop: 6, fontSize: 11, color: colors.text, textAlign: "center" },
  horizontalList: { gap: 18, paddingHorizontal: 20 }, card: { width: 194 }, cardImage: { width: "100%", height: 194, borderRadius: 9, backgroundColor: colors.surfaceMuted }, cardTitle: { marginTop: 7, color: colors.text, fontSize: 14, fontWeight: "600" }, cardMeta: { color: colors.textSoft, fontSize: 12, marginTop: 1 }, cardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 },
  avatars: { flexDirection: "row", paddingLeft: 2 }, avatar: { width: 15, height: 15, borderRadius: 8, backgroundColor: "#98a4b3", borderWidth: 1, borderColor: "#fff" }, avatarOverlap: { marginLeft: -5 }, rating: { color: colors.primary, fontSize: 11, fontWeight: "600" }, reviewCount: { color: colors.textMuted, fontWeight: "400" }, price: { marginTop: 4, color: colors.text, fontSize: 13, fontWeight: "700", textAlign: "right" },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 28, marginBottom: 12 }, sectionTitle: { color: colors.text, fontSize: 21, fontWeight: "700" }, viewAll: { flexDirection: "row", alignItems: "center", gap: 4 }, viewAllText: { color: colors.primary, fontSize: 12 },
});
