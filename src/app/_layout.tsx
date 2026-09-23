import AnimatedSplash from "@/components/common/AnimatedSplash";
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
          name="navigation"
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
