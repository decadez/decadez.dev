## Quick start

Install the package, import the stylesheet once, and compose the components you need.

```sh
pnpm add @decadez/web-dev-ui
```

## Stylesheet

Import the stylesheet near your app root. It includes component CSS, the site font, and dark mode selectors.

```ts
import "@decadez/web-dev-ui/styles.css";
```

## Dark mode

Components use a parent `dark` class to switch themes. This keeps the package compatible with app-level theme systems.

## Package shape

The package contains primitives for actions, cards, badges, code, layout helpers, and the site navigation composition used by decadez.dev.
