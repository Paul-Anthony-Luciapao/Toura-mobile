import { Ionicons } from "@expo/vector-icons";

export type TabItem = {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  focusedIcon: keyof typeof Ionicons.glyphMap;
};

export const tabs: TabItem[] = [
  {
    name: "index",
    title: "Home",
    icon: "home-outline",
    focusedIcon: "home",
  },
  {
    name: "itinerary",
    title: "Itinerary",
    icon: "calendar-outline",
    focusedIcon: "calendar",
  },
  {
    name: "messages",
    title: "Messages",
    icon: "chatbubble-outline",
    focusedIcon: "chatbubble",
  },
  {
    name: "profile",
    title: "Profile",
    icon: "person-outline",
    focusedIcon: "person",
  },
  {
    name: "more",
    title: "More",
    icon: "ellipsis-horizontal-outline",
    focusedIcon: "ellipsis-horizontal",
  },
];

