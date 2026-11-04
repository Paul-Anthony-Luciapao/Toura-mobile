import { Tabs } from "expo-router";
import React from "react";

import CustomTabBar from "@/components/CustomTabBar";

const TAB_SCREENS = [
  { name: "index", title: "Home" },
  { name: "itinerary", title: "Itineraries" },
  { name: "messages", title: "Messages" },
  { name: "profile", title: "Profile" },
  { name: "more", title: "More" },
] as const;

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
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
