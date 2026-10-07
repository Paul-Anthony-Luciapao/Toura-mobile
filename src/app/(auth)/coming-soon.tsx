import GradientButton from "@/components/common/GradientButton";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const LABELS: Record<string, string> = {
  guest: "Guest browsing",
  owner: "Owner portal",
  admin: "Admin portal",
};

export default function ComingSoonScreen() {
  const { role } = useLocalSearchParams<{ role?: string }>();
  const label = LABELS[role ?? ""] ?? "This feature";

  return (
    <View className="flex-1 items-center justify-center bg-[#f8fafc] px-8">
      <Ionicons name="construct-outline" size={48} className="text-[#238276]" />
      <Text className="mt-4 text-center font-['Poppins_700Bold'] text-[22px] text-[#0f172a]">
        {label} is coming soon
      </Text>
      <Text className="mt-2 text-center font-['Poppins_400Regular'] text-[13px] text-[#64748b]">
        We&apos;re still building this part of Toura. Check back later.
      </Text>
      <GradientButton
        label="Back to Log in as"
        className="mt-8 w-[220px]"
        onPress={() => router.replace("/role")}
      />
    </View>
  );
}
