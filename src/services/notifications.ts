import type { Notification, NotificationKind } from "@/data/types";
import { api } from "@/services/api";

type NotificationResponse = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  href: string | null;
  created_at: string;
  read: boolean;
};

function toNotification(item: NotificationResponse): Notification {
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    body: item.body,
    href: (item.href ?? undefined) as Notification["href"],
    createdAt: item.created_at,
    read: item.read,
  };
}

export async function fetchNotifications(): Promise<Notification[]> {
  const response = await api.get<{ data: NotificationResponse[] }>("/notifications");
  return response.data.data.map(toNotification);
}

export async function fetchUnreadNotificationsCount(): Promise<number> {
  const response = await api.get<{ unread_total: number }>("/notifications/unread-count");
  return response.data.unread_total;
}

export async function markNotificationRead(id: string): Promise<void> {
  await api.post(`/notifications/${encodeURIComponent(id)}/read`);
}

export async function markAllNotificationsRead(): Promise<void> {
  await api.post("/notifications/read-all");
}
