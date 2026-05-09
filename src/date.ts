/**
 * Date helpers for calendar fields and API timestamps.
 * Aligned between finqo-web `shared/lib/date.ts` and finqo-mobile `dateUtils.ts`.
 *
 * — `toDateOnlyString` / `parseDateOnlyLocal`: local calendar day, no UTC midnight shift.
 * — `dateWithCurrentTimeUTC`: picker date + current local wall clock → UTC ISO for the API.
 */

/** Formats a Date as `YYYY-MM-DD` in the local timezone. */
export function toDateOnlyString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Parses a `YYYY-MM-DD` string as local midnight (avoids UTC → local timezone shifts). */
export function parseDateOnlyLocal(dateOnlyString: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOnlyString);
  if (!match) return new Date();
  const y = Number(match[1]);
  const mo = Number(match[2]) - 1;
  const day = Number(match[3]);
  const d = new Date(y, mo, day);
  if (d.getFullYear() !== y || d.getMonth() !== mo || d.getDate() !== day) return new Date();
  return d;
}

/**
 * Combines the calendar date from `date` with the current local wall clock time
 * and returns a UTC ISO string — used when submitting date-picker values to the API.
 */
export function dateWithCurrentTimeUTC(date: Date): string {
  const now = new Date();
  const combined = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    0,
  );
  return combined.toISOString();
}

/** Returns the time portion of a date string as `HH:MM` (locale-aware). */
export function formatTimeOnly(dateStr: string, locale?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(d);
}
