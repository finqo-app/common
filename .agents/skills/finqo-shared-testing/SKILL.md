---
name: finqo-shared-testing
description: Validate finqo-shared common utilities, public exports, and consumer behavior coverage for number, currency, date, and validation changes; identify the absence of a local test runner.
---

# Test shared utility changes

Read [package scripts](../../../package.json), [CONTRIBUTING.md](../../../CONTRIBUTING.md), and the changed module. The package has no local test runner or `test` script. Current automated checks are TypeScript, Prettier, and build; behavior tests are maintained in consuming applications.

```sh
npm run typecheck
npm run lint
npm run build
```

Node 20 matches the [publish workflow](../../../.github/workflows/publish.yml). These commands verify types, formatting, and output, not utility correctness. Inspect the public barrel in [src/index.ts](../../../src/index.ts); test through the exported API where possible. `dist/` is generated output. Do not add runtime dependencies, UI, or Finqo domain behavior to this pure utility package.

## Choose meaningful examples

- [Numbers](../../../src/number.ts): distinguish editable display text from raw decimal values; cover empty and partial input, decimal/group separators, zero, precision limits, locale changes, and parsing invalid input according to the actual contract.
- [Currency](../../../src/currency.ts): locale/currency combinations, currencies with different decimal precision, and fallback behavior. Be explicit about Unicode separators and the runtime's Intl data when asserting formatted strings.
- [Dates](../../../src/date.ts): date-only local calendar values versus UTC instants, invalid dates, timezone/day boundaries, and explicit IANA zones. Control the clock for functions that use the current time; restore it after each case.
- [Validation](../../../src/validation.ts): boundary lengths, valid/invalid values, and the actual exported validator semantics. Do not silently tighten behavior as part of a test task.

Use small input/output tables with fixed fixtures. A useful regression test fails for the reported bug and checks the intended public result, rather than repeating the implementation.

## Consumer verification

When a web checkout is available, inspect its `src/shared/lib/{number,currency,date}.test.ts` suites and wrappers as concrete starting points; resolve their imports before claiming they test common. Run that repository's testing skill and verify it resolves the candidate package, not an older registry build. A test against a copied utility or old installed package does not validate this change. Mobile has its own Jest setup; do not copy web DOM helpers there.

Do not assume sibling checkouts or an existing package-linking harness. Report missing candidate consumer coverage and the handoff needed. If a local suite is requested, introduce its runner explicitly as implementation work; documenting this skill does not install one. Do not use publication to validate the candidate or run `npm publish` locally.
