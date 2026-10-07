---
name: finqo-publish-common
description: Prepare or publish a version of @finqo-app/common from finqo-shared when asked to release common, publish common, or bump the common package.
---

# Release common utilities

Follow [CONTRIBUTING.md](../../../CONTRIBUTING.md#releasing) and the [publish workflow](../../../.github/workflows/publish.yml) from this repository root.

1. Check the utility boundary before release: pure generic formatting, parsing and validation only. Domain enums, API payloads, brand tokens and workflows belong in consuming apps. Keep runtime dependencies empty. Export new modules through `src/index.ts`.
2. Run `npm run typecheck`, `npm run lint` and `npm run build`. Inspect `dist/` for expected exports and stale output; do not hand-edit compiled files. Utility behavior tests currently live in consumers, so identify affected consumer tests when behavior changes.
3. Review semver (fix → patch, compatible new export → minor, removed/renamed export → major), package metadata and CHANGELOG together. Deliver utility changes through reviewed PRs into `main`; do not manually bump release files for the normal flow. Release Please's node strategy updates the package, lockfile, manifest and changelog together.
4. For requested release preparation, verify `RELEASE_PLEASE_TOKEN` is configured with Contents and Pull requests write access, then run **Prepare release** from `main`. Review its generated PR and CI; repeated preparation updates the pending release PR without publishing. Leave merging to the owner unless publication and merging are authorized: merging this release PR creates the GitHub release/tag and starts Publish automatically. Ordinary feature merges do not publish. Verify both Release and Publish success rather than assuming a fixed completion time. Publish validates stable immutable tags, matching package version and ancestry on `main`; it uses `GITHUB_TOKEN` for GitHub Packages. For transient failures rerun failed jobs; never move tags or republish an existing version. Do not run `npm publish` locally.
5. Hand off the published version and behavior changes to web/mobile. Each consumer updates its dependency and lockfile and runs its own relevant checks. Report missing consumer checkouts rather than assuming sibling folders.

For repository-specific test boundaries, fixtures, commands, and verification gaps, use [finqo-shared-testing](../finqo-shared-testing/SKILL.md).
