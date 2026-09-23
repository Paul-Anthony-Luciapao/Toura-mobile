import AnimatedSplash from "@/components/common/AnimatedSplash";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [frontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
  });

  useEffect(() => {
    if (frontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [frontsLoaded]);

  if (frontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="resort/[id]" options={{ headerShown: true }} />
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
