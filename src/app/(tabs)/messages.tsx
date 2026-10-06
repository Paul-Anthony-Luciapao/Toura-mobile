import ConversationRow from "@/components/chat/ConversationRow";
import { useAuth } from "@/context/auth";
import type { Conversation } from "@/data/types";
import { describeApiError } from "@/services/toura";
import { fetchConversations } from "@/services/chat";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const POLL_MS = 5000;

export default function Messages() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeRef = useRef(true);

  const isAdmin = user?.role === "admin";

  const load = useCallback(async (silent = false) => {
    if (!silent) setError(null);
    try {
      const data = await fetchConversations();
      if (activeRef.current) setConversations(data);
    } catch (e) {
      if (activeRef.current && !silent) setError(describeApiError(e));
    } finally {
      if (activeRef.current) setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (isAdmin) {
        setLoading(false);
        return;
      }

      activeRef.current = true;
      load();

      const timer = setInterval(() => load(true), POLL_MS);

      return () => {
        activeRef.current = false;
        clearInterval(timer);
      };
    }, [isAdmin, load]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top + 16 }}>
      <View className="px-5">
        <Text className="text-[22px] font-bold text-ink">Messages</Text>
        <Text className="mt-0.5 text-[13px] text-ink-500">
          {isAdmin
            ? "Private threads between travelers and owners"
            : "Chat with travelers and resort owners"}
        </Text>
      </View>

      {isAdmin ? (
        <View className="mx-5 mt-6 flex-row items-start gap-2 rounded-2xl border border-coral-100 bg-coral-50 p-4">
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={colors.primary}
          />
          <Text className="flex-1 text-[13px] leading-5 text-ink-600">
            Chat is private to its two participants, so admin accounts don&apos;t
            have conversations here.
          </Text>
        </View>
      ) : loading ? (
        <View className="mt-24 items-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : error ? (
        <View className="mt-24 items-center px-8">
          <Text className="text-center text-[14px] font-semibold text-ink">
            {error}
          </Text>
          <Pressable
            onPress={() => {
              setLoading(true);
              load();
            }}
            className="mt-4 rounded-full bg-coral-400 px-5 py-2.5">
            <Text className="text-[13px] font-semibold text-white">
              Try again
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-5 py-5 gap-3"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <ConversationRow
              conversation={item}
              onPress={() =>
                router.push({ pathname: "/chat/[id]", params: { id: item.id } })
              }
            />
          )}
          ListEmptyComponent={
            <View className="mt-24 items-center px-8">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-coral-50">
                <Ionicons
                  name="chatbubbles-outline"
                  size={30}
                  color={colors.primary}
                />
              </View>
              <Text className="mt-4 text-[15px] font-bold text-ink">
                No conversations yet
              </Text>
              <Text className="mt-1.5 text-center text-[13px] leading-5 text-ink-500">
                {user?.role === "owner"
                  ? "When a traveler messages one of your resorts, the thread shows up here."
                  : "Open a resort and tap “Message owner” to start chatting."}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
