---
name: finqo-publish-common
description: Prepare or publish a version of @finqo-app/common from finqo-shared when asked to release common, publish common, or bump the common package.
---

# Release common utilities

Follow [CONTRIBUTING.md](../../../CONTRIBUTING.md#releasing) and the [publish workflow](../../../.github/workflows/publish.yml) from this repository root.

1. Check the utility boundary before release: pure generic formatting, parsing and validation only. Domain enums, API payloads, brand tokens and workflows belong in consuming apps. Keep runtime dependencies empty. Export new modules through `src/index.ts`.
2. Run `npm run typecheck`, `npm run lint` and `npm run build`. Inspect `dist/` for expected exports and stale output; do not hand-edit compiled files. Utility behavior tests currently live in consumers, so identify affected consumer tests when behavior changes.
3. Review semver (fix → patch, compatible new export → minor, removed/renamed export → major), package metadata and CHANGELOG together. Keep existing lockfile metadata consistent. Stage only the intended release files, preserving unrelated work.
4. Prepare the release on a task branch and deliver it through a PR into `main` following [the branch workflow](../../../CONTRIBUTING.md#branch-workflow). Leave merging to the owner unless already authorized. For an authorized publication after merge, verify the merged release commit and tag that commit with `vX.Y.Z`, then push the tag. Publishing is tag-triggered in GitHub Actions; do not run `npm publish` locally. Verify workflow success rather than assuming a fixed completion time.
5. Hand off the published version and behavior changes to web/mobile. Each consumer updates its dependency and lockfile and runs its own relevant checks. Report missing consumer checkouts rather than assuming sibling folders.
