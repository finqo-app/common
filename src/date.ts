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

/**
 * Returns the time portion of a UTC ISO string rendered in the given IANA timezone
 * (e.g. "America/Argentina/Buenos_Aires"), so the time is always shown at origin
 * wall-clock regardless of the viewer's device timezone.
 *
 * Falls back gracefully to viewer-local time when `timeZone` is empty or unsupported.
 */
export function formatTimeInZone(isoUtc: string, timeZone: string, locale?: string): string {
  if (!isoUtc) return '';
  const d = new Date(isoUtc);
  if (Number.isNaN(d.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timeZone || undefined,
    }).format(d);
  } catch {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  }
}

/**
 * Returns the `YYYY-MM-DD` calendar day for a UTC ISO string in the given IANA timezone.
 * Used to group transactions by their origin day regardless of viewer location.
 *
 * Falls back to viewer-local date when `timeZone` is empty or unsupported.
 */
export function dayKeyInZone(isoUtc: string, timeZone: string): string {
  if (!isoUtc) return '';
  const d = new Date(isoUtc);
  if (Number.isNaN(d.getTime())) return '';
  try {
    const fmt = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: timeZone || undefined,
    });
    return fmt.format(d);
  } catch {
    return toDateOnlyString(d);
  }
}

/**
 * Returns the IANA timezone of the current device/browser using the Intl API.
 * Falls back to `"UTC"` when the API is unavailable (rare in modern environments).
 */
export function getDeviceTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}
