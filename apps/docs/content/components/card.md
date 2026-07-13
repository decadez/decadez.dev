## When to use

Use `Card` to group related content into a quiet surface. Use `variant="plain"` when the surrounding layout already provides structure and the card should be borderless with a transparent background.

## Code demo

```tsx sandbox
import { Card, CardBody } from "@decadez/web-dev-ui";
import "@decadez/web-dev-ui/styles.css";

export default function App() {
  return (
    <main className="demo">
      <Card>
        <CardBody>
          <h2>Default card</h2>
          <p>Use this when content needs a visible surface.</p>
        </CardBody>
      </Card>

      <Card variant="plain">
        <CardBody>
          <h2>Plain card</h2>
          <p>No border and no fill, useful inside structured sections.</p>
        </CardBody>
      </Card>
    </main>
  );
}
```

## API

| Prop        | Type                   | Default     | Description                                    |
| ----------- | ---------------------- | ----------- | ---------------------------------------------- |
| `children`  | `ReactNode`            | -           | Card content.                                  |
| `variant`   | `"default" \| "plain"` | `"default"` | `plain` removes the border, fill, and shadow.  |
| `className` | `string`               | -           | Additional class names for layout and spacing. |
