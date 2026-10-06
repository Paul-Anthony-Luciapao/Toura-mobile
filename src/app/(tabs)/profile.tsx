import { useAuth } from "@/context/auth";
import { roleLabel } from "@/services/auth";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const { user, signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-5 pb-10"
      contentContainerStyle={{ paddingTop: insets.top + 24 }}>
      <Text className="text-[20px] font-bold text-ink">Profile</Text>

      <View className="mt-6 flex-row items-center gap-4 rounded-[24px] border border-coral-100 bg-coral-50 p-4">
        {user?.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            className="h-16 w-16 rounded-full"
            contentFit="cover"
          />
        ) : (
          <View className="h-16 w-16 items-center justify-center rounded-full bg-coral-200">
            <Text className="text-[20px] font-bold text-coral-700">
              {initials}
            </Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="text-[17px] font-bold text-ink" numberOfLines={1}>
            {user?.name ?? "Guest"}
          </Text>
          <Text className="mt-0.5 text-[13px] text-ink-500" numberOfLines={1}>
            {user?.email ?? ""}
          </Text>
          {user?.role ? (
            <View className="mt-2 flex-row items-center gap-1.5 self-start rounded-full bg-coral-400 px-3 py-1">
              <Ionicons
                name={
                  user.role === "admin"
                    ? "shield-checkmark"
                    : user.role === "owner"
                      ? "business"
                      : "airplane"
                }
                size={12}
                color={colors.white}
              />
              <Text className="text-[11px] font-semibold text-white">
                {roleLabel(user.role)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {user?.phone ? (
        <View className="mt-4 flex-row items-center gap-3 rounded-2xl border border-coral-100 px-4 py-3.5">
          <Ionicons name="call-outline" size={18} color={colors.primary} />
          <Text className="text-[14px] text-ink">{user.phone}</Text>
        </View>
      ) : null}

      <Pressable
        onPress={handleSignOut}
        disabled={signingOut}
        className="mt-8 flex-row items-center justify-center gap-2 rounded-2xl border border-coral-200 bg-white py-[15px]">
        {signingOut ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <>
            <Ionicons name="log-out-outline" size={18} color={colors.primary} />
            <Text className="text-[15px] font-bold text-coral-600">
              Sign Out
            </Text>
          </>
        )}
      </Pressable>
    </ScrollView>
  );
}
