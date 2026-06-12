# @finqo-app/common

Shared **pure TypeScript utilities** for Finqo web and mobile: currency formatting, amount parsing, date helpers, and validation.

This package contains **utilities only** — pure functions with no knowledge of the Finqo domain. Anything that understands business enums, API payload shapes, or brand/UI decisions stays in each app, not here.

- **Package:** `@finqo-app/common`
- **Registry:** [GitHub Packages](https://npm.pkg.github.com) (private)
- **Consumers:** [`finqo-web`](https://github.com/finqo-app/finqo-web), [`finqo-mobile`](https://github.com/finqo-app/finqo-mobile)

## Installation

The package is published to GitHub Packages under the `@finqo-app` scope. Consumers need a `.npmrc` and a token with `read:packages`:

```ini
# .npmrc
@finqo-app:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @finqo-app/common
```

## Usage

```typescript
import {
  formatCurrencyAmount,
  formatInputAmount,
  parseAmount,
  toDateOnlyString,
  isValidEmail,
} from '@finqo-app/common';
import type { AmountFormatConfig } from '@finqo-app/common';
```

## API

### Currency (`currency.ts`)

Intl-based helpers. All require an explicit BCP 47 `locale`.

| Export | Signature |
|---|---|
| `getCurrencySymbol` | `(currency: string, locale: string) => string` |
| `getCurrencyLocalizedName` | `(currency: string, locale: string, t?: (key: string) => string) => string` |
| `formatCurrencyAmount` | `(amount: number, currency: string, locale: string) => string` |

`getCurrencyLocalizedName` optionally accepts an i18n `t` function; it looks up `currencies.names.<CODE>` before falling back to `Intl.DisplayNames`.

### Numbers & amounts (`number.ts`)

Locale-aware amount input, display, and parsing. `rawValue` always uses `.` as the decimal separator (API-safe); `displayValue` uses locale separators.

| Export | Kind | Signature / value |
|---|---|---|
| `FormatResult` | interface | `{ displayValue: string; rawValue: string }` |
| `AmountFormatConfig` | interface | `{ decimalSeparator, thousandsSeparator, maxIntegerDigits?, maxDecimalDigits? }` |
| `EUROPEAN_FORMAT` | const | `{ decimalSeparator: ',', thousandsSeparator: '.' }` |
| `US_FORMAT` | const | `{ decimalSeparator: '.', thousandsSeparator: ',' }` |
| `amountFormatConfigFromLocale` | function | `(localeTag: string) => AmountFormatConfig` |
| `rawToDisplayValue` | function | `(raw: string, config?: AmountFormatConfig) => string` |
| `formatInputAmount` | function | `(value: string, config?: AmountFormatConfig) => FormatResult` |
| `formatDisplayAmount` | function | `(amount: number, config?: AmountFormatConfig) => string` |
| `parseAmount` | function | `(formatted: string, config?: AmountFormatConfig) => number` |

### Dates (`date.ts`)

Calendar dates and API timestamps.

| Export | Signature | Returns |
|---|---|---|
| `toDateOnlyString` | `(date: Date) => string` | `YYYY-MM-DD` (local TZ) |
| `parseDateOnlyLocal` | `(dateOnlyString: string) => Date` | local midnight |
| `dateWithCurrentTimeUTC` | `(date: Date) => string` | UTC ISO string |
| `formatTimeOnly` | `(dateStr: string, locale?: string) => string` | `HH:MM` |

### Validation (`validation.ts`)

| Export | Kind | Value |
|---|---|---|
| `EMAIL_REGEX` | const | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| `MIN_PASSWORD_LENGTH` | const | `8` |
| `isValidEmail` | function | `(email: string) => boolean` |

## Scripts

| Script | Description |
|---|---|
| `npm run build` | Compile `src/` to `dist/` (`tsc -p tsconfig.build.json`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Prettier check on `src/**/*.ts` |

## Contributing & releases

See [CONTRIBUTING.md](CONTRIBUTING.md) for the scope rules and release process, and [CHANGELOG.md](CHANGELOG.md) for version history.

## License

UNLICENSED — private.
