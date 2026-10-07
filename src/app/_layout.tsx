import AnimatedSplash from "@/components/common/AnimatedSplash";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/lib/nativewind-setup";
import { colors } from "@/styles/global";
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

function AppNavigator() {
  const { user, loading } = useAuth();
  const segments = useSegments();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-cream">
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const inAuthGroup = segments[0] === "(auth)";

  if (!user && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  if (user && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="resort/[id]"
        options={{
          headerShown: true,
          title: "Resort",
        }}
      />
    </Stack>
  );
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
        <AppNavigator />
      </AuthProvider>

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
