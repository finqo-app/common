/**
 * Currency utilities — symbol lookup, amount formatting, localised names.
 * Built on Intl APIs: no hardcoded locale maps.
 *
 * Every function requires an explicit `locale` (e.g. `i18n.language`) so
 * output is always consistent with the active language.
 */
/** ISO symbol for a currency code, formatted for the given locale (falls back to the code itself). */
export declare function getCurrencySymbol(currency: string, locale: string): string;
/**
 * Localised display name for a currency code.
 * Priority: injected `t` key `currencies.names.<CODE>` → `Intl.DisplayNames` → code itself.
 *
 * Pass `undefined` as `t` to skip the i18n override and use Intl directly.
 */
export declare function getCurrencyLocalizedName(currency: string, locale: string, t?: (key: string) => string): string;
export declare function getCurrencyDotColor(code: string): string;
/** Format a monetary amount with the locale's currency notation. Falls back to symbol + fixed decimal. */
export declare function formatCurrencyAmount(amount: number, currency: string, locale: string): string;
//# sourceMappingURL=currency.d.ts.map