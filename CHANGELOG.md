# Changelog

All notable changes to `@finqo-app/common` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0]

### Changed

- **Breaking:** tightened scope to pure utilities only. Removed `period`, `notifications`, and `getCurrencyDotColor` — these carried Finqo domain knowledge and now live in each app.
- Renamed the package from `@finqo-app/finqo-shared` to `@finqo-app/common`.

## [1.0.0]

### Added

- Initial release: currency, number/amount, date, and validation utilities (broader scope, since narrowed in 2.0.0).

[Unreleased]: https://github.com/finqo-app/common/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/finqo-app/common/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/finqo-app/common/releases/tag/v1.0.0
