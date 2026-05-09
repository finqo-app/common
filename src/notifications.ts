/**
 * Notification helpers shared between finqo-web and finqo-mobile.
 * Both platforms display the same notification shapes — these pure helpers
 * avoid duplicating identical logic in each screen.
 */

/** Shape of the `payload` field on group transaction notifications. */
export interface NotificationTransactionPayload {
  actor_name: string;
  amount: number;
  currency: string;
  description: string;
  group_name: string;
}

/**
 * Parses the notification `payload` field.
 *
 * The API can return payload as:
 *  - A JSON string (web response)
 *  - A plain object (already decoded)
 *  - A `number[]` byte array (mobile response from some API versions)
 */
export function parseNotificationPayload(raw: unknown): NotificationTransactionPayload | null {
  try {
    let parsed: unknown;
    if (Array.isArray(raw)) {
      // Mobile: payload arrives as a UTF-8 byte array
      parsed = JSON.parse(String.fromCharCode(...(raw as number[])));
    } else if (typeof raw === 'string') {
      parsed = JSON.parse(raw);
    } else {
      parsed = raw;
    }
    if (parsed && typeof parsed === 'object') {
      return parsed as NotificationTransactionPayload;
    }
  } catch {
    /* ignore malformed payloads */
  }
  return null;
}

/**
 * Formats a notification amount line: `"12 USD"` or `"12.50 USD"`.
 * Intentionally simple — not locale-formatted — to match the compact
 * one-line subtitle shown in notification items.
 */
export function formatNotificationAmount(amount: number, currency: string): string {
  const formatted = amount % 1 === 0 ? String(amount) : amount.toFixed(2);
  return `${formatted} ${currency}`;
}

export type NotificationDayBucket = 'today' | 'yesterday' | 'earlier';

/**
 * Buckets an ISO date string into `today`, `yesterday`, or `earlier`
 * relative to the current local date (UTC-normalized diff).
 */
export function getNotificationDayBucket(dateStr: string): NotificationDayBucket {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) /
      86_400_000,
  );
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  return 'earlier';
}

/** Returns the time portion of a notification's `createdAt` timestamp as `HH:MM`. */
export function formatNotificationTime(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
