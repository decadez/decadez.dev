import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { Code, CodeBlock as BaseCodeBlock } from "../code";
import { cx } from "../utils";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5;
};

export function MDXHeading({
  level = 2,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5";

  return (
    <Tag
      className={cx("ui-mdx-heading", `ui-mdx-heading--h${level}`, className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function MDXParagraph({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("ui-mdx-paragraph", className)} {...props} />;
}

export function MDXList({
  ordered = false,
  className,
  ...props
}: HTMLAttributes<HTMLUListElement | HTMLOListElement> & {
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag
      className={cx(
        "ui-mdx-list",
        ordered ? "ui-mdx-list--ordered" : "ui-mdx-list--unordered",
        className
      )}
      {...props}
    />
  );
}

export function MDXListItem({
  className,
  ...props
}: HTMLAttributes<HTMLLIElement>) {
  return <li className={cx("ui-mdx-list-item", className)} {...props} />;
}

export function MDXLink({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cx("ui-mdx-link", className)} {...props} />;
}

export function MDXInlineCode({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <Code className={className}>{children}</Code>;
}

export function MDXPre({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <BaseCodeBlock className={className}>{children}</BaseCodeBlock>;
}

export function MDXBlockquote({
  className,
  ...props
}: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className={cx("ui-mdx-blockquote", className)} {...props} />
  );
}

export const H1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MDXHeading level={1} {...props} />
);

export const H2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MDXHeading level={2} {...props} />
);

export const H3 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MDXHeading level={3} {...props} />
);

export const H4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MDXHeading level={4} {...props} />
);

export const H5 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MDXHeading level={5} {...props} />
);

export const InlineCode = MDXInlineCode;
export const Link = MDXLink;
