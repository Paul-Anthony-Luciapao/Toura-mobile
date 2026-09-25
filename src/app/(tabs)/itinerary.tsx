import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ImageBackground,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const palette = {
  coral: "#E07856",
  coralSoft: "#FBEDE8",
  cream: "#F5EBD8",
  gold: "#F0D9A8",
  ink: "#1B1F1E",
  muted: "#777C78",
  line: "#E9E5DD",
  paper: "#FFFCF7",
};

const days = [
  { label: "DAY 01", date: "Oct 14" },
  { label: "DAY 02", date: "Oct 15" },
  { label: "DAY 03", date: "Oct 16" },
];

const plans = [
  [
    { time: "8:00 AM", title: "Breakfast by the bay", detail: "Bayview Cliffside Villas · Included", icon: "cafe-outline", tag: "MEAL" },
    { time: "9:30 AM", title: "Big Lagoon & island hop", detail: "Tour A · 4 stops · 5 hours", icon: "boat-outline", tag: "EXPERIENCE" },
    { time: "1:00 PM", title: "Picnic lunch on Shimizu", detail: "Fresh local seafood · Included", icon: "restaurant-outline", tag: "MEAL" },
    { time: "4:30 PM", title: "Golden hour at Las Cabañas", detail: "Van transfer · 15 min", icon: "sunny-outline", tag: "FREE TIME" },
  ],
  [
    { time: "7:30 AM", title: "Coffee & slow morning", detail: "Bayview Cliffside Villas", icon: "cafe-outline", tag: "MEAL" },
    { time: "9:00 AM", title: "Secret Beach & snorkeling", detail: "Tour C · 3 stops · 6 hours", icon: "water-outline", tag: "EXPERIENCE" },
    { time: "3:30 PM", title: "Reset by the pool", detail: "Time to unwind at the villa", icon: "sunny-outline", tag: "FREE TIME" },
  ],
  [
    { time: "8:30 AM", title: "Breakfast & checkout", detail: "Bayview Cliffside Villas", icon: "cafe-outline", tag: "MEAL" },
    { time: "10:00 AM", title: "Nacpan Beach", detail: "Private transfer · 45 min", icon: "car-outline", tag: "EXPERIENCE" },
    { time: "2:00 PM", title: "Head to the airport", detail: "Lio Airport · 20 min", icon: "airplane-outline", tag: "TRANSFER" },
  ],
];

