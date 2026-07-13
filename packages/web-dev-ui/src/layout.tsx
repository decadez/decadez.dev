import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

export type ContainerProps = {
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cx("ui-container", className)} {...props}>
      {children}
    </div>
  );
}

export type SectionProps = {
  tone?: "default" | "raised" | "blog";
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function Section({
  tone = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cx("ui-section", `ui-section--${tone}`, className)}
      {...props}
    >
      {children}
    </section>
  );
}

export type HeadingProps = {
  level?: 1 | 2 | 3;
  accent?: boolean;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

export function Heading({
  level = 2,
  accent = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = `h${level}` as "h1" | "h2" | "h3";

  return (
    <Component
      className={cx("ui-heading", accent && "ui-heading--accent", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
