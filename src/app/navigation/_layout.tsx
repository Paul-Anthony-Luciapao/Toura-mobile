import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

const tabs = [
  {name: "index", title: "Home", icon: "home-outline"},
  {name: "tourist-spots", title: "Tourist Spots", icon: "location-outline"},
  {name: "itineraries", title: "Itineraries", icon: "navigate-outline"},
  {name: "traveler", title: "Traveler", icon: "person-outline"}
] as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#008C95",
        tabBarInactiveTintColor: "#999",
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} color={color} size={size}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
