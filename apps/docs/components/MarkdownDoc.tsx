import type { ReactNode } from "react";
import {
  CodeBlock,
  H2,
  H3,
  InlineCode,
  Link,
  MDXParagraph,
  MDXSandbox,
} from "@decadez/web-dev-ui/mdx";
import { MdxComponentGallery } from "./MdxComponentGallery";
import { getHeadingId } from "@/utils/headings";

type Token =
  | { type: "heading"; depth: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "component"; name: string }
  | { type: "code"; language: string; meta: string; code: string }
  | { type: "table"; rows: string[][] };

export function MarkdownDoc({ source }: { source: string }) {
  const tokens = parseMarkdown(source);
  const sections: ReactNode[] = [];
  let currentSection: ReactNode[] = [];
  let currentHeading: { text: string; id: string } | null = null;

  function flushSection() {
    if (!currentHeading) {
      sections.push(...currentSection);
      currentSection = [];
      return;
    }

    sections.push(
      <section
        key={currentHeading.id}
        id={currentHeading.id}
        className="docs-section"
      >
        <H2>{currentHeading.text}</H2>
        {currentSection}
      </section>
    );
    currentSection = [];
  }

  tokens.forEach((token, index) => {
    if (token.type === "heading" && token.depth === 2) {
      flushSection();
      currentHeading = { text: token.text, id: getHeadingId(token.text) };
      return;
    }

    currentSection.push(renderToken(token, index));
  });

  flushSection();

  return <>{sections}</>;
}

