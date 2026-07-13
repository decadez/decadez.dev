## When to use

Use `Code` for inline tokens such as package names, props, and commands. Use `CodeBlock` for copyable multi-line examples.

## Code demo

```tsx sandbox
import { Code, CodeBlock } from "@decadez/web-dev-ui";
import "@decadez/web-dev-ui/styles.css";

export default function App() {
  return (
    <main className="demo">
      <div className="demo-card">
        <p>
          Import styles from <Code>@decadez/web-dev-ui/styles.css</Code>.
        </p>
        <CodeBlock>{`import { Code, CodeBlock } from "@decadez/web-dev-ui";`}</CodeBlock>
      </div>
    </main>
  );
}
```

## API

| Prop        | Type        | Default | Description                               |
| ----------- | ----------- | ------- | ----------------------------------------- |
| `children`  | `ReactNode` | -       | Inline code text or block code source.    |
| `className` | `string`    | -       | Additional class names for custom layout. |
