## Live catalog

Choose from all 43 animations. Each preview renders the local package source and supports pause, play and replay. Source and Edit & run use the selected component; the editor includes local sources so it works before the next npm release.

<AnimationGallery />

## Use in your app

Import an individual component to keep the animation entry separate from ordinary UI. Animations include their own scoped styles and embedded assets; no additional stylesheet or asset deployment is needed for them.

```tsx
import { WalkingCatAnimation } from "@decadez/web-dev-ui/animations/walking-cat";

export function Illustration() {
  return <WalkingCatAnimation size={240} aria-label="Walking cat" />;
}
```

## Shared defaults

`AnimationProvider` supplies size, background, playback and motion preferences. Individual props override those defaults. `useAnimation()` provides play, pause, toggle and replay controls plus `animationProps`.

```tsx
import {
  AnimationProvider,
  LoadingOrbitAnimation,
} from "@decadez/web-dev-ui/animations";

export function Loading() {
  return (
    <AnimationProvider value={{ size: 160, reducedMotion: "system" }}>
      <LoadingOrbitAnimation aria-label="Loading" />
    </AnimationProvider>
  );
}
```

## API

| Prop            | Type                               | Default               | Description                                                            |
| --------------- | ---------------------------------- | --------------------- | ---------------------------------------------------------------------- |
| `size`          | `number \| string`                 | Original canvas width | Responsive display width; keeps the canvas aspect ratio.               |
| `background`    | `CSSProperties["backgroundColor"]` | Original background   | Overrides the animation surface.                                       |
| `paused`        | `boolean`                          | `false`               | Pauses CSS animations, pseudo-elements and inline SVG animations.      |
| `replayKey`     | `string \| number`                 | `0`                   | Change to restart the internal scene.                                  |
| `reducedMotion` | `"system" \| "always" \| "never"`  | `"system"`            | Honors system preferences by default.                                  |
| `nonce`         | `string`                           | -                     | CSP nonce for the scoped style tag.                                    |
| `aria-label`    | `string`                           | -                     | Labels the animation as an image; unlabeled animations are decorative. |

## Attribution

Adapted from [yui540/css-animations](https://github.com/yui540/css-animations) through the local componentized React package. Original source paths remain available in `animationCatalog`; the MIT copyright and license ship in `licenses/css-animations.LICENSE`.
