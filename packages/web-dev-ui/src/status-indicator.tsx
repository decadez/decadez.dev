export type StatusIndicatorState = "idle" | "ok" | "down";

export type StatusIndicatorProps = {
  status: StatusIndicatorState;
  label?: string;
  className?: string;
  showText?: boolean;
};

export function StatusIndicator({
  status,
  label,
  className = "",
  showText = false,
}: StatusIndicatorProps) {
  const isOk = status === "ok";
  const text = label ?? (isOk ? "API connected" : "API unavailable");

  return (
    <span
      className={`ui-status-indicator ${className}`}
      title={text}
      aria-label={text}
    >
      <span
        className={`ui-status-indicator__dot ${
          isOk ? "is-ok" : "is-unavailable"
        }`}
      />
      {showText && <span>{text}</span>}
    </span>
  );
}
