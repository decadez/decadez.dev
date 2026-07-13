import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

export type CodeProps = {
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function Code({ className, children, ...props }: CodeProps) {
  return (
    <code className={cx("ui-code", className)} {...props}>
      {children}
    </code>
  );
}

export function CodeBlock({ className, children, ...props }: CodeProps) {
  return (
    <pre className={cx("ui-code-block", className)} {...props}>
      <code>{children}</code>
    </pre>
  );
}
