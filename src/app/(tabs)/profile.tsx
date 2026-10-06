import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const { user, signOut, deleteAccount } = useAuth();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "This action is permanent. Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
              router.replace("/");
            } catch {
              Alert.alert("Error", "Could not delete the account.");
            }
          },
        },
      ],
    );
  };

  if (!user) {
    return (
      <View className="flex-1 bg-white px-5 pt-16">
        <Text className="text-[24px] font-bold text-slate-900">Profile</Text>

        <View className="mt-8 gap-4">
          <Text className="text-[16px] text-slate-600">
            You are not signed in yet.
          </Text>

          <Pressable
            onPress={() => router.push("/login")}
            className="items-center rounded-xl bg-slate-900 px-4 py-3">
            <Text className="text-[15px] font-semibold text-white">Log in</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/signup-role")}
            className="items-center rounded-xl border border-slate-300 px-4 py-3">
            <Text className="text-[15px] font-semibold text-slate-900">
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-5 pt-16">
      <Text className="text-[24px] font-bold text-slate-900">Profile</Text>

      <View className="mt-8 gap-4">
        <Text className="text-[18px] font-medium text-slate-800">
          Welcome, {user.name}
        </Text>

        <Text className="text-[14px] text-slate-600">Email: {user.email}</Text>

        <Pressable
          onPress={async () => {
            await signOut();
            router.replace("/profile");
          }}
          className="items-center rounded-xl bg-red-50 px-4 py-3">
          <Text className="text-[15px] font-semibold text-red-600">
            Log out
          </Text>
        </Pressable>

        <Pressable
          onPress={handleDeleteAccount}
          className="items-center rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <Text className="text-[15px] font-semibold text-red-600">
            Delete account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
