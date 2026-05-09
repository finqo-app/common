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
export function formatPeriodLabel(
  dateString: string,
  periodicity: string | undefined,
  locale: string,
  t: TFunction,
): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return '';
  const p = periodicity ?? '';

  switch (p) {
    case 'daily':
      return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });

    case 'weekly': {
      const weekOf = t('transactions.details.weekOf');
      return `${weekOf} ${d.toLocaleDateString(locale, { day: 'numeric', month: 'short' })}`;
    }

    case 'biweekly': {
      const end = new Date(d);
      end.setDate(end.getDate() + 13);
      if (d.getMonth() === end.getMonth()) {
        return `${d.getDate()} – ${end.toLocaleDateString(locale, { day: 'numeric', month: 'short' })}`;
      }
      return `${d.toLocaleDateString(locale, { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString(locale, { day: 'numeric', month: 'short' })}`;
    }

    case 'monthly':
      return d.toLocaleDateString(locale, { month: 'short', year: 'numeric' });

    case 'bimonthly': {
      const next = new Date(d);
      next.setMonth(next.getMonth() + 1);
      return `${d.toLocaleDateString(locale, { month: 'short' })} – ${next.toLocaleDateString(locale, { month: 'short', year: 'numeric' })}`;
    }

    case 'quarterly': {
      const quarter = Math.floor(d.getMonth() / 3) + 1;
      return `Q${quarter} ${d.getFullYear()}`;
    }

    case 'semiannual': {
      const half = d.getMonth() < 6 ? 'H1' : 'H2';
      return `${half} ${d.getFullYear()}`;
    }

    case 'yearly':
      return String(d.getFullYear());

    default:
      return d.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
  }
}
