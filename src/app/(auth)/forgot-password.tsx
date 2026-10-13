import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextField from "@/components/auth/AuthTextField";
import GradientButton from "@/components/common/GradientButton";
import { getErrorMessage } from "@/services/api";
import { requestPasswordReset } from "@/services/auth";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const normalizedEmail = email.trim();

    setMessage(null);
    setError(null);

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      await requestPasswordReset(normalizedEmail);
      setMessage(
        "If an account exists for that email, a password reset link has been sent.",
      );
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Forgot password" showBack>
      <Text className="mt-4 text-center font-['Poppins_400Regular'] text-[13px] text-[#334155]">
        Enter the email address for your account. If it is registered, we’ll
        send you a reset link.
      </Text>

      <View className="mt-8">
        <AuthTextField
          icon="mail-outline"
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
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

      <GradientButton
        label={submitting ? "Sending..." : "Send reset link"}
        className="mt-6"
        disabled={submitting}
        onPress={handleSubmit}
      />

      <View className="mt-6 flex-row justify-center">
        <Text className="font-['Poppins_400Regular'] text-[12px] text-[#334155]">
          Remembered it?{" "}
        </Text>
        <Pressable onPress={() => router.replace("/login")} hitSlop={8}>
          <Text className="font-['Poppins_600SemiBold'] text-[12px] text-[#238276]">
            Log in
          </Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}
