import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { colors } from "@/styles/global";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CUSTOM_TAB_BAR_HEIGHT = 60;

export function getCustomTabBarContentPadding(bottomInset: number): number {
  return Math.max(bottomInset, 12) + CUSTOM_TAB_BAR_HEIGHT + 12;
}

// Custom types
type TabRoute = {
  key: string;
  name: string;
  params?: object;
};

type TabState = {
  index: number;
  routes: TabRoute[];
};

type TabOptions = {
  title?: string;
  tabBarAccessibilityLabel?: string;
  tabBarButtonTestID?: string;
};

type CustomTabBarProps = {
  state: TabState;
  descriptors: Record<
    string,
    {
      options: TabOptions;
    }
  >;
  navigateToTab: (routeKey: string) => void;
};

// Tab icons
const TAB_ICONS = {
  index: {
    icon: "home-outline",
    activeIcon: "home",
  },
  itinerary: {
    icon: "clipboard-outline",
    activeIcon: "clipboard",
  },
  messages: {
    icon: "chatbubble-outline",
    activeIcon: "chatbubble",
  },
  profile: {
    icon: "person-outline",
    activeIcon: "person",
  },
} as const;

// Custom navigation bar
export default function CustomTabBar({
  state,
  descriptors,
  navigateToTab,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets();

  const tabBarHeight = CUSTOM_TAB_BAR_HEIGHT;
  const tabBarBottom = Math.max(insets.bottom, 12);

  return (
    <View
      className="absolute left-4 right-4 flex-row items-center justify-around rounded-[30px] border-t"
      style={{
        bottom: tabBarBottom,
        height: tabBarHeight,
        backgroundColor: colors.surface,
        borderTopColor: colors.accentBadge,
        borderTopWidth: 1,

        elevation: 8,

        shadowColor: colors.text,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      }}
    >
      {/* Tabs */}
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const options = descriptors[route.key]?.options;
        const label = options?.title ?? route.name;

        const tabConfig = TAB_ICONS[route.name as keyof typeof TAB_ICONS];

        if (!tabConfig) return null;

        const color = focused ? colors.primary : colors.textSecondary;

        const onPress = () => {
          if (!focused) {
            navigateToTab(route.key);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={options?.tabBarAccessibilityLabel ?? label}
            testID={options?.tabBarButtonTestID}
            onPress={onPress}
            android_ripple={{
              color: "transparent",
            }}
            className="h-[60px] flex-1 items-center justify-center"
          >
            <Ionicons
              name={focused ? tabConfig.activeIcon : tabConfig.icon}
              size={22}
              color={color}
            />
            <Text
              numberOfLines={1}
              className="mt-1 max-w-full font-poppins-medium text-[10px]"
              style={{ color }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
