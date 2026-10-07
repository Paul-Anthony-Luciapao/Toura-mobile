import type { Role } from "@/data/types";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function SignUpRoleScreen() {
  const handleSelect = (role: Exclude<Role, "admin">) => {
    router.push({
      pathname: "/consent",
      params: { role },
    });
  };

  return (
    <View className="flex-1 bg-[#f8fafc] px-6 pt-20">
      <Pressable onPress={() => router.push("/")}>
        <Text>Go back</Text>
      </Pressable>

      <Text className="text-center text-[34px] font-bold text-slate-900">
        Sign up as
      </Text>

      <View className="mt-10 gap-4">
        <Pressable
          onPress={() => handleSelect("traveler")}
          className="items-center rounded-xl bg-[#2aa6a0] px-4 py-4 shadow-sm">
          <Text className="text-[18px] font-semibold text-white">Traveler</Text>
        </Pressable>

        <Pressable
          onPress={() => handleSelect("owner")}
          className="items-center rounded-xl bg-[#2aa6a0] px-4 py-4 shadow-sm">
          <Text className="text-[18px] font-semibold text-white">Owner</Text>
        </Pressable>
      </View>
    </View>
  );
}
