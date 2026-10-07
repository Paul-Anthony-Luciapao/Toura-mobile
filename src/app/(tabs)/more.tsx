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
  const { user, signOut } = useAuth();

  const visibleOptions = user
    ? OPTIONS
    : OPTIONS.filter((option) => option.id !== "logout");

  const handleOptionPress = async (option: OptionItem) => {
    if (option.id === "logout") {
      await signOut();
      router.replace("/profile");
      return;
    }

    Alert.alert("Action", `${option.label} pressed`);
  };

  return (
    <View className="flex-1 bg-white px-5 pt-16">
      <Text className="text-[20px] font-bold text-slate-900">More</Text>

      <View className="mt-6 gap-3">
        <Pressable
          onPress={() => router.push("/legal/terms")}
          className="rounded-xl bg-slate-300 px-4 py-3">
          <Text className="text-[15px] font-medium text-slate-900">
            Terms & Conditions
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/legal/privacy")}
          className="rounded-xl bg-slate-300 px-4 py-3">
          <Text className="text-[15px] font-medium text-slate-900">
            Data Privacy
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
