## When to use

Use `Button` for in-page actions and `LinkButton` when the control navigates to another URL. Choose `outline` or `ghost` when the action should be secondary.

## Code demo

<ExamplePreview name="button" />

## API

| Prop       | Type                              | Default   | Description                            |
| ---------- | --------------------------------- | --------- | -------------------------------------- |
| `children` | `ReactNode`                       | -         | Button label or custom inline content. |
| `variant`  | `"solid" \| "outline" \| "ghost"` | `"solid"` | Visual emphasis of the button.         |
| `size`     | `"sm" \| "md"`                    | `"md"`    | Control height and text scale.         |
| `href`     | `string`                          | -         | `LinkButton` destination URL.          |
