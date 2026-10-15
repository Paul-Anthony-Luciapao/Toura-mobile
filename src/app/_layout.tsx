import AnimatedSplash from "@/components/common/AnimatedSplash";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/lib/nativewind-setup";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ActivityIndicator, View } from "react-native";
import "../../global.css";
import "../lib/icons";

SplashScreen.preventAutoHideAsync();

const BOOKING_STEPS = new Set([
  "availability",
  "verification",
  "guest",
  "review",
  "payment",
  "card-details",
  "otp",
  "success",
]);

function AuthRouteGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const isAuthRoute = segments[0] === "(auth)";
  const isBookingRoute =
    segments[0] === "itinerary-packages" &&
    BOOKING_STEPS.has(segments[2] ?? "");

  const shouldRedirect =
    !loading &&
    ((user !== null && isAuthRoute) || (user === null && isBookingRoute));

  useEffect(() => {
    if (!shouldRedirect) return;

    router.replace(user ? "/(tabs)" : "/login");
  }, [router, shouldRedirect, user]);

  if (loading || shouldRedirect) {
    return (
      <View className="absolute inset-0 z-50 items-center justify-center bg-white">
        <ActivityIndicator color="#2A9D8F" />
      </View>
    );
  }

  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="hotels" />
            <Stack.Screen
              name="resort/[id]"
              options={{ headerShown: true, title: "Resort" }}
            />
            <Stack.Screen name="itinerary-packages/index" />
          </Stack>

          <AuthRouteGuard />

          {showSplash && (
            <AnimatedSplash
              backgroundImage={require("../../assets/images/Flash-screen-image.png")}
              onFinish={() => setShowSplash(false)}
            />
          )}
        </>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
