import { useAuth } from "@/context/auth";
import { describeApiError } from "@/services/toura";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<"email" | "password" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0;

  const handleSubmit = async () => {
    if (submitting || !canSubmit) return;
    setError(null);

    try {
      setSubmitting(true);
      await signIn(email, password);
      // The root layout's protected routes send the user to the app.
    } catch (e: unknown) {
      const status =
        typeof e === "object" &&
        e !== null &&
        "response" in e &&
        (e as { response?: { status?: number } }).response?.status;

      setError(
        status === 401 || status === 422
          ? "Incorrect email or password. Please try again."
          : describeApiError(e),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-cream"
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <StatusBar barStyle="dark-content" />

      <View pointerEvents="none" className="absolute left-0 right-0 top-0">
        <View className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-coral-100 opacity-60" />
        <View className="absolute -left-20 top-24 h-48 w-48 rounded-full bg-coral-200 opacity-40" />
        <View className="absolute right-10 top-40 h-10 w-10 rounded-full bg-coral-300 opacity-60" />
      </View>

      <ScrollView
        contentContainerClassName="grow"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View
          className="flex-1 px-6"
          style={{ paddingTop: insets.top + 48, paddingBottom: insets.bottom + 24 }}>
          <View className="items-center">
            <View className="h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-sm shadow-black/[0.08]">
              <Image
                source={require("../../assets/logo/toura-logo.png")}
                className="h-16 w-16"
                contentFit="contain"
              />
            </View>
            <Text className="mt-4 text-[26px] font-bold tracking-tight text-ink">
              Toura
            </Text>
            <Text className="mt-1 text-[13px] text-ink-500">
              Explore Palawan, the Toura way
            </Text>
          </View>

          <View className="mt-9 rounded-[28px] border border-coral-100 bg-white p-6 shadow-sm shadow-black/[0.06]">
            <Text className="text-[22px] font-bold text-ink">Welcome back</Text>
            <Text className="mt-1 text-[13px] text-ink-500">
              Sign in and we&apos;ll take you where you belong.
            </Text>

            {error ? (
              <View className="mt-5 flex-row items-start gap-2 rounded-2xl border border-coral-200 bg-coral-50 px-3.5 py-3">
                <Ionicons
                  name="alert-circle-outline"
                  size={18}
                  color={colors.primaryDeep}
                />
                <Text className="flex-1 text-[12.5px] font-medium leading-[18px] text-coral-700">
                  {error}
                </Text>
              </View>
            ) : null}

            <View className="mt-5">
              <Text className="mb-2 text-[12px] font-semibold uppercase tracking-[0.8px] text-ink-500">
                Email
              </Text>
              <View
                className={`flex-row items-center gap-2.5 rounded-2xl border bg-coral-50 px-4 ${
                  focused === "email" ? "border-coral-400" : "border-coral-100"
                }`}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={focused === "email" ? colors.primary : colors.textMuted}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.textSubtle}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  className="h-[52px] flex-1 text-[15px] text-ink"
                />
              </View>
            </View>

            <View className="mt-4">
              <Text className="mb-2 text-[12px] font-semibold uppercase tracking-[0.8px] text-ink-500">
                Password
              </Text>
              <View
                className={`flex-row items-center gap-2.5 rounded-2xl border bg-coral-50 px-4 ${
                  focused === "password" ? "border-coral-400" : "border-coral-100"
                }`}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={
                    focused === "password" ? colors.primary : colors.textMuted
                  }
                />
                <TextInput
                  ref={passwordRef}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textSubtle}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  textContentType="password"
                  returnKeyType="go"
                  onSubmitEditing={handleSubmit}
                  className="h-[52px] flex-1 text-[15px] text-ink"
                />
                <Pressable
                  hitSlop={10}
                  onPress={() => setShowPassword((prev) => !prev)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={colors.textMuted}
                  />
                </Pressable>
              </View>
            </View>

            <Pressable
              onPress={handleSubmit}
              disabled={!canSubmit || submitting}
              className={`mt-6 flex-row items-center justify-center gap-2 rounded-2xl py-[16px] ${
                canSubmit ? "bg-coral-400" : "bg-coral-200"
              }`}>
              {submitting ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <>
                  <Text className="text-[15px] font-bold text-white">
                    Sign In
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color={colors.white} />
                </>
              )}
            </Pressable>

            <Text className="mt-4 text-center text-[12px] text-ink-500">
              Your role and dashboard are detected automatically.
            </Text>
          </View>

          <View className="mt-auto items-center pt-8">
            <Text className="text-[12.5px] text-ink-500">
              By continuing you agree to our
            </Text>
            <View className="mt-1 flex-row items-center gap-1.5">
              <Pressable onPress={() => router.push("/legal/terms")}>
                <Text className="text-[12.5px] font-semibold text-coral-600">
                  Terms
                </Text>
              </Pressable>
              <Text className="text-[12.5px] text-ink-400">and</Text>
              <Pressable onPress={() => router.push("/legal/privacy")}>
                <Text className="text-[12.5px] font-semibold text-coral-600">
                  Privacy Policy
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
