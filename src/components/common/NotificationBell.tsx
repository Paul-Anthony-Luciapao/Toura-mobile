import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const ICON_COLOR = {
  light: "#ffffff",
  dark: "#0f172a",
} as const;

type Props = Readonly<{
  variant?: keyof typeof ICON_COLOR;
  unreadCount?: number;
  onPress?: () => void;
  containerClassName?: string;
}>;

export default function NotificationBell({
  variant = "dark",
  unreadCount = 0,
  onPress,
  containerClassName = "",
}: Props) {
  const showBadge = unreadCount > 0;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={
        showBadge
          ? `Notifications, ${unreadCount} unread`
          : "Notifications"
      }
      className={`h-12 w-12 items-center justify-center rounded-full active:opacity-70 ${containerClassName}`}
    >
      <Ionicons
        name="notifications-outline"
        size={25}
        color={ICON_COLOR[variant]}
        style={{
          transform: [{ translateY: 8 }],
        }}
      />

      {showBadge ? (
        <View className="absolute right-1.5 top-1.5 h-4 min-w-4 items-center justify-center rounded-full bg-warning px-1">
          <Text className="text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}
