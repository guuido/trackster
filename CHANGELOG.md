# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-29
### Added
- Text display options for progress bar through `textMode` config:
  - `percentage`: shows completion as percentage
  - `count`: shows completion as "n/m"
  - `none`: no text display (default)

### Changed
- Made `fillChar` parameter optional in progress bar configuration

## [1.0.0] - 2025-01-28
### Added
- Initial release
- Basic CLI progress bar functionality
- Customizable progress bar configuration:
  - Customizable fill character
  - Color options
  - Customizable length
  - Toggle for boundary brackets
  - Customizable empty character
