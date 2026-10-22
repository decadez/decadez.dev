import type { ReactNode } from "react";
import {
  CodeBlock,
  H2,
  H3,
  InlineCode,
  Link,
  MDXParagraph,
} from "@decadez/web-dev-ui/mdx";
import { MDXSandbox } from "./Sandbox";
import { ExamplePreview } from "./ExamplePreview";
import { AnimationGallery } from "./AnimationGallery";
import { MdxComponentGallery } from "./MdxComponentGallery";
import { getHeadingId } from "@/utils/headings";
import { sandboxStyles } from "@/utils/sandbox-styles";
import { getSandboxAppFile } from "@/utils/sandbox";

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
      if (token.name === "AnimationGallery")
        return <AnimationGallery key={index} />;
      if (token.name === "MdxComponentGallery") {
        return <MdxComponentGallery key={index} />;
      }

      return null;
    case "code":
      if (token.meta.startsWith("example=")) {
        return (
          <ExamplePreview
            key={index}
            name={token.meta.slice(8)}
            code={token.code}
          />
        );
      }
      if (token.meta.includes("sandbox")) {
        const appFile = getSandboxAppFile(token.language);
        return (
          <MDXSandbox
            key={index}
            activeFile={appFile}
            files={{
              [appFile]: token.code,
              "/src/styles.css": sandboxStyles,
            }}
          />
        );
      }

      return (
        <CodeBlock
          key={index}
          className={`language-${token.language || "js"}`}
          meta={token.meta}
        >
          {token.code}
        </CodeBlock>
      );
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
