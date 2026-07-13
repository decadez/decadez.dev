import type { ComponentProps } from "react";
import {
  MDXBlockquote,
  MDXHeading,
  MDXInlineCode,
  MDXLink,
  MDXList,
  MDXListItem,
  MDXParagraph,
  MDXPre,
} from "./typography";
import { MDXCallout } from "./callout";
import { MDXSandbox } from "./sandbox";

export const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => <MDXHeading level={1} {...props} />,
  h2: (props: ComponentProps<"h2">) => <MDXHeading level={2} {...props} />,
  h3: (props: ComponentProps<"h3">) => <MDXHeading level={3} {...props} />,
  h4: (props: ComponentProps<"h4">) => <MDXHeading level={4} {...props} />,
  p: MDXParagraph,
  a: MDXLink,
  ul: (props: ComponentProps<"ul">) => <MDXList {...props} />,
  ol: (props: ComponentProps<"ol">) => <MDXList ordered {...props} />,
  li: MDXListItem,
  code: MDXInlineCode,
  pre: MDXPre,
  blockquote: MDXBlockquote,
  Callout: MDXCallout,
  Sandpack: MDXSandbox,
};
