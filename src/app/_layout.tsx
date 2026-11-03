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

// Keep the native splash screen visible until the required fonts are loaded.
SplashScreen.preventAutoHideAsync();

// Identifies booking screens that require an authenticated user.
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

  // Determine whether the current route belongs to authentication screens.
  const isAuthRoute = segments[0] === "(auth)";

  // Check both the itinerary package route and its current booking step.
  const isBookingRoute =
    segments[0] === "itinerary-packages" &&
    BOOKING_STEPS.has(segments[2] ?? "");

  // Wait for authentication to finish before deciding whether a redirect is needed.
  const shouldRedirect =
    !loading &&
    ((user !== null && isAuthRoute) || (user === null && isBookingRoute));

  useEffect(() => {
    if (!shouldRedirect) return;

    // Send authenticated users to the main tabs and unauthenticated users to login.
    router.replace(user ? "/(tabs)" : "/login");
  }, [router, shouldRedirect, user]);

  // Prevent interaction with protected screens while authentication or redirection is in progress.
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
  // Load the font weights used throughout the application before rendering the navigator.
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide the native splash screen only after the custom fonts are ready.
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Avoid rendering the application before its required fonts are available.
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
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="hotels" />
            <Stack.Screen name="esim" />
            <Stack.Screen
              name="resort/[id]"
              options={{ headerShown: true, title: "Resort" }}
            />
            <Stack.Screen name="itinerary-packages/index" />
          </Stack>

          {/* Enforce route access based on the current authentication state. */}
          <AuthRouteGuard />

          {/* Keep the custom splash screen visible until its animation finishes. */}
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
