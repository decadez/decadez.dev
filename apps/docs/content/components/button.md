## When to use

Use `Button` for in-page actions and `LinkButton` when the control navigates to another URL. Choose `outline` or `ghost` when the action should be secondary.

## Code demo

```tsx sandbox
import { Button, LinkButton } from "@decadez/web-dev-ui";
import "@decadez/web-dev-ui/styles.css";

export default function App() {
  return (
    <main className="demo">
      <div className="demo-row">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <LinkButton href="https://decadez.github.io/decadez.dev/">
          Visit site
        </LinkButton>
      </div>
    </main>
  );
}
```

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Button label or custom inline content. |
| `variant` | `"solid" \| "outline" \| "ghost"` | `"solid"` | Visual emphasis of the button. |
| `size` | `"sm" \| "md"` | `"md"` | Control height and text scale. |
| `href` | `string` | - | `LinkButton` destination URL. |
