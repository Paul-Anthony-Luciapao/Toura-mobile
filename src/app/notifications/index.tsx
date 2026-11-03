import NotificationCard from "@/components/notifications/NotificationCard";
import { INITIAL_NOTIFICATIONS } from "@/data/mockData";
import type { Notification } from "@/data/types";
import { groupBySection, unreadCount } from "@/lib/notifications";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Filter = "all" | "unread";

/**
 * Sections are flattened into the row stream so the feed stays virtualised —
 * the repo already relies on FlatList + className support.
 */
type Row =
  | { type: "section"; id: string; label: string }
  | { type: "notification"; id: string; notification: Notification };

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
];

function EmptyState({ filter }: Readonly<{ filter: Filter }>) {
  return (
    <View className="items-center gap-2 px-8 pt-20">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-surfaceSoft">
        <Ionicons
          name="notifications-off-outline"
          size={28}
          color={colors.textMuted}
        />
      </View>
      <Text className="font-poppins-semibold text-[16px] text-textMain">
        {filter === "unread"
          ? "No unread notifications"
          : "No notifications yet"}
      </Text>
      <Text className="text-center font-poppins text-[13px] text-textMuted">
        {filter === "unread"
          ? "You are all caught up — check back after your next booking."
          : "Booking confirmations, trip reminders and offers will show up here."}
      </Text>
    </View>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<Filter>("all");

  const unread = unreadCount(items);

  const rows = useMemo<Row[]>(() => {
    const visible = items
      .filter((item) => (filter === "unread" ? !item.read : true))
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    return groupBySection(visible).flatMap<Row>((section) => [
      {
        type: "section",
        id: `section-${section.title}`,
        label: section.title,
      },
      ...section.data.map<Row>((notification) => ({
        type: "notification",
        id: notification.id,
        notification,
      })),
    ]);
  }, [items, filter]);

  const markRead = (notification: Notification) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item
      )
    );

  const markAllRead = () =>
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Top Header */}
      <View className="flex-row items-center gap-3 border-b border-border px-4 py-4">
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="h-11 w-11 items-center justify-center rounded-full active:opacity-70">
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <View className="flex-1">
          <Text className="font-poppins-bold text-[18px] text-textMain">
            Notifications
          </Text>
          <Text className="font-poppins text-[12px] text-textMuted">
            {unread > 0 ? `${unread} unread` : "All caught up"}
          </Text>
        </View>

        {unread > 0 ? (
          <Pressable onPress={markAllRead} hitSlop={8} className="active:opacity-70">
            <Text className="font-poppins-bold text-[13px] text-primary">
              Mark all read
            </Text>
          </Pressable>
        ) : null}
      </View>

      {/* Filter chips */}
      <View className="flex-row gap-2 px-4 pt-4">
        {FILTERS.map(({ key, label }) => {
          const isActive = filter === key;
          return (
            <Pressable
              key={key}
              onPress={() => setFilter(key)}
              className={`rounded-full px-4 py-2 active:opacity-80 ${
                isActive ? "bg-primary" : "bg-surfaceSoft"
              }`}>
              <Text
                className={`font-poppins-medium text-[13px] ${
                  isActive ? "text-white" : "text-textSoft"
                }`}>
                {key === "unread" && unread > 0
                  ? `${label} (${unread})`
                  : label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={rows}
        keyExtractor={(row) => row.id}
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-3"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState filter={filter} />}
        renderItem={({ item }) =>
          item.type === "section" ? (
            <Text className="mb-2 mt-3 font-poppins-semibold text-[12px] uppercase tracking-[0.8px] text-textMuted">
              {item.label}
            </Text>
          ) : (
            <NotificationCard
              notification={item.notification}
              onPress={markRead}
            />
          )
        }
      />
    </SafeAreaView>
  );
}
