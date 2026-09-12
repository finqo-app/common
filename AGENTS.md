# Repository instructions

TypeScript package `@finqo-app/common`, using Node 20 in CI. Pure generic utilities only: no Finqo domain enums, API payloads, branding or runtime dependencies. Source modules live in `src/` and are exported through `src/index.ts`; `dist/` is generated build output.

Run `npm run typecheck`, `npm run lint` and `npm run build`. Utility behavior tests currently live in consumers. Publishing uses the existing tag-triggered workflow; do not run `npm publish` locally.

## Branches and delivery

For implementation and documentation changes, inspect the current branch, status and staged diff before editing. Continue an existing task branch for the same task, never `main` or `master`; otherwise use a short-lived task branch based on current `main` (for example `feat/transaction-filters`, `fix/login-error` or `chore/agent-instructions`). If ongoing task work is already on `main` or `master`, create a task branch from the current HEAD before further edits, preserving local commits, pending edits and staging. Do not rewrite the base to discard that work. Do not reset, discard, automatically stash or include unrelated work to obtain a clean tree. When unrelated work prevents isolation, use a separate worktree/checkout; report any unresolved base or ownership ambiguity.

Keep one coherent change per branch and PR. Follow [the branch workflow](CONTRIBUTING.md#branch-workflow) for validation and delivery. Prepare a reviewable diff and checks, and open/update a PR when delivery is requested and access permits. Leave merging to the owner unless the session explicitly authorizes it. Do not push ordinary changes directly to `main`. Coordinate cross-repository changes with separate branches/PRs and an explicit dependency/release order.

Explicitly requested release operations may use the existing documented script's commits, tags and pushes within that release scope; ordinary feature work does not authorize publication. Inspect the target revision and script effects first. Do not change branch protection or bypass a rejected push to make a release proceed.

Human-facing procedures: [CONTRIBUTING.md](CONTRIBUTING.md). Run commands from this repository root. Upstream/downstream work is a handoff; report missing checkouts or contracts rather than assuming sibling folders exist.

Project skills have their canonical editable source in `.agents/skills/`. Load only a matching workflow:

- [finqo-publish-common](.agents/skills/finqo-publish-common/SKILL.md)

Review these instructions and relevant skills when documented commands or patterns change. Global/corporate agent configuration is outside repository work. Maintain shared skills only in `.agents/skills/` and durable constraints in this file; do not duplicate them in agent-specific adapters.
