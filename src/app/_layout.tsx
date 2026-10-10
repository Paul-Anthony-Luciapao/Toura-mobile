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
import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../../global.css";
import "../lib/icons";

SplashScreen.preventAutoHideAsync();

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

        {showSplash && (
          <AnimatedSplash
            backgroundImage={require("../../assets/images/Flash-screen-image.png")}
            onFinish={() => setShowSplash(false)}
          />
        )}
      </AuthProvider>
    </SafeAreaProvider>
  );
}
