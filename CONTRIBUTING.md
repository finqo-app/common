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

Release preparation is manual, like mobile. Publishing remains **tag-triggered** through [Publish](.github/workflows/publish.yml); do **not** run `npm publish` locally.

1. Merge reviewed utility changes into `main` through normal PRs. Use Conventional Commits: fixes produce patch releases, compatible new exports produce minor releases, and breaking changes produce major releases.
2. In **Actions → Prepare release → Run workflow**, select `main`. This creates or updates a release PR with the next version in `package.json`, `package-lock.json` and `.release-please-manifest.json`, plus `CHANGELOG.md`. Running preparation again updates the same pending release PR; it does not publish anything.
3. Review the generated version, changelog and CI. The manifest starts at the existing `2.2.1` release, with its tag commit as the initial history boundary. Historical releases are not recreated. The configuration also includes maintenance and CI changes in release notes.
4. Merge the release PR when publication is intended. [Release](.github/workflows/release-please.yml) finalizes merged release PRs on `main` by creating a GitHub release and `vX.Y.Z` tag. Ordinary feature merges do not prepare a release PR or publish a package.
5. Verify the resulting **Publish** run succeeds. It accepts stable, unmoved tags matching `package.json`, verifies the tagged commit belongs to `main`, then typechecks, formats, builds and publishes to GitHub Packages.
6. Update `@finqo-app/common` and lockfiles in web/mobile and run their relevant checks after the package is available.

### One-time setup and recovery

Before merging these release workflows, configure the repository secret **`RELEASE_PLEASE_TOKEN`** with access to `finqo-app/common`: **Contents: read and write** and **Pull requests: read and write**. The token is used by Release Please to create PRs, releases and tags, so those actions can trigger PR CI and the tag-triggered Publish workflow. The automatic `GITHUB_TOKEN` suppresses those downstream events and is not a substitute. The existing Publish workflow continues using `GITHUB_TOKEN` with `packages: write` for package publication. Secret availability and the configured token's permissions must be verified in repository settings; token values are never committed.

Use **Re-run failed jobs** on the failed Release or Publish run after correcting a transient failure. Do not move or delete a release tag to retry, and do not publish again if the package version already exists. Code or package changes after a release require a new version through another Prepare release PR. Publish has no unrestricted manual entry point.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`. Use `feat!:` / `BREAKING CHANGE:` for major bumps.

## PR pipeline standard

Use one **CI** workflow with directly defined jobs and short names such as Lint, Types, Tests, Build and Package build. Keep major jobs in the caller so GitHub's Summary graph shows their dependencies. Run independent checks in parallel; use `needs` for actual prerequisites. Reuse setup steps only when it simplifies maintenance; do not split the graph into reusable workflows just to shorten YAML. Keep substantial automation in repository scripts.

The final job writes a compact results table and pipeline link to the native Actions Summary. Individual jobs remain visible in PR checks; do not post automated summary comments.

Cancel superseded PR runs, bound jobs with timeouts, cache dependencies, and reuse build artifacts rather than rebuilding for consumers. Production releases, package publication and manual approvals have separate entry points. A successful PR check never publishes a release.

`CI passed` aggregates every mandatory validation job and rejects failures, cancellations and unexpected skips. Configure it as a required check in the default-branch ruleset after its first run; workflow YAML alone does not enforce merge blocking. When replacing existing required check names, add the new gate before removing obsolete names. Keep release-specific direct-push exceptions intact.

This repository runs formatting, TypeScript and package compilation. There is no package-local behavioral test runner; consumer tests remain separate. Package publication remains separate from PR validation and is triggered by a release tag after the generated release PR is merged.

## Branch workflow

Use short-lived task branches and PRs into `main`; keep `main` deployable. A permanent `develop` branch is not part of this workflow.

1. Inspect the current branch and pending changes. Reuse a non-default task branch for an ongoing task; start independent work from current `main` on a descriptive branch such as `feat/transaction-filters`, `fix/login-error` or `chore/agent-instructions`. If pending task work is on `main` or `master`, first create a task branch from the current HEAD without discarding local commits or edits. Preserve unrelated edits and staging; use a separate worktree/checkout when needed. Fetch when available to verify the base, and report when working from an unverified local base.
2. Keep the change focused. Substantial duplication cleanup should have its own PR when it can be separated from the feature. Run the relevant checks documented in this guide.
3. Push the task branch and open a PR against `main` when ready for delivery, or a draft for work still in progress. Include the problem, resulting behavior, checks run and any remaining limitations. For changes spanning repositories, link the separate PRs and state their dependency and release order.
4. Review the final diff yourself, optionally with an agent review. Merge after the relevant checks pass and you are ready for the resulting release effects. Squash merging is the default for a coherent task. Agents leave the merge decision to the owner unless explicitly authorized to merge.
5. Delete the merged task branch when it is no longer needed. Package publication and mobile store submission remain separate release actions, not automatic consequences of completing a PR.

Existing release scripts that create commits, tags or pushes are exceptions only during an explicitly requested release. Read their documented effects and verify the intended source revision first. Do not weaken branch protections or bypass rejected pushes; reconcile the release route with the repository's protections. This workflow does not itself configure GitHub protections or add a second-reviewer requirement for the sole owner.

## Repository-owned agent workflows

See [AGENTS.md](AGENTS.md) for durable constraints. Canonical local skills:

- [finqo-publish-common](.agents/skills/finqo-publish-common/SKILL.md)
- [finqo-shared-testing](.agents/skills/finqo-shared-testing/SKILL.md)
