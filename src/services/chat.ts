import type {
  ChatMessage,
  ChatParty,
  ChatResort,
  Conversation,
  Role,
} from "@/data/types";
import { api } from "./api";

type ApiParty = {
  id: number;
  name: string;
  email: string | null;
  avatar: string | null;
  role: Role;
};

type ApiResort = {
  id: number;
  name: string;
  municipality: string;
  cover_image: string | null;
};

type ApiConversation = {
  id: number;
  subject: string | null;
  status: string;
  my_role: "traveler" | "owner";
  other_party: ApiParty | null;
  resort: ApiResort | null;
  booking_id: number | null;
  last_message_at: string | null;
  unread_count: number;
  last_message: {
    id: number;
    sender_id: number | null;
    sender_name: string;
    body: string;
    created_at: string | null;
  } | null;
  created_at: string | null;
};

type ApiMessage = {
  id: number;
  conversation_id: number;
  sender_id: number | null;
  sender_name: string;
  sender_role: Role | null;
  body: string;
  client_id: string | null;
  created_at: string | null;
};

type ListResponse<T> = {
  success: boolean;
  count: number;
  unread_total?: number;
  data: T[];
};

type ItemResponse<T> = {
  success: boolean;
  created?: boolean;
  data: T;
};

function toParty(raw: ApiParty | null): ChatParty | null {
  if (!raw) return null;
  return {
    id: String(raw.id),
    name: raw.name,
    email: raw.email,
    avatar: raw.avatar,
    role: raw.role,
  };
}

function toResort(raw: ApiResort | null): ChatResort | null {
  if (!raw) return null;
  return {
    id: String(raw.id),
    name: raw.name,
    municipality: raw.municipality,
    coverImage: raw.cover_image,
  };
}

function toConversation(raw: ApiConversation): Conversation {
  return {
    id: String(raw.id),
    subject: raw.subject,
    status: raw.status === "closed" ? "closed" : "open",
    myRole: raw.my_role,
    otherParty: toParty(raw.other_party),
    resort: toResort(raw.resort),
    bookingId: raw.booking_id != null ? String(raw.booking_id) : null,
    lastMessageAt: raw.last_message_at,
    unreadCount: raw.unread_count ?? 0,
    lastMessage: raw.last_message
      ? {
          id: String(raw.last_message.id),
          senderId:
            raw.last_message.sender_id != null
              ? String(raw.last_message.sender_id)
              : null,
          senderName: raw.last_message.sender_name,
          body: raw.last_message.body,
          createdAt: raw.last_message.created_at ?? "",
        }
      : null,
    createdAt: raw.created_at ?? "",
  };
}

function toMessage(raw: ApiMessage): ChatMessage {
  return {
    id: String(raw.id),
    conversationId: String(raw.conversation_id),
    senderId: raw.sender_id != null ? String(raw.sender_id) : null,
    senderName: raw.sender_name,
    senderRole: raw.sender_role,
    body: raw.body,
    clientId: raw.client_id,
    createdAt: raw.created_at ?? "",
  };
}

export async function fetchConversations(): Promise<Conversation[]> {
  const { data } = await api.get<ListResponse<ApiConversation>>("/conversations");
  return data.data.map(toConversation);
}

export async function fetchUnreadCount(): Promise<number> {
  const { data } = await api.get<{ success: boolean; unread_total: number }>(
    "/conversations/unread-count",
  );
  return data.unread_total ?? 0;
}

export async function fetchConversation(id: string): Promise<Conversation> {
  const { data } = await api.get<ItemResponse<ApiConversation>>(
    `/conversations/${id}`,
  );
  return toConversation(data.data);
}

export async function startConversation(params: {
  resortId: string;
  travelerId?: string;
  subject?: string;
}): Promise<Conversation> {
  const { data } = await api.post<ItemResponse<ApiConversation>>(
    "/conversations",
    {
      resort_id: Number(params.resortId),
      traveler_id: params.travelerId ? Number(params.travelerId) : undefined,
      subject: params.subject,
    },
  );
  return toConversation(data.data);
}

export async function fetchMessages(
  conversationId: string,
  afterId?: string,
): Promise<{ messages: ChatMessage[]; nextCursor: string; hasMore: boolean }> {
  const { data } = await api.get<{
    success: boolean;
    next_cursor: number;
    has_more: boolean;
    data: ApiMessage[];
  }>(`/conversations/${conversationId}/messages`, {
    params: afterId ? { after_id: afterId } : undefined,
  });

  return {
    messages: data.data.map(toMessage),
    nextCursor: String(data.next_cursor),
    hasMore: data.has_more,
  };
}

export async function sendChatMessage(
  conversationId: string,
  body: string,
  clientId?: string,
): Promise<ChatMessage> {
  const { data } = await api.post<{ success: boolean; data: ApiMessage }>(
    `/conversations/${conversationId}/messages`,
    { body, client_id: clientId },
  );
  return toMessage(data.data);
}

export async function markConversationRead(
  conversationId: string,
): Promise<void> {
  await api.post(`/conversations/${conversationId}/read`);
}
