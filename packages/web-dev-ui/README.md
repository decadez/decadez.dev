# @decadez/web-dev-ui

Reusable React UI, MDX primitives and CSS animation components for decadez.dev.

Import UI from `@decadez/web-dev-ui`, MDX from `@decadez/web-dev-ui/mdx` and the main stylesheet once at your application root.

## Animations

43 self-contained animations adapted from the local componentized yui540/css-animations repository. CSS selectors and keyframes are scoped to each component; images and SVG are embedded. Animation styles do not require the main UI stylesheet.

```tsx
import { WalkingCatAnimation } from "@decadez/web-dev-ui/animations/walking-cat";

export function Example() {
  return <WalkingCatAnimation size={240} aria-label="Walking cat" />;
}
```

The `@decadez/web-dev-ui/animations` entry exports all animations, `AnimationProvider`, `useAnimation`, theme defaults and `animationCatalog`. Individual component entries support imports without the full catalog. Theme and hooks are also available under `animations/theme` and `animations/hooks`.

All components support size, background, paused, replayKey, reducedMotion, nonce and native div attributes/ref. `AnimationProvider` supplies defaults; explicit component props take priority. `useAnimation()` supplies play, pause, toggle and replay functions and `animationProps`. Unlabeled components are decorative; an accessible label supplies image semantics. Motion follows system preferences by default.

The original MIT notice is included in `licenses/css-animations.LICENSE`. Catalog source paths refer to the upstream repository. The imported component source is maintained in `src/animations`; docs consumes that source directly for HMR and isolated editor examples.
