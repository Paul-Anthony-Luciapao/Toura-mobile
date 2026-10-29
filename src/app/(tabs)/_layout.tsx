import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3BA29A",
        tabBarInactiveTintColor: "#1F2937",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins_400Regular",
          fontSize: 11,
          marginTop: -4,
        },
        animation: "none",

        // Keep previously visited screens from re-rendering when switching tabs.
        freezeOnBlur: true,

        // Mount each tab only when it is first accessed.
        lazy: true,
      }}
    >
      {/* Main entry point for browsing the application's home screen. */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={typeof color === "string" ? color : "#1F2937"}
            />
          ),
        }}
      />

      {/* Provides access to the user's saved or planned itineraries. */}
      <Tabs.Screen
        name="itinerary"
        options={{
          title: "Itineraries",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="clipboard-outline"
              size={24}
              color={typeof color === "string" ? color : "#1F2937"}
            />
          ),
        }}
      />

      {/* Opens the messaging area for user conversations. */}
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={typeof color === "string" ? color : "#1F2937"}
            />
          ),
        }}
      />

      {/* Provides access to the user's profile and account information. */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={typeof color === "string" ? color : "#1F2937"}
            />
          ),
        }}
      />

      {/* Groups additional navigation options outside the primary tabs. */}
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={typeof color === "string" ? color : "#1F2937"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
