"use strict";
/**
 * Currency utilities — symbol lookup, amount formatting, localised names.
 * Built on Intl APIs: no hardcoded locale maps.
 *
 * Every function requires an explicit `locale` (e.g. `i18n.language`) so
 * output is always consistent with the active language.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencySymbol = getCurrencySymbol;
exports.getCurrencyLocalizedName = getCurrencyLocalizedName;
exports.getCurrencyDotColor = getCurrencyDotColor;
exports.formatCurrencyAmount = formatCurrencyAmount;
/** ISO symbol for a currency code, formatted for the given locale (falls back to the code itself). */
function getCurrencySymbol(currency, locale) {
    const upper = currency.toUpperCase();
    try {
        const formatted = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: upper,
            maximumFractionDigits: 0,
        })
            .format(0)
            .replace(/[\d,.\s]/g, '')
            .trim();
        return formatted || upper;
    }
    catch {
        return upper;
    }
}
/**
 * Localised display name for a currency code.
 * Priority: injected `t` key `currencies.names.<CODE>` → `Intl.DisplayNames` → code itself.
 *
 * Pass `undefined` as `t` to skip the i18n override and use Intl directly.
 */
function getCurrencyLocalizedName(currency, locale, t) {
    const code = currency.toUpperCase();
    let intlName = code;
    try {
        intlName = new Intl.DisplayNames([locale], { type: 'currency' }).of(code) ?? code;
    }
    catch {
        /* fall back to code */
    }
    if (t) {
        const key = `currencies.names.${code}`;
        const translated = t(key);
        if (translated !== key)
            return translated;
    }
    return intlName;
}
/**
 * Per-currency dot colours used in summary cards.
 * Unlisted currencies fall back to slate-400.
 */
const CURRENCY_DOT_COLORS = {
    ARS: '#F59E0B',
    USD: '#10B981',
    EUR: '#3B82F6',
    GBP: '#8B5CF6',
    BRL: '#22D3EE',
    UYU: '#F97316',
};
function getCurrencyDotColor(code) {
    return CURRENCY_DOT_COLORS[code.toUpperCase()] ?? '#94A3B8';
}
/** Format a monetary amount with the locale's currency notation. Falls back to symbol + fixed decimal. */
function formatCurrencyAmount(amount, currency, locale) {
    const upper = currency.toUpperCase();
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: upper,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    }
    catch {
        return `${getCurrencySymbol(upper, locale)}${Math.abs(amount).toFixed(2)}`;
    }
}
//# sourceMappingURL=currency.js.map