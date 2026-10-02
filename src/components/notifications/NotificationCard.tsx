import type { Notification, NotificationKind } from "@/data/types";
import { relativeTime } from "@/lib/notifications";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

// Class names are spelled out in full so NativeWind's scanner keeps them.
const KIND_STYLES: Record<
  NotificationKind,
  {
    icon: keyof typeof Ionicons.glyphMap;
    iconBackground: string;
    iconColor: string;
  }
> = {
  booking: {
    icon: "calendar-outline",
    iconBackground: "bg-surfaceSoft",
    iconColor: colors.primary,
  },
  trip: {
    icon: "airplane-outline",
    iconBackground: "bg-surfaceSoft",
    iconColor: colors.primaryDark,
  },
  offer: {
    icon: "pricetags-outline",
    iconBackground: "bg-warning-soft",
    iconColor: colors.warning,
  },
  message: {
    icon: "chatbubble-ellipses-outline",
    iconBackground: "bg-surfaceMuted",
    iconColor: colors.accent,
  },
  payment: {
    icon: "card-outline",
    iconBackground: "bg-surfaceMuted",
    iconColor: colors.primaryDark,
  },
  system: {
    icon: "information-circle-outline",
    iconBackground: "bg-surfaceMuted",
    iconColor: colors.textMuted,
  },
};

type Props = Readonly<{
  notification: Notification;
  onPress?: (notification: Notification) => void;
}>;

export default function NotificationCard({ notification, onPress }: Props) {
  const { icon, iconBackground, iconColor } = KIND_STYLES[notification.kind];
  const isUnread = !notification.read;

  return (
    <Pressable
      onPress={() => onPress?.(notification)}
      className={`mb-3 flex-row gap-3 rounded-2xl border border-border p-3.5 active:opacity-80 ${
        isUnread ? "bg-surfaceSoft/70" : "bg-surface"
      }`}>
      <View
        className={`h-11 w-11 items-center justify-center rounded-full ${iconBackground}`}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>

      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Text
            numberOfLines={1}
            className={`flex-1 text-[14px] text-textMain ${
              isUnread ? "font-poppins-semibold" : "font-poppins-medium"
            }`}>
            {notification.title}
          </Text>

          {isUnread ? (
            <View className="h-2 w-2 rounded-full bg-primary" />
          ) : null}

          <Text className="font-poppins text-[11px] text-textMuted">
            {relativeTime(notification.createdAt)}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          className="font-poppins text-[12px] leading-[18px] text-textMuted">
          {notification.body}
        </Text>
      </View>
    </Pressable>
  );
}
