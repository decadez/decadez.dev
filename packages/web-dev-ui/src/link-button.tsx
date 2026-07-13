import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

export type LinkButtonProps = {
  href: string;
  targetBlank?: boolean;
  outline?: boolean;
  className?: string;
  basePath?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function LinkButton({
  href,
  targetBlank = false,
  outline = false,
  className = "",
  basePath = "",
  children,
  ...anchorProps
}: LinkButtonProps) {
  const resolvedHref =
    href.startsWith("/") && !href.startsWith("//")
      ? `${basePath}${href}`
      : href;

  return (
    <a
      role="button"
      className={cx(
        "ui-button",
        outline ? "ui-button--outline" : "ui-button--solid",
        "ui-button--md",
        className
      )}
      href={resolvedHref}
      target={targetBlank ? "_blank" : "_self"}
      {...anchorProps}
    >
      {children}
    </a>
  );
}
