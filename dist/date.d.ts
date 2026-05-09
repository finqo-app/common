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
//# sourceMappingURL=date.d.ts.map