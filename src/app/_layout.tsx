import AnimatedSplash from "@/components/common/AnimatedSplash";
import "@/lib/nativewind-setup";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import "../global.css";
import "../lib/icons";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="resort/[id]"
          options={{
            headerShown: true,
            title: "Resort",
          }}
        />

        <Stack.Screen
          name="itinerary-packages/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="itinerary-packages/[id]"
          options={{
            headerShown: false,
            title: "Itinerary Package",
          }}
        />
      </Stack>



      {showSplash && (
        <AnimatedSplash
          backgroundImage={require("../../assets/images/Flash-screen-image.png")}
          onFinish={() => {
            setShowSplash(false);
          }}
        />
      )}
    </SafeAreaProvider>
  );
}
