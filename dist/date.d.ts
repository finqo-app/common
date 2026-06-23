/**
 * Date helpers for calendar fields and API timestamps.
 * Aligned between finqo-web `shared/lib/date.ts` and finqo-mobile `dateUtils.ts`.
 *
 * — `toDateOnlyString` / `parseDateOnlyLocal`: local calendar day, no UTC midnight shift.
 * — `dateWithCurrentTimeUTC`: picker date + current local wall clock → UTC ISO for the API.
 */
/** Formats a Date as `YYYY-MM-DD` in the local timezone. */
export declare function toDateOnlyString(date: Date): string;
/** Parses a `YYYY-MM-DD` string as local midnight (avoids UTC → local timezone shifts). */
export declare function parseDateOnlyLocal(dateOnlyString: string): Date;
/**
 * Combines the calendar date from `date` with the current local wall clock time
 * and returns a UTC ISO string — used when submitting date-picker values to the API.
 */
export declare function dateWithCurrentTimeUTC(date: Date): string;
/** Returns the time portion of a date string as `HH:MM` (locale-aware). */
export declare function formatTimeOnly(dateStr: string, locale?: string): string;
/**
 * Returns the time portion of a UTC ISO string rendered in the given IANA timezone
 * (e.g. "America/Argentina/Buenos_Aires"), so the time is always shown at origin
 * wall-clock regardless of the viewer's device timezone.
 *
 * Falls back gracefully to viewer-local time when `timeZone` is empty or unsupported.
 */
export declare function formatTimeInZone(isoUtc: string, timeZone: string, locale?: string): string;
/**
 * Returns the `YYYY-MM-DD` calendar day for a UTC ISO string in the given IANA timezone.
 * Used to group transactions by their origin day regardless of viewer location.
 *
 * Falls back to viewer-local date when `timeZone` is empty or unsupported.
 */
export declare function dayKeyInZone(isoUtc: string, timeZone: string): string;
/**
 * Returns the IANA timezone of the current device/browser using the Intl API.
 * Falls back to `"UTC"` when the API is unavailable (rare in modern environments).
 */
export declare function getDeviceTimeZone(): string;
//# sourceMappingURL=date.d.ts.map