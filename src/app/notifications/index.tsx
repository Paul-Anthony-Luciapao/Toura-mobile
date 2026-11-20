import { safeBack } from "@/lib/navigation";
import NotificationCard from "@/components/notifications/NotificationCard";
import { useAuth } from "@/context/AuthContext";
import type { Notification } from "@/data/types";
import { groupBySection, unreadCount } from "@/lib/notifications";
import { getErrorMessage } from "@/services/api";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/services/notifications";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
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
          : "Booking, payment, trip, and message updates will show up here."}
      </Text>
    </View>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await fetchNotifications());
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }
      void loadNotifications();
    }, [loadNotifications, user]),
  );

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

  const markRead = async (notification: Notification) => {
    if (notification.read) return;
    setItems((current) => current.map((item) =>
      item.id === notification.id ? { ...item, read: true } : item,
    ));
    try {
      await markNotificationRead(notification.id);
    } catch {
      setItems((current) => current.map((item) =>
        item.id === notification.id ? { ...item, read: false } : item,
      ));
    }
  };

  const markAllRead = async () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
    try {
      await markAllNotificationsRead();
    } catch {
      void loadNotifications();
    }
  };

  const openNotification = (notification: Notification) => {
    void markRead(notification);
    if (notification.href) router.push(notification.href);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Top Header */}
      <View className="flex-row items-center gap-3 border-b border-border px-4 py-4">
        <Pressable
          onPress={() => safeBack()}
          hitSlop={8}
          className="h-11 w-11 items-center justify-center rounded-full active:opacity-70">
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <View className="flex-1">
          <Text className="font-poppins-bold text-[18px] text-textMain">
            Notifications
          </Text>
          <Text className="font-poppins text-[12px] text-textMuted">
            {loading ? "Loading notifications" : unread > 0 ? `${unread} unread` : "All caught up"}
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
        refreshing={loading}
        onRefresh={() => void loadNotifications()}
        keyExtractor={(row) => row.id}
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-3"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <View className="items-center pt-20"><ActivityIndicator color={colors.primary} /></View>
          ) : error ? (
            <View className="items-center gap-3 px-8 pt-20">
              <Text className="text-center font-poppins text-[13px] text-textMuted">{error}</Text>
              <Pressable onPress={() => void loadNotifications()} className="rounded-full bg-primary px-5 py-2">
                <Text className="font-poppins-semibold text-white">Try again</Text>
              </Pressable>
            </View>
          ) : <EmptyState filter={filter} />
        }
        renderItem={({ item }) =>
          item.type === "section" ? (
            <Text className="mb-2 mt-3 font-poppins-semibold text-[12px] uppercase tracking-[0.8px] text-textMuted">
              {item.label}
            </Text>
          ) : (
            <NotificationCard
              notification={item.notification}
              onPress={openNotification}
            />
          )
        }
      />
    </SafeAreaView>
  );
}
