import { TabItem, tabs } from "@/constants/data";
import { useAuth } from "@/context/AuthContext";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { memo } from "react";
import { ColorValue } from "react-native";

const TabIcon = memo(
  ({
    focused,
    color,
    tab,
  }: {
    focused: boolean;
    color: ColorValue | string;
    tab: TabItem;
  }) => (
    <Ionicons
      name={focused ? tab.focusedIcon : tab.icon}
      size={22}
      color={color as string}
    />
  ),
);

TabIcon.displayName = "TabIcon";

export default function TabLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        animation: "none",
        freezeOnBlur: true,
        lazy: true,
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon tab={tab} color={color} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
