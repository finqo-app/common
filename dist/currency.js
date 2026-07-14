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
exports.formatCurrencyAmount = formatCurrencyAmount;
/** ISO symbol for a currency code, formatted for the given locale (falls back to the code itself). */
function getCurrencySymbol(currency, locale, options = {}) {
    const upper = currency.toUpperCase();
    try {
        const formatted = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: upper,
            currencyDisplay: options.narrow ? 'narrowSymbol' : 'symbol',
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
/** Format a monetary amount with the locale's currency notation. Falls back to symbol + fixed decimal. */
function formatCurrencyAmount(amount, currency, locale, options = {}) {
    const upper = currency.toUpperCase();
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: upper,
            currencyDisplay: options.narrowSymbol ? 'narrowSymbol' : 'symbol',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    }
    catch {
        return `${getCurrencySymbol(upper, locale, { narrow: options.narrowSymbol })}${Math.abs(amount).toFixed(2)}`;
    }
}
//# sourceMappingURL=currency.js.map