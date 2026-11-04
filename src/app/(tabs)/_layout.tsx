import { colors } from "@/styles/global";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CustomTabBar from "@/components/CustomTabBar";

const TAB_SCREENS = [
  { name: "index", title: "Home" },
  { name: "itinerary", title: "Itineraries" },
  { name: "messages", title: "Messages" },
  { name: "profile", title: "Profile" },
  { name: "more", title: "More" },
] as const;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const tabBarHeight = 60;
  const tabBarBottom = Math.max(insets.bottom, 12);

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,

        sceneStyle: {
          paddingBottom: tabBarBottom + tabBarHeight,
          backgroundColor: colors.white,
        },

        animation: "fade",
        freezeOnBlur: true,
        lazy: true,
      }}
    >
      {TAB_SCREENS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
          }}
        />
      ))}
    </Tabs>
  );
}
