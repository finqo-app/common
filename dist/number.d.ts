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
export declare const EUROPEAN_FORMAT: AmountFormatConfig;
export declare const US_FORMAT: AmountFormatConfig;
/**
 * Derives number separators for amount entry from a BCP 47 locale tag via Intl.
 * Falls back to EUROPEAN_FORMAT for non-English locales and US_FORMAT for `en-*`.
 */
export declare function amountFormatConfigFromLocale(localeTag: string): AmountFormatConfig;
/**
 * Rebuilds the display string from a normalized raw decimal string.
 * Used to keep amount inputs in sync when the locale (format config) changes.
 */
export declare function rawToDisplayValue(raw: string, config?: AmountFormatConfig): string;
/** Formats a user's live keystroke input, returning both a display string and a raw `.`-decimal value. */
export declare function formatInputAmount(value: string, config?: AmountFormatConfig): FormatResult;
/** Formats a numeric amount for display using locale separators (not for live input — use `formatInputAmount`). */
export declare function formatDisplayAmount(amount: number, config?: AmountFormatConfig): string;
/** Parses a display string (with locale separators) back to a number. Returns `NaN` for empty/invalid input. */
export declare function parseAmount(formatted: string, config?: AmountFormatConfig): number;
//# sourceMappingURL=number.d.ts.map