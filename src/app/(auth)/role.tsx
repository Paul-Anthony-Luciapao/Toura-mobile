import AuthLayout from "@/components/auth/AuthLayout";
import GradientButton from "@/components/common/GradientButton";
import type { Role } from "@/data/types";
import { router } from "expo-router";
import { View } from "react-native";

export default function RoleSelectScreen() {
  const goToLogin = (role: Role) =>
    router.push({ pathname: "/login", params: { role } });

  return (
    <AuthLayout title="Log in as">
      <View className="mt-10 items-center gap-6">
        <GradientButton
          label="User"
          className="w-[220px]"
          onPress={() => goToLogin("traveler")}
        />
        <GradientButton
          label="Owner"
          className="w-[220px]"
          onPress={() => goToLogin("owner")}
        />
      </View>
    </AuthLayout>
  );
}
