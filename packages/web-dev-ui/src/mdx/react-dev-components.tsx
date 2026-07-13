import {
  Children,
  createContext,
  isValidElement,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Button } from "../button";
import { Card, CardBody } from "../card";
import { Code } from "../code";
import { cx } from "../utils";
import { MDXCallout, type MDXCalloutTone } from "./callout";
import { H2, H3, MDXLink, MDXParagraph } from "./typography";

export type TocItem = {
  url: string;
  text: string;
  depth?: number;
};

export type Toc = TocItem[];

export const TocContext = createContext<Toc>([]);
export const IsInTocContext = createContext(false);
export const LanguagesContext = createContext<string[]>(["JavaScript"]);

export function SimpleCallout({
  type = "note",
  title,
  children,
}: {
  type?: MDXCalloutTone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <MDXCallout tone={type} title={title}>
      {children}
    </MDXCallout>
  );
}

export function ExpandableCallout({
  type = "note",
  title = "Details",
  children,
}: {
  type?: MDXCalloutTone | "wip" | "deprecated" | "canary" | "experimental";
  title?: string;
  children: ReactNode;
}) {
  const tone: MDXCalloutTone =
    type === "wip" || type === "deprecated" || type === "canary"
      ? "warning"
      : type === "experimental"
        ? "tip"
        : type;

  return (
    <details className={cx("ui-mdx-expandable", `ui-mdx-expandable--${tone}`)}>
      <summary>{title}</summary>
      <MDXCallout tone={tone}>{children}</MDXCallout>
    </details>
  );
}

export function ExpandableExample({
  title = "Example",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <details className="ui-mdx-expandable-example" open>
      <summary>{title}</summary>
      <div>{children}</div>
    </details>
  );
}

export function Intro({ children }: { children: ReactNode }) {
  return <div className="ui-mdx-intro">{children}</div>;
}

export function Recap({ children }: { children: ReactNode }) {
  return (
    <section className="ui-mdx-recap">
      <H2>Recap</H2>
      {children}
    </section>
  );
}

export function PackageImport({ name, path }: { name: string; path?: string }) {
  return (
    <div className="ui-mdx-package-import">
      <Code>{path ? `import { ${name} } from "${path}"` : name}</Code>
    </div>
  );
}

export function TerminalBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="ui-mdx-terminal">
      <code>{children}</code>
    </pre>
  );
}

export function ConsoleLogLine({
  children,
  type = "log",
}: {
  children: ReactNode;
  type?: "log" | "warn" | "error";
}) {
  return (
    <div className={cx("ui-mdx-console-line", `ui-mdx-console-line--${type}`)}>
      <span>{type}</span>
      <code>{children}</code>
    </div>
  );
}

export function ConsoleBlock({ children }: { children: ReactNode }) {
  return <div className="ui-mdx-console">{children}</div>;
}

export function ConsoleBlockMulti({ children }: { children: ReactNode }) {
  return <ConsoleBlock>{children}</ConsoleBlock>;
}

export function BlogCard({
  title,
  description,
  href = "#",
}: {
  title: string;
  description: string;
  href?: string;
}) {
  return (
    <a className="ui-mdx-blog-card" href={href}>
      <strong>{title}</strong>
      <span>{description}</span>
    </a>
  );
}

export function YouWillLearnCard({ children }: { children: ReactNode }) {
  return (
    <Card className="ui-mdx-learn-card">
      <CardBody>
        <H3>You will learn</H3>
        {children}
      </CardBody>
    </Card>
  );
}

export function TeamMember({
  name,
  role,
  imageUrl,
}: {
  name: string;
  role: string;
  imageUrl?: string;
}) {
  return (
    <article className="ui-mdx-team-member">
      {imageUrl ? <img src={imageUrl} alt="" /> : <span aria-hidden="true" />}
      <div>
        <strong>{name}</strong>
        <p>{role}</p>
      </div>
    </article>
  );
}

export function Diagram({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <figure className="ui-mdx-diagram">
      {title ? <figcaption>{title}</figcaption> : null}
      <div>{children}</div>
    </figure>
  );
}

export function DiagramGroup({ children }: { children: ReactNode }) {
  return <div className="ui-mdx-diagram-group">{children}</div>;
}

export function CodeDiagram({ children }: { children: ReactNode }) {
  return <div className="ui-mdx-code-diagram">{children}</div>;
}

export function ErrorDecoder({
  code,
  message,
}: {
  code: string;
  message: string;
}) {
  return (
    <MDXCallout tone="danger" title={`Error ${code}`}>
      <MDXParagraph>{message}</MDXParagraph>
    </MDXCallout>
  );
}

export function Challenge({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="ui-mdx-challenge">
      <H3>{title}</H3>
      {children}
    </section>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return (
    <details className="ui-mdx-hint">
      <summary>Hint</summary>
      <div>{children}</div>
    </details>
  );
}

export function Solution({ children }: { children: ReactNode }) {
  return (
    <details className="ui-mdx-solution">
      <summary>Solution</summary>
      <div>{children}</div>
    </details>
  );
}

export function ChallengeNavigation({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="ui-mdx-challenge-nav">
      <Button variant="ghost" disabled={current <= 1}>
        Previous
      </Button>
      <span>
        {current} / {total}
      </span>
      <Button variant="ghost" disabled={current >= total}>
        Next
      </Button>
    </div>
  );
}

export function Challenges({ children }: { children: ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? null;

  return (
    <div className="ui-mdx-challenges">
      <div className="ui-mdx-challenge-tabs">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => setActiveIndex(index)}
          >
            Challenge {index + 1}
          </button>
        ))}
      </div>
      {active}
      <ChallengeNavigation current={activeIndex + 1} total={items.length} />
    </div>
  );
}

export function MDXComponentCoverageList({
  names,
}: {
  names: readonly string[];
}) {
  const sortedNames = useMemo(() => [...names].sort(), [names]);

  return (
    <div className="ui-mdx-coverage-list">
      {sortedNames.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </div>
  );
}

export function ReadBlogPost({ path = "#" }: { path?: string }) {
  return <MDXLink href={path}>Read Post</MDXLink>;
}

export function LearnMore({
  path = "#",
  children,
}: {
  path?: string;
  children: ReactNode;
}) {
  return (
    <Card className="ui-mdx-learn-more">
      <CardBody>
        {children}
        <ReadBlogPost path={path} />
      </CardBody>
    </Card>
  );
}
