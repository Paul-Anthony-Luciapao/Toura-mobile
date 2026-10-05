import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OptionItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  highlight?: boolean;
};

const OPTIONS: OptionItem[] = [
  {
    id: "bookings",
    label: "My bookings",
    icon: "clipboard-outline",
    iconBg: "#F0F3F2",
    iconColor: "#1F2937",
  },
  {
    id: "history",
    label: "Transaction History",
    icon: "receipt-outline",
    iconBg: "#F0F3F2",
    iconColor: "#1F2937",
  },
  {
    id: "saved",
    label: "Saved Destinations",
    icon: "heart-outline",
    iconBg: "#F0F3F2",
    iconColor: "#1F2937",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings-outline",
    iconBg: "#F0F3F2",
    iconColor: "#1F2937",
  },
  {
    id: "about",
    label: "About",
    icon: "information-circle-outline",
    iconBg: "#F0F3F2",
    iconColor: "#1F2937",
  },
  {
    id: "help",
    label: "Help Center",
    icon: "help-circle-outline",
    iconBg: "#F0F3F2",
    iconColor: "#1F2937",
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: "warning-outline",
    iconBg: "#F0F3F2",
    iconColor: "#1F2937",
  },
  {
    id: "rate",
    label: "Rate our app",
    icon: "thumbs-up-outline",
    iconBg: "#F0F3F2",
    iconColor: "#1F2937",
  },
  {
    id: "logout",
    label: "Log out",
    icon: "log-out-outline",
    iconBg: "#FCEAE6",
    iconColor: "#E75C4F",
    highlight: true,
  },
];

export default function MoreOptionsScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleOptionPress = async (option: OptionItem) => {
    if (option.id === "logout") {
      await signOut();
      router.replace("/role");
      return;
    }

    Alert.alert("Action", `${option.label} pressed`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F1F8F4]">
      <StatusBar barStyle="dark-content" />

      <View className="flex-1">
        <View className="px-[18px] pt-[10px]">
          <View className="flex-row items-center justify-between gap-3">
            <Pressable
              onPress={() => router.back()}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="h-[42px] w-[42px] items-center justify-center">
              <Ionicons name="chevron-back" size={30} color="#1F2937" />
            </Pressable>

            <View className="h-[42px] flex-1 flex-row items-center gap-2 rounded-full border border-[#DDEAE5] bg-white/40 px-[14px]">
              <Ionicons name="search-outline" size={22} color="#64748B" />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#64748B"
                className="flex-1 py-0 text-[15px] text-[#1F2937]"
              />
            </View>

            <Pressable
              onPress={() =>
                Alert.alert("Notifications", "Notifications tapped")
              }
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              className="h-[40px] w-[40px] items-center justify-center rounded-full bg-white/40">
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#1F2937"
              />
            </Pressable>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-5 pb-10 pt-[22px]">
          <Text className="text-[33px] font-bold tracking-[-0.8px] text-[#111827]">
            More Options
          </Text>

          <View className="mt-[18px] gap-[12px]">
            {OPTIONS.map((option) => (
              <Pressable
                key={option.id}
                onPress={() => handleOptionPress(option)}
                className={[
                  "min-h-[62px] flex-row items-center rounded-[18px] border border-[#DDE7E2] px-4 py-3",
                  option.highlight ? "bg-[#F9FAFB]" : "bg-[#F9FBFA]",
                ].join(" ")}>
                <View
                  className="h-[36px] w-[36px] items-center justify-center rounded-full"
                  style={{
                    backgroundColor: option.iconBg,
                    borderWidth: option.highlight ? 1 : 0,
                    borderColor: option.highlight ? "#F5C5BF" : "transparent",
                  }}>
                  <Ionicons
                    name={option.icon}
                    size={22}
                    color={option.iconColor}
                  />
                </View>

                <Text
                  className={[
                    "ml-4 text-[18px]",
                    option.highlight
                      ? "font-semibold text-[#E75C4F]"
                      : "font-normal text-[#1F2937]",
                  ].join(" ")}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