export default function ItineraryScreen() {
  const [activeDay, setActiveDay] = useState(0);
  const schedule = plans[activeDay];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.eyebrow}>YOUR NEXT CHAPTER</Text>
            <Text style={styles.heading}>Itinerary</Text>
          </View>
          <Pressable accessibilityLabel="More itinerary options" style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={22} color={palette.ink} />
          </Pressable>
        </View>

        <ImageBackground
          source={{ uri: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=85" }}
          imageStyle={styles.tripImage}
          style={styles.tripCard}>
          <View style={styles.tripShade} />
          <View style={styles.tripTopRow}>
            <View style={styles.statusPill}><View style={styles.statusDot} /><Text style={styles.statusText}>UPCOMING TRIP</Text></View>
            <Pressable accessibilityLabel="Save trip" style={styles.saveButton}>
              <Ionicons name="bookmark-outline" size={18} color="#fff" />
            </Pressable>
          </View>
          <View style={styles.tripCopy}>
            <Text style={styles.tripLocation}>PALAWAN, PHILIPPINES</Text>
            <Text style={styles.tripTitle}>A little more{`\n`}El Nido</Text>
            <View style={styles.tripMeta}>
              <Ionicons name="calendar-clear-outline" size={15} color={palette.gold} />
              <Text style={styles.tripMetaText}>October 14 — 16, 2026</Text>
              <View style={styles.metaDivider} />
              <Ionicons name="people-outline" size={15} color={palette.gold} />
              <Text style={styles.tripMetaText}>2 travelers</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.sectionHeader}>
          <View><Text style={styles.sectionKicker}>THREE DAYS, WELL SPENT</Text><Text style={styles.sectionTitle}>Your plans</Text></View>
          <Pressable style={styles.editButton}>
            <Ionicons name="create-outline" size={16} color={palette.coral} />
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.daySelector}>
          {days.map((day, index) => {
            const selected = index === activeDay;
            return (
              <Pressable key={day.label} onPress={() => setActiveDay(index)} style={[styles.dayTab, selected && styles.dayTabActive]}>
                <Text style={[styles.dayLabel, selected && styles.dayLabelActive]}>{day.label}</Text>
                <Text style={[styles.dayDate, selected && styles.dayDateActive]}>{day.date}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleDate}>{["WEDNESDAY, OCTOBER 14", "THURSDAY, OCTOBER 15", "FRIDAY, OCTOBER 16"][activeDay]}</Text>
          <Text style={styles.stopCount}>{schedule.length} STOPS</Text>
        </View>

        <View style={styles.timeline}>
          {schedule.map((item, index) => (
            <View key={`${item.time}-${item.title}`} style={styles.timelineRow}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{item.time}</Text>
                <View style={styles.timelineTrack}>
                  <View style={[styles.timelineDot, index === 0 && styles.timelineDotFirst]} />
                  {index < schedule.length - 1 && <View style={styles.timelineLine} />}
                </View>
              </View>
              <View style={styles.eventCard}>
                <View style={styles.eventIcon}><Ionicons name={item.icon as any} size={20} color={palette.coral} /></View>
                <View style={styles.eventCopy}>
                  <Text style={styles.eventTag}>{item.tag}</Text>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventDetail}>{item.detail}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#B8B5AF" />
              </View>
            </View>
          ))}
        </View>

        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={19} color={palette.coral} />
          <Text style={styles.addButtonText}>Add a stop</Text>
        </Pressable>

        <View style={styles.noteCard}>
          <View style={styles.noteIcon}><Ionicons name="sparkles-outline" size={18} color={palette.coral} /></View>
          <View style={styles.noteCopy}><Text style={styles.noteTitle}>A note for the journey</Text><Text style={styles.noteText}>Island tours can change with the tide. Keep your afternoon flexible.</Text></View>
          <Ionicons name="arrow-forward" size={17} color={palette.coral} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.paper },
  scrollContent: { paddingHorizontal: 22, paddingBottom: 30 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 10, paddingBottom: 19 },
  eyebrow: { color: palette.coral, fontFamily: "Poppins_600SemiBold", fontSize: 10, letterSpacing: 1.6 },
  heading: { color: palette.ink, fontFamily: "Poppins_700Bold", fontSize: 30, lineHeight: 39, marginTop: 2 },
  moreButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#F4F0E9", alignItems: "center", justifyContent: "center" },
  tripCard: { height: 244, borderRadius: 22, overflow: "hidden", justifyContent: "space-between", padding: 18, backgroundColor: palette.ink },
  tripImage: { borderRadius: 22 },
  tripShade: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(20, 28, 27, 0.40)" },
  tripTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  statusPill: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: "rgba(27,31,30,0.55)", flexDirection: "row", alignItems: "center", gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: palette.gold },
  statusText: { color: "#fff", fontFamily: "Poppins_600SemiBold", fontSize: 9, letterSpacing: 1 },
  saveButton: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(27,31,30,0.45)" },
  tripCopy: { paddingBottom: 2 },
  tripLocation: { color: palette.gold, fontFamily: "Poppins_600SemiBold", fontSize: 10, letterSpacing: 1.7 },
  tripTitle: { color: "#fff", fontFamily: "Poppins_700Bold", fontSize: 30, lineHeight: 35, marginTop: 3 },
  tripMeta: { flexDirection: "row", alignItems: "center", marginTop: 13, gap: 6 },
  tripMetaText: { color: "#fff", fontFamily: "Poppins_500Medium", fontSize: 10 },
  metaDivider: { height: 12, width: 1, marginHorizontal: 3, backgroundColor: "rgba(255,255,255,0.5)" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 27, marginBottom: 15 },
  sectionKicker: { color: palette.muted, fontFamily: "Poppins_500Medium", fontSize: 9, letterSpacing: 1.35 },
  sectionTitle: { color: palette.ink, fontFamily: "Poppins_700Bold", fontSize: 22, marginTop: 1 },
  editButton: { flexDirection: "row", alignItems: "center", gap: 5, paddingBottom: 4 },
  editText: { color: palette.coral, fontFamily: "Poppins_600SemiBold", fontSize: 12 },
  daySelector: { flexDirection: "row", backgroundColor: "#F1EEE7", borderRadius: 14, padding: 4, gap: 4 },
  dayTab: { flex: 1, alignItems: "center", paddingVertical: 9, borderRadius: 11 },
  dayTabActive: { backgroundColor: palette.ink },
  dayLabel: { color: "#898B85", fontFamily: "Poppins_600SemiBold", fontSize: 9, letterSpacing: 0.6 },
  dayLabelActive: { color: palette.gold },
  dayDate: { color: palette.ink, fontFamily: "Poppins_600SemiBold", fontSize: 12, marginTop: 1 },
  dayDateActive: { color: "#fff" },
  scheduleHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 23, marginBottom: 12 },
  scheduleDate: { color: palette.muted, fontFamily: "Poppins_600SemiBold", fontSize: 9, letterSpacing: 1.1 },
  stopCount: { color: palette.coral, fontFamily: "Poppins_600SemiBold", fontSize: 9, letterSpacing: 0.7 },
  timeline: { gap: 0 },
  timelineRow: { flexDirection: "row", minHeight: 92 },
  timeColumn: { width: 76, alignItems: "flex-start" },
  timeText: { color: palette.ink, fontFamily: "Poppins_600SemiBold", fontSize: 10, paddingTop: 17 },
  timelineTrack: { position: "absolute", top: 37, right: 12, bottom: 0, width: 10, alignItems: "center" },
  timelineDot: { width: 8, height: 8, borderRadius: 4, borderWidth: 2, borderColor: palette.coral, backgroundColor: palette.paper, zIndex: 1 },
  timelineDotFirst: { backgroundColor: palette.coral },
  timelineLine: { flex: 1, width: 1, backgroundColor: "#E5CFC4" },
  eventCard: { flex: 1, minHeight: 76, padding: 12, borderRadius: 15, backgroundColor: "#fff", borderWidth: 1, borderColor: "#F0ECE5", flexDirection: "row", alignItems: "center", marginBottom: 13, shadowColor: "#29251F", shadowOpacity: 0.035, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  eventIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: palette.coralSoft, alignItems: "center", justifyContent: "center", marginRight: 11 },
  eventCopy: { flex: 1 },
  eventTag: { color: palette.coral, fontFamily: "Poppins_600SemiBold", fontSize: 8, letterSpacing: 0.8 },
  eventTitle: { color: palette.ink, fontFamily: "Poppins_600SemiBold", fontSize: 12, marginTop: 1 },
  eventDetail: { color: palette.muted, fontFamily: "Poppins_400Regular", fontSize: 9, marginTop: 2 },
  addButton: { height: 44, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, borderRadius: 13, borderWidth: 1, borderColor: "#E9C7B9", borderStyle: "dashed", marginLeft: 76, marginBottom: 17 },
  addButtonText: { color: palette.coral, fontFamily: "Poppins_600SemiBold", fontSize: 11 },
  noteCard: { flexDirection: "row", alignItems: "center", backgroundColor: palette.cream, borderRadius: 16, padding: 14, gap: 11 },
  noteIcon: { width: 34, height: 34, borderRadius: 11, backgroundColor: "rgba(255,255,255,0.65)", alignItems: "center", justifyContent: "center" },
  noteCopy: { flex: 1 },
  noteTitle: { color: palette.ink, fontFamily: "Poppins_600SemiBold", fontSize: 11 },
  noteText: { color: "#6E6A5F", fontFamily: "Poppins_400Regular", fontSize: 9, lineHeight: 14, marginTop: 2 },
});
