import { useAuth } from "@/context/AuthContext";
import { safeBack } from "@/lib/navigation";
import { getErrorMessage } from "@/services/api";
import { changePasswordRequest } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEAL = "#2A9D8F";

export default function ChangePasswordScreen() {
  const { loading } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    if (newPassword.length < 8) {
      setError("Your new password must be at least 8 characters.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("Choose a password different from your current password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await changePasswordRequest({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      Alert.alert("Password changed", "Your password has been updated.", [
        { text: "OK", onPress: () => safeBack("/settings") },
      ]);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#FFFEFE]" edges={["top"]}>
        <ActivityIndicator color={TEAL} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFFEFE] px-5" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <View className="flex-row items-center gap-3 py-3">
        <Pressable
          onPress={() => safeBack("/settings")}
          accessibilityRole="button"
          accessibilityLabel="Go back to settings"
          className="h-11 w-11 items-center justify-center rounded-full bg-[#E9F7F5]">
          <Ionicons name="chevron-back" size={24} color="#172033" />
        </Pressable>
        <Text className="font-poppins-semibold text-[22px] text-[#172033]">
          Change password
        </Text>
      </View>

      <ScrollView
        className="mt-5 flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 28 }}>
        <Text className="font-poppins text-[14px] leading-6 text-[#64748B]">
          Enter your current password, then choose a new password with at least 8 characters.
        </Text>

        <View className="mt-6 rounded-2xl border border-[#E5E7EB] p-4">
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current password"
            secureTextEntry
            autoCapitalize="none"
            textContentType="password"
            accessibilityLabel="Current password"
            className="min-h-12 rounded-xl border border-[#D7DEE7] px-4 font-poppins text-[#172033]"
            placeholderTextColor="#94A3B8"
          />
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New password"
            secureTextEntry
            autoCapitalize="none"
            textContentType="newPassword"
            accessibilityLabel="New password"
            className="mt-3 min-h-12 rounded-xl border border-[#D7DEE7] px-4 font-poppins text-[#172033]"
            placeholderTextColor="#94A3B8"
          />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            secureTextEntry
            autoCapitalize="none"
            textContentType="newPassword"
            accessibilityLabel="Confirm new password"
            className="mt-3 min-h-12 rounded-xl border border-[#D7DEE7] px-4 font-poppins text-[#172033]"
            placeholderTextColor="#94A3B8"
            returnKeyType="done"
            onSubmitEditing={() => void handleSubmit()}
          />

          {error ? (
            <Text accessibilityRole="alert" className="mt-3 font-poppins text-[12px] text-[#B42318]">
              {error}
            </Text>
          ) : null}

          <Pressable
            disabled={
              submitting || !currentPassword || !newPassword || !confirmPassword
            }
            onPress={() => void handleSubmit()}
            className="mt-5 min-h-12 flex-row items-center justify-center rounded-xl px-4 disabled:opacity-60"
            style={{ backgroundColor: TEAL }}>
            {submitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="font-poppins-semibold text-white">Update password</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
