import AnimatedSplash from "@/components/common/AnimatedSplash";
import { AuthProvider, useAuth } from "@/context/auth";
import "@/lib/nativewind-setup";
import { colors } from "@/styles/global";
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
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

export default function RootLayout() {
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
    <AuthProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { token, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {isLoading ? (
        <View className="flex-1 items-center justify-center bg-cream">
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!!token}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen
              name="resort/[id]"
              options={{
                headerShown: true,
                title: "Resort",
              }}
            />

            <Stack.Screen name="chat/[id]" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={!token}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      )}

      {showSplash && (
        <AnimatedSplash
          backgroundImage={require("../../assets/images/Flash-screen-image.png")}
          onFinish={() => {
            setShowSplash(false);
          }}
        />
      )}
    </>
  );
}
