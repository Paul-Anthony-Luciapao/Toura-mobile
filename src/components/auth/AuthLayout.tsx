import { LEGAL_FOOTER } from "@/data/legalContent";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = Readonly<{
  title: string;
  showBack?: boolean;
  children: ReactNode;
}>;

export default function AuthLayout({
  title,
  showBack = false,
  children,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#f8fafc]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow">
        <View
          className="flex-1 px-8"
          style={{
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 16,
          }}>
          <View className="h-10">
            {showBack ? (
              <Pressable
                onPress={() => router.back()}
                hitSlop={12}
                className="h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white">
                <Ionicons
                  name="chevron-back"
                  size={20}
                  className="text-[#0f172a]"
                />
              </Pressable>
            ) : null}
          </View>

          <Text className="mt-6 text-center font-['Poppins_500Medium'] text-[28px] text-[#0f172a]">
            {title}
          </Text>

          {children}

          <Text className="mt-auto pt-10 text-center font-['Poppins_400Regular'] text-[10px] text-[#0f172a]">
            {LEGAL_FOOTER}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
