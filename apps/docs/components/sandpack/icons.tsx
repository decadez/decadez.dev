export function IconChevron({
  displayDirection = "down",
  className = "",
}: {
  displayDirection?: "up" | "down" | "left" | "right" | "end";
  className?: string;
}) {
  const rotation =
    displayDirection === "up"
      ? "rotate(180deg)"
      : displayDirection === "left"
        ? "rotate(90deg)"
        : displayDirection === "right" || displayDirection === "end"
          ? "rotate(-90deg)"
          : undefined;

  return (
    <svg
      aria-hidden="true"
      className={className}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      style={{ transform: rotation }}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function IconClose({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="16"
      height="16"
      viewBox="0 0 20 20"
    >
      <path
        d="m5 5 10 10M15 5 5 15"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function IconDownload({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="16"
      height="16"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 3v9m0 0 4-4m-4 4L6 8M4 16h12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
