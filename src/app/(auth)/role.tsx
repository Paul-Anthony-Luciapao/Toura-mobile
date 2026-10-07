import AuthLayout from "@/components/auth/AuthLayout";
import GradientButton from "@/components/common/GradientButton";
import { router } from "expo-router";
import { View } from "react-native";

export default function RoleSelectScreen() {
  const goToConsent = (role: "traveler" | "guest" | "owner" | "admin") =>
    router.push({ pathname: "/consent", params: { role } });

  return (
    <AuthLayout title="Log in as">
      <View className="mt-10 items-center gap-6">
        <GradientButton
          label="User"
          className="w-[220px]"
          onPress={() => goToConsent("traveler")}
        />
        <GradientButton
          label="Guest"
          className="w-[220px]"
          onPress={() => goToConsent("guest")}
        />
        <GradientButton
          label="Owner"
          className="w-[220px]"
          onPress={() => goToConsent("owner")}
        />
        <GradientButton
          label="Admin"
          className="w-[220px]"
          onPress={() => goToConsent("admin")}
        />
      </View>
    </AuthLayout>
  );
}
