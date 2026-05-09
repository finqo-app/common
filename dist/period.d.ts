/**
 * Human-readable period label for recurring payment rows.
 * Shared between finqo-web `transaction-list-display.ts` and
 * finqo-mobile `dateUtils.ts` (`formatPeriodLabel`).
 *
 * Pure function: no React/React-Native deps. The `t` translator is injected
 * so callers provide their own i18n implementation.
 */
type TFunction = (key: string, values?: Record<string, string | number>) => string;
/**
 * Returns a human-readable label for a recurring payment period.
 *
 * @param dateString  - ISO date string of the first occurrence
 * @param periodicity - One of: daily | weekly | biweekly | monthly | bimonthly | quarterly | semiannual | yearly
 * @param locale      - BCP 47 locale tag (e.g. `'en-US'`, `'es-AR'`)
 * @param t           - Injected translation function
 */
export declare function formatPeriodLabel(dateString: string, periodicity: string | undefined, locale: string, t: TFunction): string;
export {};
//# sourceMappingURL=period.d.ts.map