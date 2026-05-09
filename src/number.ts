/**
 * Amount input formatting and parsing — locale-aware separators.
 * Aligned between finqo-web `shared/lib/number.ts` and
 * finqo-mobile `shared/utils/amountFormatter.ts`.
 *
 * `rawValue` always uses `.` as the decimal separator (suitable for API submission).
 * `displayValue` uses the locale's separators (shown in the UI input).
 */

export interface FormatResult {
  displayValue: string;
  rawValue: string;
}

export interface AmountFormatConfig {
  decimalSeparator: string;
  thousandsSeparator: string;
  maxIntegerDigits?: number;
  maxDecimalDigits?: number;
}

export const EUROPEAN_FORMAT: AmountFormatConfig = {
  decimalSeparator: ',',
  thousandsSeparator: '.',
};

export const US_FORMAT: AmountFormatConfig = {
  decimalSeparator: '.',
  thousandsSeparator: ',',
};

/**
 * Derives number separators for amount entry from a BCP 47 locale tag via Intl.
 * Falls back to EUROPEAN_FORMAT for non-English locales and US_FORMAT for `en-*`.
 */
export function amountFormatConfigFromLocale(localeTag: string): AmountFormatConfig {
  const normalized = localeTag.trim().replace(/_/g, '-') || 'es';
  try {
    const parts = new Intl.NumberFormat(normalized, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).formatToParts(1_234_567.89);
    const decimal = parts.find((p) => p.type === 'decimal')?.value;
    const group = parts.find((p) => p.type === 'group')?.value;
    if (decimal != null && group != null) {
      return { decimalSeparator: decimal, thousandsSeparator: group };
    }
  } catch {
    /* invalid locale */
  }
  const lang = normalized.split('-')[0] ?? 'es';
  return lang === 'en' ? US_FORMAT : EUROPEAN_FORMAT;
}

/**
 * Rebuilds the display string from a normalized raw decimal string.
 * Used to keep amount inputs in sync when the locale (format config) changes.
 */
export function rawToDisplayValue(
  raw: string,
  config: AmountFormatConfig = EUROPEAN_FORMAT,
): string {
  if (raw === '' || raw.trim() === '') return '';
  const maxDecimalDigits = config.maxDecimalDigits ?? 2;
  let trimmed = raw.trim();
  if (trimmed.startsWith('.')) trimmed = `0${trimmed}`;
  if (!/^\d*(\.\d*)?$/.test(trimmed)) return '';
  const hasDecimalPoint = trimmed.includes('.');
  const [intRaw, decRawFull = ''] = trimmed.split('.');
  let intPart = intRaw === '' ? '0' : intRaw;
  intPart = intPart.replace(/^0+(?=\d)/, '');
  if (intPart === '') intPart = '0';
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator);
  const dec = decRawFull.slice(0, maxDecimalDigits);
  if (hasDecimalPoint) {
    if (dec.length > 0) return `${intFormatted}${config.decimalSeparator}${dec}`;
    if (maxDecimalDigits === 0) return intFormatted;
    return `${intFormatted}${config.decimalSeparator}`;
  }
  return intFormatted;
}

/** Formats a user's live keystroke input, returning both a display string and a raw `.`-decimal value. */
export function formatInputAmount(
  value: string,
  config: AmountFormatConfig = EUROPEAN_FORMAT,
): FormatResult {
  const maxIntegerDigits = config.maxIntegerDigits ?? 12;
  const maxDecimalDigits = config.maxDecimalDigits ?? 2;
  const { decimalSeparator, thousandsSeparator } = config;

  const decEscaped = decimalSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cleaned = value.replace(new RegExp(`[^\\d${decEscaped}]`, 'g'), '');

  if (cleaned === '') return { displayValue: '', rawValue: '' };

  const parts = cleaned.split(decimalSeparator);
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? parts[1] : null;

  if (integerPart.length > maxIntegerDigits) {
    integerPart = integerPart.substring(0, maxIntegerDigits);
  }
  if (decimalPart !== null && decimalPart.length > maxDecimalDigits) {
    decimalPart = decimalPart.substring(0, maxDecimalDigits);
  }

  let formattedInteger = '';
  if (integerPart !== '') {
    formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  }

  let formatted = formattedInteger;
  if (decimalPart !== null) {
    formatted = `${formatted}${decimalSeparator}${decimalPart}`;
  } else if (cleaned.endsWith(decimalSeparator)) {
    formatted = `${formatted}${decimalSeparator}`;
  }

  const rawValue = decimalPart !== null ? `${integerPart}.${decimalPart}` : integerPart;

  return { displayValue: formatted, rawValue };
}

/** Formats a numeric amount for display using locale separators (not for live input — use `formatInputAmount`). */
export function formatDisplayAmount(
  amount: number,
  config: AmountFormatConfig = EUROPEAN_FORMAT,
): string {
  const maxDecimalDigits = config.maxDecimalDigits ?? 2;
  const { decimalSeparator, thousandsSeparator } = config;

  const parts = amount.toFixed(maxDecimalDigits).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  const formattedInteger = (integerPart ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

  if (decimalPart == null) return formattedInteger;
  return `${formattedInteger}${decimalSeparator}${decimalPart}`;
}

/** Parses a display string (with locale separators) back to a number. Returns `NaN` for empty/invalid input. */
export function parseAmount(
  formatted: string,
  config: AmountFormatConfig = EUROPEAN_FORMAT,
): number {
  if (!formatted || formatted.trim() === '') return NaN;
  const { decimalSeparator, thousandsSeparator } = config;
  let cleaned = formatted.replace(new RegExp(`\\${thousandsSeparator}`, 'g'), '');
  if (decimalSeparator !== '.') cleaned = cleaned.replace(decimalSeparator, '.');
  return parseFloat(cleaned);
}
