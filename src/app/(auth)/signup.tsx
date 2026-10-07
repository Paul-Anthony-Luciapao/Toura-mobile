import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextField from "@/components/auth/AuthTextField";
import GradientButton from "@/components/common/GradientButton";
import { useAuth } from "@/context/AuthContext";
import { getErrorMessage } from "@/services/api";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type FieldErrors = Partial<
  Record<"name" | "email" | "password" | "confirmPassword", string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpScreen() {
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const errors: FieldErrors = {};

    if (name.trim().length < 2) {
      errors.name = "Enter your full name.";
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSignUp = async () => {
    setFormError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await signUp(
        { name: name.trim(), email: email.trim(), password },
        { remember: true },
      );
      router.replace("/(tabs)");
    } catch (e) {
      // Server-side duplicate email (422 unique:users,email) surfaces here as a clear message.
      setFormError(getErrorMessage(e));
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Sign Up" showBack>
      <View className="mt-8 gap-4">
        <AuthTextField
          icon="person-outline"
          placeholder="Full name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          textContentType="name"
          error={fieldErrors.name}
        />
        <AuthTextField
          icon="mail-outline"
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          error={fieldErrors.email}
        />
        <AuthTextField
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secure
          autoCapitalize="none"
          textContentType="newPassword"
          error={fieldErrors.password}
        />
        <AuthTextField
          icon="lock-closed-outline"
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secure
          autoCapitalize="none"
          textContentType="newPassword"
          error={fieldErrors.confirmPassword}
        />
      </View>

      {formError ? (
        <Text className="mt-4 text-center font-['Poppins_400Regular'] text-[12px] text-red-600">
          {formError}
        </Text>
      ) : null}

      <GradientButton
        label={submitting ? "Creating account..." : "Sign up"}
        className="mt-6"
        disabled={submitting}
        onPress={handleSignUp}
      />

      <View className="mt-6 flex-row justify-center">
        <Text className="font-['Poppins_400Regular'] text-[12px] text-[#334155]">
          Already have an account?{" "}
        </Text>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text className="font-['Poppins_600SemiBold'] text-[12px] text-[#238276]">
            Log in
          </Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}
