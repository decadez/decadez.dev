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
      className={`ml-2 hidden md:inline-flex items-center gap-1.5 text-xs text-bgdark/70 dark:text-bglight/75 ${className}`}
      title={text}
      aria-label={text}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isOk ? "bg-green-500" : "bg-gray-400"
        }`}
      />
      {showText && <span>{text}</span>}
    </span>
  );
}
