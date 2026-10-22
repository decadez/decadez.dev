# CSS animation integration

Import all 43 components from css-animations/packages/react into web-dev-ui/src/animations, preserving scoped styles, geometry, playback, motion preferences and MIT attribution. Keep animations behind dedicated public subpath exports and individual component entries. No new runtime dependencies or duplicate sandbox applications.

Provide a docs catalog that renders one selected animation at a time, with playback controls, source and editor views. Feed local source modules into the isolated editor so the integration is usable before publishing. Validate SSR and catalog completeness, public build entries, package contents and live browser playback before completion.

Generate editor sources as a static JSON asset before docs development/build, and load it only when the editor opens. Keep source text out of initial page props; honor the Pages base path and allow retries after a failed load.
