import { Code, CodeBlock } from "@decadez/web-dev-ui";

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
