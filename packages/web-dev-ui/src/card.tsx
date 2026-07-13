import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

export type CardProps = {
  className?: string;
  children: ReactNode;
  variant?: "default" | "plain";
} & HTMLAttributes<HTMLDivElement>;

export type CardSectionProps = {
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Card({
  className,
  children,
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cx(
        "ui-card",
        variant === "plain" && "ui-card--plain",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: CardSectionProps) {
  return (
    <div className={cx("ui-card__header", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: CardSectionProps) {
  return (
    <div className={cx("ui-card__body", className)} {...props}>
      {children}
    </div>
  );
}
