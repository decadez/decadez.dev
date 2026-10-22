interface ErrorType {
  title?: string;
  message: string;
  column?: number;
  line?: number;
  path?: string;
}

export function ErrorMessage({ error, ...props }: { error: ErrorType }) {
  const { message, title } = error;

  return (
    <div className="ui-sandpack-error" {...props}>
      <h2>{title || "Error"}</h2>
      <pre>{message}</pre>
    </div>
  );
}
