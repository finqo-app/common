/**
 * Currency utilities — symbol lookup, amount formatting, localised names.
 * Built on Intl APIs: no hardcoded locale maps.
 *
 * Every function requires an explicit `locale` (e.g. `i18n.language`) so
 * output is always consistent with the active language.
 */
export interface GetCurrencySymbolOptions {
    /**
     * Use Intl's "narrow" symbol form (e.g. "$" instead of "ARS" for Argentine
     * pesos in locales where the plain symbol would be ambiguous). Useful when
     * the ISO code is already shown elsewhere (e.g. a currency badge) and
     * repeating it as the symbol would be redundant.
     *
     * ⚠️ Web-only in practice: React Native's Hermes engine does not reliably
     * implement `currencyDisplay: 'narrowSymbol'` and may silently fall back to
     * the default symbol, so the two platforms can render different output for
     * the same call. For cross-platform consistency, prefer the app's currency
     * reference registry (`useCurrencies().getSymbol()`) combined with
     * `formatDisplayAmount()` instead of this option.
     */
    narrow?: boolean;
}
/** ISO symbol for a currency code, formatted for the given locale (falls back to the code itself). */
export declare function getCurrencySymbol(currency: string, locale: string, options?: GetCurrencySymbolOptions): string;
/**
 * Localised display name for a currency code.
 * Priority: injected `t` key `currencies.names.<CODE>` → `Intl.DisplayNames` → code itself.
 *
 * Pass `undefined` as `t` to skip the i18n override and use Intl directly.
 */
export declare function getCurrencyLocalizedName(currency: string, locale: string, t?: (key: string) => string): string;
export interface FormatCurrencyAmountOptions {
    /** See the caveat on {@link GetCurrencySymbolOptions.narrow}. */
    narrowSymbol?: boolean;
}
/** Format a monetary amount with the locale's currency notation. Falls back to symbol + fixed decimal. */
export declare function formatCurrencyAmount(amount: number, currency: string, locale: string, options?: FormatCurrencyAmountOptions): string;
//# sourceMappingURL=currency.d.ts.map