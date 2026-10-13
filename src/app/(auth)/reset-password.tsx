import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextField from "@/components/auth/AuthTextField";
import GradientButton from "@/components/common/GradientButton";
import { getErrorMessage } from "@/services/api";
import { resetPassword } from "@/services/auth";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams<{
    token?: string | string[];
    email?: string | string[];
  }>();

  const token = firstParam(params.token);
  const email = firstParam(params.email);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);

    if (!token || !email) {
      setError("This reset link is incomplete. Request a new one.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await resetPassword({
        email,
        token,
        password,
        password_confirmation: confirmPassword,
      });
      setMessage("Your password has been reset. You can now log in.");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Reset password" showBack>
      <View className="mt-8 gap-4">
        <AuthTextField
          icon="lock-closed-outline"
          placeholder="New password"
          value={password}
          onChangeText={setPassword}
          secure
          autoCapitalize="none"
          textContentType="newPassword"
        />
        <AuthTextField
          icon="lock-closed-outline"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secure
          autoCapitalize="none"
          textContentType="newPassword"
        />
      </View>

      {message ? (
        <Text className="mt-4 text-center font-['Poppins_400Regular'] text-[12px] text-[#238276]">
          {message}
        </Text>
      ) : null}

      {error ? (
        <Text className="mt-4 text-center font-['Poppins_400Regular'] text-[12px] text-red-600">
          {error}
        </Text>
      ) : null}

      {message ? (
        <GradientButton
          label="Go to log in"
          className="mt-6"
          onPress={() => router.replace("/login")}
        />
      ) : (
        <GradientButton
          label={submitting ? "Resetting..." : "Reset password"}
          className="mt-6"
          disabled={submitting}
          onPress={handleSubmit}
        />
      )}
    </AuthLayout>
  );
}
