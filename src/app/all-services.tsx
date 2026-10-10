import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

type ServiceItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const SERVICES: ServiceItem[] = [
  { id: "bike-rentals", label: "Bike rentals", icon: "bicycle-outline" },
  { id: "travel-insurance", label: "Travel\nInsurance", icon: "shield-checkmark-outline" },
  { id: "restaurants", label: "Restaurants", icon: "restaurant-outline" },
  { id: "tickets", label: "Tickets", icon: "ticket-outline" },
  { id: "activities", label: "Activities", icon: "list-outline" },
  { id: "car-rentals", label: "Car Rentals", icon: "car-outline" },
  { id: "hotels", label: "Hotels", icon: "business-outline" },
  { id: "esims", label: "E-Sims", icon: "hardware-chip-outline" },
  { id: "tour-guide", label: "Tour Guide", icon: "headset-outline" },
];

export default function AllServices() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      {/* Top Gradient matching the blurry background feel */}
      <LinearGradient
        colors={["#eaf5f2", "#ffffff"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 250 }}
      />
      
      {/* Header section with back button, search, and bell */}
      <View
        className="px-4 flex-row items-center gap-3 z-10"
        style={{ paddingTop: insets.top + 10, paddingBottom: 20 }}>
        
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
          <Ionicons name="chevron-back" size={20} color="#1F2937" />
        </Pressable>
        
        <View className="flex-1 flex-row items-center bg-white/70 border border-white/50 rounded-full px-4 py-2.5">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-[14px] font-poppins text-ink"
          />
        </View>

        <Pressable className="w-10 h-10 items-center justify-center rounded-full bg-transparent">
          <Ionicons name="notifications-outline" size={24} color="#3FA19B" />
        </Pressable>
      </View>

      {/* Main Content Area - White card with rounded top corners */}
      <View className="flex-1 bg-white rounded-t-[30px] pt-6 shadow-md shadow-black/5" style={{ elevation: 10 }}>
        <Text className="text-center text-[18px] font-poppins-semibold text-[#1F2937] mb-6">
          All Services
        </Text>

        <FlatList
          data={SERVICES}
          keyExtractor={(item) => item.id}
          numColumns={4}
          columnWrapperClassName="justify-between px-5 mb-6"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable className="items-center w-[22%]">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-[#eaf5f2] mb-2">
                <Ionicons name={item.icon} size={22} color="#1F2937" />
              </View>
              <Text className="text-[10px] text-center font-poppins text-[#4B5563] leading-tight">
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}
