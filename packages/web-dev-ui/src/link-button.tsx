import type { AnchorHTMLAttributes, ReactNode } from "react";

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
      className={`${
        outline
          ? "border border-marrsgreen hover:bg-marrsgreen dark:border-carrigreen dark:hover:bg-carrigreen text-marrsgreen hover:text-cardlight dark:text-carrigreen dark:hover:text-carddark transition"
          : "bg-marrsgreen hover:bg-marrslight active:bg-marrsdark dark:hover:bg-carrilight dark:active:bg-carridark dark:bg-carrigreen text-bglight dark:text-bgdark"
      } py-2 px-3 rounded lg:text-xl ${className} outline-marrsgreen dark:outline-carrigreen focus-visible:outline-double outline-offset-2`}
      href={resolvedHref}
      target={targetBlank ? "_blank" : "_self"}
      {...anchorProps}
    >
      {children}
    </a>
  );
}
