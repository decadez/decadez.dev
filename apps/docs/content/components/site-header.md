## When to use

Use `SiteHeader` when a page needs the decadez brand mark, section navigation, theme switching, and a responsive menu in one composition.

## Code demo

```tsx sandbox
import { SiteHeader } from "@decadez/web-dev-ui";
import "@decadez/web-dev-ui/styles.css";

export default function App() {
  return (
    <main className="demo">
      <SiteHeader
        brandHref="#"
        brandLabel="decadez"
        brandAccent=".dev"
        navLinks={[
          { url: "#projects", text: "Projects" },
          { url: "#blog", text: "Blog" },
          { url: "#contact", text: "Contact" },
        ]}
        currentSection="projects"
        theme="light"
      />
    </main>
  );
}
```

## API

| Prop             | Type                              | Default             | Description                                               |
| ---------------- | --------------------------------- | ------------------- | --------------------------------------------------------- |
| `brandHref`      | `string`                          | `"#"`               | Destination for the brand link.                           |
| `brandLogo`      | `ReactNode`                       | `<RiderKickLogo />` | Optional logo node replacing the default UI package logo. |
| `brandLabel`     | `string`                          | -                   | Main brand text.                                          |
| `brandAccent`    | `string`                          | -                   | Optional accent text after the brand label.               |
| `navLinks`       | `{ url: string; text: string }[]` | `[]`                | Navigation links rendered in the header.                  |
| `currentSection` | `string`                          | -                   | Active section id.                                        |
| `theme`          | `"light" \| "dark"`               | `"light"`           | Theme state used by the toggle.                           |
| `onThemeToggle`  | `() => void`                      | -                   | Callback fired by the theme button.                       |
