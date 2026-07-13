export function OpenInTypeScriptPlaygroundButton({
  content,
}: {
  content: string;
}) {
  const href = `https://www.typescriptlang.org/play#code/${encodeURIComponent(content)}`;

  return (
    <a
      className="ui-sandpack-action"
      href={href}
      rel="noreferrer"
      target="_blank"
      title="Open in TypeScript Playground"
    >
      <span aria-hidden="true" className="ui-sandpack-action-icon">
        TS
      </span>
      <span>Playground</span>
    </a>
  );
}
