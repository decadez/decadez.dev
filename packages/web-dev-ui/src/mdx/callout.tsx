import type { HTMLAttributes } from "react";
import { cx } from "../utils";

export type MDXCalloutTone = "note" | "tip" | "warning" | "danger";

export type MDXCalloutProps = HTMLAttributes<HTMLDivElement> & {
  tone?: MDXCalloutTone;
  title?: string;
};

const toneTitles: Record<MDXCalloutTone, string> = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
  danger: "Danger",
};

export function MDXCallout({
  tone = "note",
  title = toneTitles[tone],
  className,
  children,
  ...props
}: MDXCalloutProps) {
  return (
    <aside
      className={cx("ui-mdx-callout", `ui-mdx-callout--${tone}`, className)}
      {...props}
    >
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}
