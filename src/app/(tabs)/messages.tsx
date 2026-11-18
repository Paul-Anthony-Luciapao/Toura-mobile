import ConversationRow from "@/components/chat/ConversationRow";
import { getCustomTabBarContentPadding } from "@/components/CustomTabBar";
import { useAuth } from "@/context/AuthContext";
import type { Conversation } from "@/data/types";
import { fetchConversations } from "@/services/chat";
import { describeApiError } from "@/services/toura";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const REFRESH_INTERVAL_MS = 15000;

export default function Messages() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadConversations = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const result = await fetchConversations();
      setConversations(result);
      setError(null);
    } catch (requestError) {
      setError(describeApiError(requestError));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        setConversations([]);
        setLoading(false);
        setError(null);
        return;
      }

      void loadConversations();
      const timer = setInterval(
        () => void loadConversations(true),
        REFRESH_INTERVAL_MS,
      );
      return () => clearInterval(timer);
    }, [loadConversations, user]),
  );

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return conversations;

    return conversations.filter((conversation) =>
      [
        conversation.otherParty?.name,
        conversation.resort?.name,
        conversation.resort?.municipality,
        conversation.lastMessage?.body,
      ]
        .filter(Boolean)
        .some((value) => value!.toLocaleLowerCase().includes(query)),
    );
  }, [conversations, search]);

  const bottomPadding = getCustomTabBarContentPadding(insets.bottom);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <LinearGradient
        pointerEvents="none"
        colors={["rgba(59, 162, 154, 0.15)", "rgba(255, 255, 255, 0)"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120 }}
      />

      <View className="z-10 mt-4 px-5">
        <View className="flex-row items-center rounded-full border border-slate-200 bg-white px-4 py-.5 shadow-md">
          <Ionicons name="search" size={20} color={colors.text} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search conversations"
            accessibilityLabel="Search conversations"
            className="ml-3 flex-1 font-poppins text-[15px] text-textMain"
            placeholderTextColor={colors.textSubtle}
            returnKeyType="search"
          />
          {search.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              onPress={() => setSearch("")}
              hitSlop={10}
            >
              <Ionicons
                name="close-circle"
                size={19}
                color={colors.textSubtle}
              />
            </Pressable>
          ) : null}
        </View>
      </View>

      <View className="mt-6 mb-3 flex-row items-center justify-between px-5">
        <View>
          <Text className="font-poppins-semibold text-lg text-textMain">
            Messages
          </Text>
          {!loading && conversations.length > 0 ? (
            <Text className="mt-0.5 font-poppins text-xs text-textMuted">
              {conversations.length}{" "}
              {conversations.length === 1 ? "conversation" : "conversations"}
            </Text>
          ) : null}
        </View>
        {conversations.some((conversation) => conversation.unreadCount > 0) ? (
          <Text className="font-poppins-medium text-xs text-primary">
            {conversations.reduce((total, item) => total + item.unreadCount, 0)}{" "}
            unread
          </Text>
        ) : null}
      </View>

      {!user ? (
        <View className="flex-1 items-center justify-center px-8 pb-20">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-coral-50">
            <Ionicons
              name="chatbubbles-outline"
              size={30}
              color={colors.primary}
            />
          </View>
          <Text className="mt-4 text-center font-poppins-semibold text-base text-textMain">
            Sign in to view your messages
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/login")}
            className="mt-4 rounded-xl bg-primary px-5 py-3"
          >
            <Text className="font-poppins-semibold text-sm text-white">
              Log in
            </Text>
          </Pressable>
        </View>
      ) : loading ? (
        <View className="flex-1 items-center justify-center pb-20">
          <ActivityIndicator color={colors.primary} />
          <Text className="mt-3 font-poppins text-sm text-textMuted">
            Loading conversations…
          </Text>
        </View>
      ) : error && conversations.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8 pb-20">
          <Ionicons
            name="cloud-offline-outline"
            size={34}
            color={colors.textSubtle}
          />
          <Text className="mt-3 text-center font-poppins text-sm leading-5 text-textMuted">
            {error}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void loadConversations()}
            className="mt-4 rounded-xl bg-primary px-5 py-3"
          >
            <Text className="font-poppins-semibold text-sm text-white">
              Try again
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: bottomPadding,
            flexGrow: 1,
          }}
          ItemSeparatorComponent={() => <View className="h-2.5" />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => void loadConversations(true)}
              tintColor={colors.primary}
            />
          }
          renderItem={({ item }) => (
            <ConversationRow
              conversation={item}
              onPress={() => router.push(`/chat/${item.id}`)}
            />
          )}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center px-8 pb-16">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-coral-50">
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={29}
                  color={colors.primary}
                />
              </View>
              <Text className="mt-4 text-center font-poppins-semibold text-base text-textMain">
                {search.trim()
                  ? "No matching conversations"
                  : "No messages yet"}
              </Text>
              <Text className="mt-1 text-center font-poppins text-sm leading-5 text-textMuted">
                {search.trim()
                  ? "Try searching for a different name, resort, or message."
                  : "When you contact a resort or receive a message, your conversation will appear here."}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
