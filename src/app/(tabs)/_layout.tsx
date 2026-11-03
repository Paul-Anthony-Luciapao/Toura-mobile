import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_SCREENS = [
  {
    name: "index",
    title: "Home",
    icon: "home-outline",
  },
  {
    name: "itinerary",
    title: "Itineraries",
    icon: "clipboard-outline",
  },
  {
    name: "messages",
    title: "Messages",
    icon: "chatbubble-outline",
  },
  {
    name: "profile",
    title: "Profile",
    icon: "person-outline",
  },
  {
    name: "more",
    title: "More",
    icon: "ellipsis-horizontal",
  },
] as const;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFA69B",
        tabBarInactiveTintColor: "#1F2937",
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, 16),
          left: 20,
          right: 20,
          height: 55,
          borderRadius: 28,
          marginHorizontal: 10,
          overflow: "hidden",
          elevation: 8,
        },

        tabBarLabelStyle: {
          fontFamily: "Poppins_400Regular",
          fontSize: 11,
          marginTop: -4,
        },

        animation: "none",
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
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={tab.icon}
                size={size}
                color={typeof color === "string" ? color : "#1F2937"}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
