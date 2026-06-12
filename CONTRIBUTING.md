# Contributing to @finqo-app/common

## Scope: utilities only

This package is **pure utilities** — generic functions reusable in any TypeScript project. Before adding anything, check it against the boundary below.

**Belongs here:**

- Generic formatting/parsing (numbers, dates, currencies via `Intl`)
- Generic validation primitives (regex constants, length constants, `isValidEmail`)
- Pure functions with no side effects and no Finqo domain knowledge

**Does _not_ belong here** (keep it in each app under `features/<area>/`):

- Anything that knows domain enums (transaction types, periodicities, payment methods, categories, …)
- Anything that knows API payload shapes (notifications, transactions, recurring, …)
- Brand/UI decisions (color maps, icon maps, design tokens)
- Feature-specific workflows

If a function needs to know about the Finqo domain, it does not go here.

## Project layout

```
src/
  index.ts        # barrel re-exports every module
  currency.ts     # Intl currency symbol/name/format
  number.ts       # locale-aware amount input/display/parse
  date.ts         # date-only strings and API timestamps
  validation.ts   # email + password primitives
```

Each new module must be re-exported from `src/index.ts`.

## Local development

```bash
npm ci
npm run typecheck   # tsc --noEmit
npm run lint        # prettier --check
npm run build       # emits dist/
```

- **Node:** 20 (matches CI).
- **No runtime dependencies** — keep it that way. Do not add dependencies for things `Intl` or plain TS can do.
- Tests for utilities live in the consuming apps (e.g. `finqo-web/src/shared/lib/*.test.ts`). Keep functions small and deterministic so they're easy to test there.

## Releasing

Publishing is **tag-triggered** via GitHub Actions ([`.github/workflows/publish.yml`](.github/workflows/publish.yml)) — do **not** run `npm publish` locally.

1. Edit `src/`.
2. `npm run typecheck && npm run lint`.
3. Bump `version` in `package.json` following semver:
   - **patch** — fixes, no new surface
   - **minor** — new functions/exports, backward compatible
   - **major** — removed or renamed exports
4. Add an entry to [CHANGELOG.md](CHANGELOG.md).
5. `npm run build` and verify `dist/`.
6. Commit and push to `main`.
7. Tag and push: `git tag vX.Y.Z && git push origin vX.Y.Z`. The `Publish` workflow runs the checks and publishes to GitHub Packages.
8. Bump `@finqo-app/common` in `finqo-web` and `finqo-mobile`, then `npm install` in each.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`. Use `feat!:` / `BREAKING CHANGE:` for major bumps.
