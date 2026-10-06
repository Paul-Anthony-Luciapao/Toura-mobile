import ChatAvatar from "@/components/chat/ChatAvatar";
import MessageBubble from "@/components/chat/MessageBubble";
import { useAuth } from "@/context/auth";
import type { ChatMessage, Conversation } from "@/data/types";
import { formatDayLabel } from "@/lib/formatters";
import { randomUUID } from "@/lib/uuid";
import {
  fetchConversation,
  fetchMessages,
  markConversationRead,
  sendChatMessage,
} from "@/services/chat";
import { describeApiError } from "@/services/toura";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const POLL_MS = 3000;

type UiMessage = ChatMessage & { pending?: boolean; failed?: boolean };

type ListItem =
  | { type: "day"; key: string; label: string }
  | { type: "msg"; key: string; message: UiMessage; isMine: boolean };

function buildItems(messages: UiMessage[], myId?: string): ListItem[] {
  const items: ListItem[] = [];
  let lastDay = "";

  for (const message of messages) {
    const day = message.createdAt
      ? new Date(message.createdAt).toDateString()
      : "";
    if (day && day !== lastDay) {
      lastDay = day;
      items.push({
        type: "day",
        key: `day-${message.id}`,
        label: formatDayLabel(message.createdAt),
      });
    }
    items.push({
      type: "msg",
      key: message.id,
      message,
      isMine:
        message.senderId != null &&
        myId != null &&
        String(message.senderId) === String(myId),
    });
  }

  return items;
}

export default function ChatThread() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<ListItem>>(null);
  const autoScrollRef = useRef(true);
  const cursorRef = useRef<string | undefined>(undefined);

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const markRead = useCallback(async () => {
    if (typeof id !== "string") return;
    try {
      await markConversationRead(id);
    } catch {
      // non-critical
    }
  }, [id]);

  const applyIncoming = useCallback((incoming: ChatMessage[]) => {
    if (incoming.length === 0) return;

    setMessages((prev) => {
      const known = new Set(prev.map((m) => m.id));
      const merged = [...prev];
      for (const message of incoming) {
        if (!known.has(message.id)) merged.push(message);
      }
      return merged.sort((a, b) => {
        const rankA = Number.isFinite(Number(a.id))
          ? Number(a.id)
          : Number.MAX_SAFE_INTEGER;
        const rankB = Number.isFinite(Number(b.id))
          ? Number(b.id)
          : Number.MAX_SAFE_INTEGER;
        return rankA - rankB;
      });
    });

    const hasIncoming = incoming.some(
      (m) => m.senderId != null && String(m.senderId) !== String(user?.id),
    );
    if (hasIncoming) void markRead();
  }, [markRead, user?.id]);

  const poll = useCallback(async () => {
    if (typeof id !== "string" || !cursorRef.current) return;
    try {
      let cursor = cursorRef.current;
      for (;;) {
        const page = await fetchMessages(id, cursor);
        cursor = page.nextCursor;
        cursorRef.current = cursor;
        applyIncoming(page.messages);
        if (!page.hasMore) break;
      }
    } catch {
      // keep polling silently on transient errors
    }
  }, [applyIncoming, id]);

  useEffect(() => {
    if (typeof id !== "string") return;
    let active = true;

    (async () => {
      try {
        setLoading(true);
        const [conversationData, page] = await Promise.all([
          fetchConversation(id),
          fetchMessages(id),
        ]);
        if (!active) return;
        setConversation(conversationData);
        cursorRef.current = page.nextCursor;
        setMessages(page.messages);
        void markRead();
      } catch (e) {
        if (active) setError(describeApiError(e));
      } finally {
        if (active) setLoading(false);
      }
    })();

    const timer = setInterval(() => void poll(), POLL_MS);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [id, markRead, poll]);

  const handleSend = async () => {
    const body = draft.trim();
    if (!body || sending || typeof id !== "string") return;

    const clientId = randomUUID();
    const optimistic: UiMessage = {
      id: `local-${clientId}`,
      conversationId: id,
      senderId: user?.id ?? null,
      senderName: user?.name ?? "",
      senderRole: user?.role ?? null,
      body,
      clientId,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setDraft("");
    setSending(true);
    setMessages((prev) => [...prev, optimistic]);
    autoScrollRef.current = true;

    try {
      const saved = await sendChatMessage(id, body, clientId);
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== saved.id)
          .map((m) => (m.clientId === clientId ? saved : m)),
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.clientId === clientId ? { ...m, pending: false, failed: true } : m,
        ),
      );
    } finally {
      setSending(false);
    }
  };

  const items = buildItems(messages, user?.id);
  const otherParty = conversation?.otherParty;
  const canSend = draft.trim().length > 0 && !sending;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-cream"
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View
        className="flex-row items-center gap-3 border-b border-coral-100 bg-white px-3 pb-3"
        style={{ paddingTop: insets.top + 8 }}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>

        <ChatAvatar name={otherParty?.name} uri={otherParty?.avatar} size={42} />

        <View className="flex-1">
          <Text className="text-[16px] font-bold text-ink" numberOfLines={1}>
            {otherParty?.name ?? "Conversation"}
          </Text>
          <Text className="text-[12px] text-ink-500" numberOfLines={1}>
            {conversation?.resort
              ? `${conversation.resort.name} • ${conversation.resort.municipality}`
              : otherParty?.role === "owner"
                ? "Resort owner"
                : "Traveler"}
          </Text>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-[14px] font-semibold text-ink">
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={items}
          keyExtractor={(item) => item.key}
          contentContainerClassName="px-4 py-4 gap-2"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            if (autoScrollRef.current) {
              listRef.current?.scrollToEnd({ animated: true });
            }
          }}
          onScroll={(e) => {
            const { contentOffset, contentSize, layoutMeasurement } =
              e.nativeEvent;
            const distanceFromEnd =
              contentSize.height -
              layoutMeasurement.height -
              contentOffset.y;
            autoScrollRef.current = distanceFromEnd < 90;
          }}
          scrollEventThrottle={16}
          renderItem={({ item }) =>
            item.type === "day" ? (
              <View className="my-2 items-center">
                <Text className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink-500">
                  {item.label}
                </Text>
              </View>
            ) : (
              <View>
                <MessageBubble message={item.message} isMine={item.isMine} />
                {item.message.pending ? (
                  <Text className="mt-0.5 text-right text-[10px] text-ink-400">
                    Sending…
                  </Text>
                ) : item.message.failed ? (
                  <Text className="mt-0.5 text-right text-[10px] text-coral-600">
                    Not sent
                  </Text>
                ) : null}
              </View>
            )
          }
          ListEmptyComponent={
            <View className="mt-20 items-center px-8">
              <Text className="text-center text-[13px] text-ink-500">
                Say hello to start the conversation.
              </Text>
            </View>
          }
        />
      )}

      <View
        className="flex-row items-end gap-2 border-t border-coral-100 bg-white px-3 pt-2.5"
        style={{ paddingBottom: insets.bottom + 10 }}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Type a message…"
          placeholderTextColor={colors.textSubtle}
          multiline
          className="max-h-[120px] flex-1 rounded-[20px] border border-coral-100 bg-coral-50 px-4 py-3 text-[14px] text-ink"
        />
        <Pressable
          onPress={handleSend}
          disabled={!canSend}
          className={`h-11 w-11 items-center justify-center rounded-full ${
            canSend ? "bg-coral-400" : "bg-coral-200"
          }`}>
          <Ionicons name="send" size={18} color={colors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
