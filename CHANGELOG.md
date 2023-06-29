# Changelog

All notable changes to this project will be documented in this file.

## [1.0.4] - 2023-06-29

mobile text inputs were breaking form boundry

### Fixed

- added container divs around inputs
- sets `input width: 100%` and container `flex: 2 1 auto`

## [1.0.3] - 2023-06-28

Spotted bug in chrome where users coming back to the site cannot get past loading screen

- deploying this version to fix console errors around manifest

### Fixed

- site.manifest references from "/" to "./"

## [1.0.2] - 2023-06-23

### Added

- added eslint config
- going with semicolons for the project

### Fixed

- better drag drop bugfix

## [1.0.1] - 2023-06-23

### Changed

- using `firebaseConfig` name on config const

### Fixed

- [Drag and drop was causing first setlist to be re-selected](https://trello.com/c/q4s8CWOE)
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
