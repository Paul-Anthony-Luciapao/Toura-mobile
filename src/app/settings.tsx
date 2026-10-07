import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  teal: "#2A9D8F",
  paper: "#FFFEFE",
  mint: "#E9F7F5",
  ink: "#172033",
};

export default function Settings() {
  const router = useRouter();
  const { user, loading, signOut, deleteAccount } = useAuth();
  const [busy, setBusy] = useState(false);

  const handleLogout = async () => {
    setBusy(true);
    try {
      await signOut();
      router.replace("/profile");
    } catch {
      Alert.alert("Error", "Could not log out. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "This action is permanent. Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setBusy(true);
            try {
              await deleteAccount();
              router.replace("/");
            } catch {
              Alert.alert("Error", "Could not delete the account.");
            } finally {
              setBusy(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: COLORS.paper }}
        edges={["top"]}>
        <ActivityIndicator color={COLORS.teal} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 px-5"
      style={{ backgroundColor: COLORS.paper }}
      edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <View className="flex-row items-center gap-3 py-3">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: COLORS.mint }}>
          <Ionicons name="chevron-back" size={24} color={COLORS.ink} />
        </Pressable>
        <Text className="text-[22px] font-poppins-semibold text-[#172033]">
          Settings
        </Text>
      </View>

      {!user ? (
        <View className="mt-8 gap-4">
          <Text className="font-poppins text-[#334155]">
            Sign in to manage your account.
          </Text>
          <Pressable
            onPress={() => router.push("/login")}
            className="items-center rounded-xl px-4 py-3"
            style={{ backgroundColor: COLORS.teal }}>
            <Text className="font-poppins-semibold text-white">Log in</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/signup-role")}
            className="items-center rounded-xl border px-4 py-3"
            style={{ borderColor: COLORS.teal }}>
            <Text className="font-poppins-semibold text-[#172033]">
              Sign up
            </Text>
          </Pressable>
        </View>
      ) : (
        <View className="mt-8">
          <Text className="text-[13px] font-poppins-semibold text-[#64748B]">
            ACCOUNT
          </Text>
          <Text className="mt-2 font-poppins text-[#334155]">{user.email}</Text>

          <Pressable
            disabled={busy}
            onPress={handleLogout}
            className="mt-7 min-h-14 flex-row items-center justify-between rounded-xl px-4"
            style={{ backgroundColor: COLORS.mint }}>
            <Text className="font-poppins-medium text-[#172033]">Log out</Text>
            {busy ? (
              <ActivityIndicator color={COLORS.teal} />
            ) : (
              <Ionicons name="log-out-outline" size={22} color={COLORS.teal} />
            )}
          </Pressable>

          <Pressable
            disabled={busy}
            onPress={confirmDeleteAccount}
            className="mt-3 min-h-14 flex-row items-center justify-between rounded-xl border px-4"
            style={{ borderColor: "#E7C7C4" }}>
            <Text className="font-poppins-medium text-[#B42318]">
              Delete account
            </Text>
            <Ionicons name="trash-outline" size={21} color="#B42318" />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
