import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function More() {
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
    </View>
  );
}