function renderToken(token: Token, index: number) {
  switch (token.type) {
    case "heading":
      return <H3 key={index}>{token.text}</H3>;
    case "paragraph":
      return (
        <MDXParagraph key={index}>{renderInline(token.text)}</MDXParagraph>
      );
    case "component":
      if (token.name === "MdxComponentGallery") {
        return <MdxComponentGallery key={index} />;
      }

      return null;
    case "code":
      if (token.meta.includes("sandbox")) {
        return (
          <MDXSandbox
            key={index}
            activeFile="/src/App.js"
            files={{
              "/src/App.js": token.code,
              "/src/styles.css": sandboxStyles,
              ...sandboxPackageFiles,
            }}
          />
        );
      }

      return <CodeBlock key={index}>{token.code}</CodeBlock>;
    case "table":
      return (
        <div key={index} className="ui-mdx-table-wrap">
          <table className="ui-mdx-table">
            <thead>
              <tr>
                {token.rows[0].map((cell) => (
                  <th key={cell}>{renderInline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {token.rows.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`}>
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

function parseMarkdown(source: string): Token[] {
  const lines = source.trim().split("\n");
  const tokens: Token[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);
    if (headingMatch) {
      tokens.push({
        type: "heading",
        depth: headingMatch[1].length as 2 | 3,
        text: headingMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    const codeMatch = line.match(/^```(\w+)?(?:\s+(.+))?$/);
    if (codeMatch) {
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && lines[index] !== "```") {
        codeLines.push(lines[index]);
        index += 1;
      }

      tokens.push({
        type: "code",
        language: codeMatch[1] ?? "",
        meta: codeMatch[2] ?? "",
        code: codeLines.join("\n"),
      });
      index += 1;
      continue;
    }

    const componentMatch = line.match(/^<([A-Z][A-Za-z0-9]*)\s*\/>$/);
    if (componentMatch) {
      tokens.push({ type: "component", name: componentMatch[1] });
      index += 1;
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];

      while (index < lines.length && lines[index].startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }

      tokens.push({
        type: "table",
        rows: tableLines
          .filter((row, rowIndex) => rowIndex !== 1)
          .map(splitTableRow),
      });
      continue;
    }

    const paragraphLines = [line.trim()];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("#") &&
      !lines[index].startsWith("```") &&
      !lines[index].startsWith("|")
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    tokens.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return tokens;
}

function splitTableRow(row: string) {
  return row
    .replace(/^\||\|$/g, "")
    .split(/(?<!\\)\|/g)
    .map((cell) => cell.replace(/\\\|/g, "|").trim());
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const codeMatch = part.match(/^`([^`]+)`$/);
    if (codeMatch) {
      return <InlineCode key={index}>{codeMatch[1]}</InlineCode>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <Link key={index} href={linkMatch[2]}>
          {linkMatch[1]}
        </Link>
      );
    }

    return part;
  });
}

const sandboxStyles = `.demo {
  display: grid;
  min-height: 220px;
  gap: 16px;
  place-items: center;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-card {
  display: grid;
  gap: 12px;
  width: min(100%, 360px);
}

.demo-card h2,
.demo-card p {
  margin: 0;
}

.demo-card h2 {
  font-size: 22px;
}

.demo-card p {
  line-height: 1.6;
}

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 8px 12px;
  text-decoration: none;
}

.ui-button--solid {
  background: #8f79d9;
  color: #ffffff;
}

.ui-button--outline {
  border-color: #8f79d9;
  color: #8f79d9;
}

.ui-button--ghost {
  color: #8f79d9;
}

.ui-card {
  border: 1px solid rgb(220 235 250 / 0.8);
  border-radius: 6px;
  background: rgb(255 255 255 / 0.8);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
}

.ui-card--plain {
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}

.ui-card__body {
  padding: 16px;
}

.ui-code {
  border-radius: 4px;
  background: rgb(143 121 217 / 0.12);
  color: #8f79d9;
  padding: 2px 5px;
}

.ui-code-block {
  overflow: auto;
  border-radius: 8px;
  background: #1d2a35;
  color: #f9fafb;
  padding: 16px;
}

.site-header-demo {
  display: flex;
  width: min(100%, 760px);
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid rgb(143 121 217 / 0.18);
  border-radius: 10px;
  background: #ffffff;
  padding: 12px 16px;
}

.site-header-brand,
.site-header-demo nav {
  display: flex;
  align-items: center;
  gap: 12px;
}

.site-header-brand,
.site-header-demo a {
  color: #1d2a35;
  font-weight: 650;
  text-decoration: none;
}

.site-header-brand span,
.site-header-demo a.is-active {
  color: #8f79d9;
}

.site-header-logo {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #8f79d9;
}

.web-dev-ui-rider-kick {
  display: inline-grid;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 999px;
  background: rgb(143 121 217 / 0.16);
}

.web-dev-ui-rider-kick > span {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #8f79d9;
}`.trim();

const sandboxPackageFiles = {
  "/node_modules/@decadez/web-dev-ui/package.json": {
    hidden: true,
    code: JSON.stringify({
      name: "@decadez/web-dev-ui",
      version: "0.0.0-sandbox",
      main: "./index.js",
    }),
  },
  "/node_modules/@decadez/web-dev-ui/index.js": {
    hidden: true,
    code: `import React from "react";
import "./styles.css";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...buttonProps
}) {
  return (
    <button
      className={cx("ui-button", \`ui-button--\${variant}\`, \`ui-button--\${size}\`, className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  targetBlank = false,
  outline = false,
  className,
  children,
  ...anchorProps
}) {
  return (
    <a
      role="button"
      className={cx(
        "ui-button",
        outline ? "ui-button--outline" : "ui-button--solid",
        "ui-button--md",
        className
      )}
      href={href}
      target={targetBlank ? "_blank" : "_self"}
      {...anchorProps}
    >
      {children}
    </a>
  );
}

export function Card({ variant = "default", className, children, ...props }) {
  return (
    <div
      className={cx("ui-card", variant === "plain" && "ui-card--plain", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cx("ui-card__body", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cx("ui-card__header", className)} {...props}>
      {children}
    </div>
  );
}

export function Code({ className, children, ...props }) {
  return (
    <code className={cx("ui-code", className)} {...props}>
      {children}
    </code>
  );
}

export function CodeBlock({ className, children, ...props }) {
  return (
    <pre className={cx("ui-code-block", className)} {...props}>
      <code>{children}</code>
    </pre>
  );
}

export function RiderKickLogo({ className = "" }) {
  return (
    <span className={cx("web-dev-ui-rider-kick", className)} aria-hidden="true">
      <span />
    </span>
  );
}

export function SiteHeader({
  brandHref,
  brandLabel,
  brandAccent = "",
  brandLogo,
  navLinks,
  currentSection = "",
  theme,
  onThemeToggle,
}) {
  return (
    <header className="site-header-demo">
      <a className="site-header-brand" href={brandHref}>
        {brandLogo ?? <RiderKickLogo />}
        <span>
          {brandLabel}
          {brandAccent && <span>{brandAccent}</span>}
        </span>
      </a>
      <nav>
        {navLinks.map((link) => (
          <a
            key={link.url}
            className={currentSection === link.text.toLowerCase() ? "is-active" : ""}
            href={link.url}
          >
            {link.text}
          </a>
        ))}
      </nav>
      {onThemeToggle && (
        <button className="site-header-theme" type="button" onClick={onThemeToggle}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      )}
    </header>
  );
}`,
  },
  "/node_modules/@decadez/web-dev-ui/styles.css": {
    hidden: true,
    code: sandboxStyles,
  },
};
