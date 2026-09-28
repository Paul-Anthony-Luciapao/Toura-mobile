import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextField from "@/components/auth/AuthTextField";
import GradientButton from "@/components/common/GradientButton";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/data/types";
import { getErrorMessage } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { role } = useLocalSearchParams<{ role?: Role }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length > 0;

  const handleLogin = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email.trim(), password, { role, remember });
      router.replace("/(tabs)");
    } catch (e) {
      setError(getErrorMessage(e));
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Log In" showBack>
      <View className="mt-8 gap-4">
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
        <AuthTextField
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secure
          autoCapitalize="none"
          textContentType="password"
        />
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <Pressable
          className="flex-row items-center gap-2"
          onPress={() => setRemember((v) => !v)}
          hitSlop={8}>
          <View
            className={`h-4 w-4 items-center justify-center rounded-[3px] border ${
              remember
                ? "border-[#3f8a7c] bg-[#3f8a7c]"
                : "border-slate-400 bg-white"
            }`}>
            {remember ? (
              <Ionicons name="checkmark" size={12} className="text-white" />
            ) : null}
          </View>
          <Text className="font-['Poppins_400Regular'] text-[11px] text-[#334155]">
            Remember me
          </Text>
        </Pressable>

        <Pressable hitSlop={8}>
          <Text className="font-['Poppins_500Medium'] text-[12px] text-[#238276]">
            Forgot password
          </Text>
        </Pressable>
      </View>

      {error ? (
        <Text className="mt-4 text-center font-['Poppins_400Regular'] text-[12px] text-red-600">
          {error}
        </Text>
      ) : null}

      <GradientButton
        label={submitting ? "Logging in..." : "Log in"}
        className="mt-6"
        disabled={!canSubmit || submitting}
        onPress={handleLogin}
      />

      <View className="mt-6 flex-row justify-center">
        <Text className="font-['Poppins_400Regular'] text-[12px] text-[#334155]">
          Don't have an account?{" "}
        </Text>
        <Pressable hitSlop={8}>
          <Text className="font-['Poppins_600SemiBold'] text-[12px] text-[#238276]">
            Sign up here
          </Text>
        </Pressable>
      </View>

      <Text className="mt-8 text-center font-['Poppins_400Regular'] text-[12px] text-[#334155]">
        Continue with
      </Text>
      <View className="mt-4 flex-row justify-center gap-5">
        <View className="h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white">
          <Ionicons name="logo-google" size={22} className="text-[#DB4437]" />
        </View>
        <View className="h-11 w-11 items-center justify-center rounded-full bg-[#1877F2]">
          <Ionicons name="logo-facebook" size={22} className="text-white" />
        </View>
        <View className="h-11 w-11 items-center justify-center rounded-full bg-black">
          <Ionicons name="logo-apple" size={22} className="text-white" />
        </View>
      </View>
    </AuthLayout>
  );
}
