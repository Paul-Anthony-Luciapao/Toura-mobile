import { formatShortDate } from "@/lib/formatters";
import type { Notification } from "@/data/types";

export type NotificationSection = {
  title: string;
  data: Notification[];
};

const MS_PER_DAY = 86_400_000;

function startOfDay(value: number) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

/**
 * Compact "2h ago" style label. Hand-rolled rather than
 * Intl.RelativeTimeFormat because Hermes' Intl support for it is unreliable.
 */
export function relativeTime(iso: string, now: number = Date.now()) {
  const minutes = Math.floor((now - new Date(iso).getTime()) / 60_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;

  return formatShortDate(iso);
}

/** Buckets a timestamp into the section a feed reader expects to scan. */
export function sectionTitleFor(iso: string, now: number = Date.now()) {
  const dayGap = Math.round(
    (startOfDay(now) - startOfDay(new Date(iso).getTime())) / MS_PER_DAY
  );

  if (dayGap <= 0) return "Today";
  if (dayGap === 1) return "Yesterday";
  return "Earlier";
}

/**
 * Groups a newest-first list into consecutive Today/Yesterday/Earlier buckets.
 * Items are assumed to already be sorted by createdAt descending.
 */
export function groupBySection(
  items: Notification[],
  now: number = Date.now()
): NotificationSection[] {
  return items.reduce<NotificationSection[]>((sections, item) => {
    const title = sectionTitleFor(item.createdAt, now);
    const current = sections[sections.length - 1];

    if (current?.title === title) {
      current.data.push(item);
    } else {
      sections.push({ title, data: [item] });
    }

    return sections;
  }, []);
}

export function unreadCount(items: Notification[]) {
  return items.filter((item) => !item.read).length;
}
