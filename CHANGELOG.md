# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2023-06-23

### Changed

- using `firebaseConfig` name on config const

### Fixed

- Drag and drop was causing first setlist to be re-selected
- Replaced `react-beautiful-dnd` with [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd)

## [1.0.0] - 2023-06-23

Inital public URL release

### Added

- Initial release to public URL on github pages
- Using `useEffect` to initialize anonymous guest user
- Drag Drop Setlist Editing UI

## [0.0.0] - 2023-06-21

Initial Commit

### Added

- Guest Authentication
  - App starts in guest Readonly mode for selecting and viewing setlists
- Display setlists page in readme mode for guests
- Display setlist color-coded by singer or member instrument
- Auth protected songs page admin
- Integrated design with Mike Slater sites
- Logged in users can directly edit setlist page
- Initial dependencies (vite, beautiful-dnd, react, firebase, vite, beautiful-dnd)
- Hardcoded instruments and members for initial app
