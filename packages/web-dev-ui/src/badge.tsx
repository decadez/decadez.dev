import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

export type BadgeProps = {
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span className={cx("ui-badge", className)} {...props}>
      {children}
    </span>
  );
}
