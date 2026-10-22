import { Button, LinkButton } from "@decadez/web-dev-ui";

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
