"use strict";
/**
 * Notification helpers shared between finqo-web and finqo-mobile.
 * Both platforms display the same notification shapes — these pure helpers
 * avoid duplicating identical logic in each screen.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNotificationPayload = parseNotificationPayload;
exports.formatNotificationAmount = formatNotificationAmount;
exports.getNotificationDayBucket = getNotificationDayBucket;
exports.formatNotificationTime = formatNotificationTime;
/**
 * Parses the notification `payload` field.
 *
 * The API can return payload as:
 *  - A JSON string (web response)
 *  - A plain object (already decoded)
 *  - A `number[]` byte array (mobile response from some API versions)
 */
function parseNotificationPayload(raw) {
    try {
        let parsed;
        if (Array.isArray(raw)) {
            // Mobile: payload arrives as a UTF-8 byte array
            parsed = JSON.parse(String.fromCharCode(...raw));
        }
        else if (typeof raw === 'string') {
            parsed = JSON.parse(raw);
        }
        else {
            parsed = raw;
        }
        if (parsed && typeof parsed === 'object') {
            return parsed;
        }
    }
    catch {
        /* ignore malformed payloads */
    }
    return null;
}
/**
 * Formats a notification amount line: `"12 USD"` or `"12.50 USD"`.
 * Intentionally simple — not locale-formatted — to match the compact
 * one-line subtitle shown in notification items.
 */
function formatNotificationAmount(amount, currency) {
    const formatted = amount % 1 === 0 ? String(amount) : amount.toFixed(2);
    return `${formatted} ${currency}`;
}
/**
 * Buckets an ISO date string into `today`, `yesterday`, or `earlier`
 * relative to the current local date (UTC-normalized diff).
 */
function getNotificationDayBucket(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) /
        86400000);
    if (diffDays === 0)
        return 'today';
    if (diffDays === 1)
        return 'yesterday';
    return 'earlier';
}
/** Returns the time portion of a notification's `createdAt` timestamp as `HH:MM`. */
function formatNotificationTime(dateStr) {
    if (!dateStr)
        return '';
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
//# sourceMappingURL=notifications.js.map