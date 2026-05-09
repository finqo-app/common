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
export declare function parseNotificationPayload(raw: unknown): NotificationTransactionPayload | null;
/**
 * Formats a notification amount line: `"12 USD"` or `"12.50 USD"`.
 * Intentionally simple — not locale-formatted — to match the compact
 * one-line subtitle shown in notification items.
 */
export declare function formatNotificationAmount(amount: number, currency: string): string;
export type NotificationDayBucket = 'today' | 'yesterday' | 'earlier';
/**
 * Buckets an ISO date string into `today`, `yesterday`, or `earlier`
 * relative to the current local date (UTC-normalized diff).
 */
export declare function getNotificationDayBucket(dateStr: string): NotificationDayBucket;
/** Returns the time portion of a notification's `createdAt` timestamp as `HH:MM`. */
export declare function formatNotificationTime(dateStr: string): string;
//# sourceMappingURL=notifications.d.ts.map