import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

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
    iconBg: "#FBEDE8",
    iconColor: "#A14E32",
  },
  {
    id: "history",
    label: "Transaction History",
    icon: "receipt-outline",
    iconBg: "#FBEDE8",
    iconColor: "#A14E32",
  },
  {
    id: "saved",
    label: "Saved Destinations",
    icon: "heart-outline",
    iconBg: "#FBEDE8",
    iconColor: "#A14E32",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings-outline",
    iconBg: "#FBEDE8",
    iconColor: "#A14E32",
  },
  {
    id: "about",
    label: "About",
    icon: "information-circle-outline",
    iconBg: "#FBEDE8",
    iconColor: "#A14E32",
  },
  {
    id: "help",
    label: "Help Center",
    icon: "help-circle-outline",
    iconBg: "#FBEDE8",
    iconColor: "#A14E32",
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: "warning-outline",
    iconBg: "#FBEDE8",
    iconColor: "#A14E32",
  },
  {
    id: "rate",
    label: "Rate our app",
    icon: "thumbs-up-outline",
    iconBg: "#FBEDE8",
    iconColor: "#A14E32",
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

const LEGAL_LINKS = [
  { id: "terms", label: "Terms & Conditions", path: "/legal/terms" },
  { id: "privacy", label: "Data Privacy", path: "/legal/privacy" },
] as const;

export default function MoreOptionsScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const visibleOptions = user
    ? OPTIONS
    : OPTIONS.filter((option) => option.id !== "logout");

  const handleOptionPress = async (option: OptionItem) => {
    if (option.id === "settings") {
      router.push("/settings");
      return;
    }

    if (option.id === "logout") {
      try {
        await signOut();
      } catch {
        // Signing out locally is enough to leave this screen usable.
      }
      router.replace("/");
      return;
    }

    Alert.alert("Action", `${option.label} pressed`);
  };

  return (
    <View className="flex-1 bg-white px-5 pt-16">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}>
        <Text className="text-[20px] font-bold text-ink">More</Text>

        <View className="mt-6 gap-3">
          {visibleOptions.map((option) => (
            <Pressable
              key={option.id}
              onPress={() => handleOptionPress(option)}
              className="flex-row items-center gap-3 rounded-[14px] border border-coral-100 bg-white px-4 py-3.5">
              <View
                className="h-9 w-9 items-center justify-center rounded-[10px]"
                style={{ backgroundColor: option.iconBg }}>
                <Ionicons
                  name={option.icon}
                  size={18}
                  color={option.iconColor}
                />
              </View>
              <Text
                className={`flex-1 text-[15px] font-medium ${
                  option.highlight ? "text-[#E75C4F]" : "text-ink"
                }`}>
                {option.label}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#9AA09C" />
            </Pressable>
          ))}
        </View>

        <View className="mt-6 gap-3">
          {LEGAL_LINKS.map((link) => (
            <Pressable
              key={link.id}
              onPress={() => router.push(link.path)}
              className="rounded-[14px] bg-coral-50 px-4 py-3">
              <Text className="text-[15px] font-medium text-ink">
                {link.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
