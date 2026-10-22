## When to use

Use `Card` to group related content into a quiet surface. Use `variant="plain"` when the surrounding layout already provides structure and the card should be borderless with a transparent background.

## Code demo

<ExamplePreview name="card" />

## API

| Prop        | Type                   | Default     | Description                                    |
| ----------- | ---------------------- | ----------- | ---------------------------------------------- |
| `children`  | `ReactNode`            | -           | Card content.                                  |
| `variant`   | `"default" \| "plain"` | `"default"` | `plain` removes the border, fill, and shadow.  |
| `className` | `string`               | -           | Additional class names for layout and spacing. |
