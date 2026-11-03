import ChatAvatar from "@/components/chat/ChatAvatar";
import type { Conversation } from "@/data/types";
import { formatRelativeTime } from "@/lib/formatters";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = Readonly<{
  conversation: Conversation;
  onPress: () => void;
}>;

export default function ConversationRow({ conversation, onPress }: Props) {
  const { otherParty, resort, lastMessage, unreadCount } = conversation;
  const hasUnread = unreadCount > 0;

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 rounded-[18px] border bg-white p-3.5 ${
        hasUnread ? "border-coral-200" : "border-coral-100"
      }`}>
      <ChatAvatar name={otherParty?.name} uri={otherParty?.avatar} size={52} />

      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className="flex-1 pr-2 text-[15px] font-bold text-ink"
            numberOfLines={1}>
            {otherParty?.name ?? "Toura"}
          </Text>
          <Text className="text-[11px] text-ink-400">
            {formatRelativeTime(
              lastMessage?.createdAt ?? conversation.lastMessageAt,
            )}
          </Text>
        </View>

        {resort ? (
          <View className="mt-0.5 flex-row items-center gap-1">
            <Ionicons
              name="location-outline"
              size={11}
              color={colors.primary}
            />
            <Text className="text-[11px] font-medium text-coral-600" numberOfLines={1}>
              {resort.name}
            </Text>
          </View>
        ) : null}

        <View className="mt-1 flex-row items-center justify-between">
          <Text
            className={`flex-1 pr-2 text-[12.5px] ${
              hasUnread ? "font-semibold text-ink" : "text-ink-500"
            }`}
            numberOfLines={1}>
            {lastMessage ? lastMessage.body : "No messages yet"}
          </Text>

          {hasUnread ? (
            <View className="min-w-[20px] items-center justify-center rounded-full bg-coral-400 px-1.5 py-0.5">
              <Text className="text-[10.5px] font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
