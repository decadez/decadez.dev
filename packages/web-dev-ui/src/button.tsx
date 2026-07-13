import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

export type ButtonProps = {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={cx(
        "ui-button",
        `ui-button--${variant}`,
        `ui-button--${size}`,
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
