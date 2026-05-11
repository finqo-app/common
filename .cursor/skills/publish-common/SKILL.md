---
name: publish-common
description: Publish @finqo-app/common to the GitHub npm registry. Use when editing finqo-shared/src/, bumping the version, and releasing a new version. Trigger phrases: publish common, release common, bump common.
---

# Publishing `@finqo-app/common`

The library is published via GitHub Actions on a tag push. Never run `npm publish` locally (it requires a personal token).

## Scope rules (enforce before publishing)

`@finqo-app/common` is **utilities only**. Before adding or removing anything, verify:

| Allowed (utils) | Not allowed (business logic — move to the app) |
|---|---|
| Generic formatting/parsing (Intl, numbers, dates) | Domain enums or periodicity values |
| Generic validation (`EMAIL_REGEX`, `isValidEmail`) | Notification payload shapes |
| Pure functions reusable in any TypeScript project | Brand color maps, icon maps |

## Step 1: Edit `src/`

Make your changes in `finqo-shared/src/`. Follow existing patterns in `number.ts`, `date.ts`, `currency.ts`, `validation.ts`.

## Step 2: Typecheck and lint

```bash
npm run typecheck
npm run lint
```

Fix any errors before proceeding.

## Step 3: Bump `package.json` version

Follow semver:

- **Patch** (`2.0.0` → `2.0.1`): backward-compatible fixes, no new surface
- **Minor** (`2.0.0` → `2.1.0`): new functions or exports added, still backward compatible
- **Major** (`2.0.0` → `3.0.0`): removed or renamed exports (breaking change)

Update the `version` field in `package.json`.

## Step 4: Build

```bash
npm run build
```

Verify `dist/` contains the expected files. Delete any stale `dist/` files that no longer have a matching `src/` module:

```bash
ls dist/
```

## Step 5: Commit

```bash
git add -A
git commit -m "chore: release vX.Y.Z — <brief description>"
git push
```

## Step 6: Tag and push (triggers publish)

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

The `v*` tag triggers `.github/workflows/publish.yml` which:
1. Runs `typecheck` + `lint` + `build`
2. Runs `npm publish --access public` to GitHub Packages at `https://npm.pkg.github.com`

## Step 7: Bump consumers

After the GitHub Actions workflow completes (usually ~1 minute), update each consuming app:

**finqo-web:**
```bash
cd ../finqo-web
# Edit package.json: "@finqo-app/common": "^X.Y.Z"
npm install
```

**finqo-mobile:**
```bash
cd ../finqo-mobile
# Edit package.json: "@finqo-app/common": "^X.Y.Z"
npm install  # requires GITHUB_TOKEN env var pointing to a token with packages:read
```

> The `.npmrc` files in both apps are already configured for `@finqo-app:registry=https://npm.pkg.github.com`.
