import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, Pressable, View } from "react-native";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

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
  more: {
    icon: "ellipsis-horizontal",
    activeIcon: "ellipsis-horizontal",
  },
} as const;

// Sliding indicator
function AnimatedIndicator({
  index,
  tabWidth,
}: {
  index: number;
  tabWidth: number;
}) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(index * tabWidth, {
      damping: 18,
      stiffness: 140,
      mass: 0.8,
    });
  }, [index, tabWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute top-[10px] h-10 w-[46px] rounded-full"
      style={[
        {
          left: (tabWidth - 46) / 2,
          backgroundColor: colors.accentBadge,
        },
        animatedStyle,
      ]}
    />
  );
}

// Animated icon
function AnimatedTabIcon({
  focused,
  color,
  icon,
  activeIcon,
}: {
  focused: boolean;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.12 : 1, {
      damping: 10,
      stiffness: 180,
    });

    translateY.value = withSpring(focused ? -2 : 0);
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={focused ? activeIcon : icon} size={24} color={color} />
    </Animated.View>
  );
}

// Custom navigation bar
export default function CustomTabBar({
  state,
  descriptors,
  navigateToTab,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets();

  const [containerWidth, setContainerWidth] = useState(0);

  const tabBarHeight = CUSTOM_TAB_BAR_HEIGHT;
  const tabBarBottom = Math.max(insets.bottom, 12);

  const tabWidth =
    containerWidth > 0 ? containerWidth / state.routes.length : 0;

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      onLayout={handleLayout}
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
      {/* Animated background */}
      {tabWidth > 0 && (
        <AnimatedIndicator index={state.index} tabWidth={tabWidth} />
      )}

      {/* Tabs */}
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const options = descriptors[route.key]?.options;

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
            accessibilityLabel={options?.tabBarAccessibilityLabel}
            testID={options?.tabBarButtonTestID}
            onPress={onPress}
            android_ripple={{
              color: "transparent",
            }}
            className="h-[60px] flex-1 items-center justify-center"
          >
            <AnimatedTabIcon
              focused={focused}
              color={color}
              icon={tabConfig.icon}
              activeIcon={tabConfig.activeIcon}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
