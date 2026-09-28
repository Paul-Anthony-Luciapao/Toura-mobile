import AuthLayout from "@/components/auth/AuthLayout";
import GradientButton from "@/components/common/GradientButton";
import { router } from "expo-router";
import { View } from "react-native";

export default function RoleSelectScreen() {
  return (
    <AuthLayout title="Log in as">
      <View className="mt-10 items-center gap-6">
        <GradientButton
          label="User"
          className="w-[220px]"
          onPress={() => router.push("/login")}
        />
        <GradientButton label="Guest" className="w-[220px]" />
        <GradientButton label="Owner" className="w-[220px]" />
        <GradientButton label="Admin" className="w-[220px]" />
      </View>
    </AuthLayout>
  );
}
