import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { CodeBlock } from "@decadez/web-dev-ui/mdx";

import { sandboxStyles } from "@/utils/sandbox-styles";

const examples = {
  button: dynamic(() => import("../examples/button")),
  card: dynamic(() => import("../examples/card")),
  code: dynamic(() => import("../examples/code")),
};
const Editor = dynamic(
  () => import("./Sandbox").then((module) => module.MDXSandbox),
  { ssr: false, loading: () => <p role="status">Loading editor…</p> }
);

class PreviewBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p role="alert">This example could not render. Reset to try again.</p>
    ) : (
      this.props.children
    );
  }
}

export function ExamplePreview({
  name,
  code,
  preview,
  sandboxFiles = {},
  loadSandboxFiles,
}: {
  name: string;
  code: string;
  preview?: ReactNode;
  sandboxFiles?: Record<string, string>;
  loadSandboxFiles?: () => Promise<Record<string, string>>;
}) {
  const [view, setView] = useState<"preview" | "source" | "edit">("preview");
  const [revision, setRevision] = useState(0);
  const [loadedFiles, setLoadedFiles] = useState<Record<string, string> | null>(
    null
  );
  const [loadFailed, setLoadFailed] = useState(false);
  useEffect(() => {
    if (view !== "edit" || !loadSandboxFiles) return;
    let active = true;
    setLoadFailed(false);
    loadSandboxFiles().then(
      (files) => {
        if (active) setLoadedFiles(files);
      },
      () => {
        if (active) setLoadFailed(true);
      }
    );
    return () => {
      active = false;
    };
  }, [view, revision, loadSandboxFiles]);
  const Example = examples[name as keyof typeof examples];
  if (!Example && !preview) return <p role="alert">Unknown example: {name}</p>;

  return (
    <div className="docs-example-preview">
      <div className="docs-preview-toolbar" aria-label={`${name} example`}>
        {(["preview", "source", "edit"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={view === value}
            onClick={() => setView(value)}
          >
            {value === "preview"
              ? "Preview"
              : value === "source"
                ? "Source"
                : "Edit & run"}
          </button>
        ))}
        <button type="button" onClick={() => setRevision((value) => value + 1)}>
          Reset
        </button>
      </div>
      {view === "preview" && (
        <div className="docs-preview-stage">
          <PreviewBoundary key={revision}>
            {preview ?? (Example ? <Example /> : null)}
          </PreviewBoundary>
        </div>
      )}
      {view === "source" && (
        <CodeBlock className="language-tsx" noMargin>
          {code}
        </CodeBlock>
      )}
      {view === "edit" &&
        (loadFailed ? (
          <p role="alert">Could not load editor sources. Reset to try again.</p>
        ) : loadSandboxFiles && !loadedFiles ? (
          <p role="status">Loading editor sources…</p>
        ) : (
          <Editor
            key={revision}
            activeFile="/src/App.tsx"
            files={{
              ...sandboxFiles,
              ...loadedFiles,
              "/src/styles.css": sandboxStyles,
              "/src/App.tsx": `import "@decadez/web-dev-ui/styles.css";\n${code}`,
            }}
          />
        ))}
    </div>
  );
}
