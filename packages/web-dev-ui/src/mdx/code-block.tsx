/**
 * Adapted from react.dev's MDX CodeBlock implementation.
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * Licensed under the MIT license.
 */

import type { ReactNode } from "react";
import cn from "classnames";
import { HighlightStyle } from "@codemirror/language";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { highlightTree, tags } from "@lezer/highlight";
import rangeParser from "parse-numeric-range";
import { CustomTheme } from "./sandpack/Themes";

interface InlineHighlight {
  step: number;
  line: number;
  startColumn: number;
  endColumn: number;
}

type CodeBlockChild = ReactNode & {
  props?: {
    className?: string;
    children?: string;
    meta?: string;
  };
};

type CodeBlockProps = {
  children: CodeBlockChild | string;
  className?: string;
  meta?: string;
  noMargin?: boolean;
  noShadow?: boolean;
  onLineHover?: (lineNumber: number | null) => void;
};

const jsxLang = javascript({ jsx: true, typescript: true });
const cssLang = css();
const htmlLang = html();

function getCodeBlockInput({
  children,
  className,
  meta,
}: Pick<CodeBlockProps, "children" | "className" | "meta">) {
  if (typeof children === "string") {
    return {
      className: className ?? "language-js",
      code: children,
      meta,
    };
  }

  return {
    className: children.props?.className ?? className ?? "language-js",
    code: children.props?.children ?? "",
    meta: children.props?.meta ?? meta,
  };
}

export function CodeBlock({
  children,
  className,
  meta,
  noMargin,
  noShadow,
  onLineHover,
}: CodeBlockProps) {
  const input = getCodeBlockInput({ children, className, meta });
  const code = input.code.trimEnd();
  let lang = jsxLang;

  if (input.className === "language-css") {
    lang = cssLang;
  } else if (input.className === "language-html") {
    lang = htmlLang;
  }

  const tree = lang.language.parser.parse(code);
  const tokenStarts = new Map<number, string>();
  const tokenEnds = new Map<number, string>();
  const highlightTheme = getSyntaxHighlight(CustomTheme);

  highlightTree(tree, highlightTheme, (from, to, className) => {
    tokenStarts.set(from, className);
    tokenEnds.set(to, className);
  });

  const highlightedLines = new Map<number, string>();
  const lines = code.split("\n");
  const lineDecorators = getLineDecorators(input.meta);

  for (const decorator of lineDecorators) {
    highlightedLines.set(decorator.line - 1, decorator.className);
  }

  const inlineDecorators = getInlineDecorators(input.meta, code);
  const decoratorStarts = new Map<number, string>();
  const decoratorEnds = new Map<number, string>();

  for (const decorator of inlineDecorators) {
    let decoratorStart = 0;

    for (let i = 0; i < decorator.line - 1; i++) {
      decoratorStart += lines[i].length + 1;
    }

    decoratorStart += decorator.startColumn;
    const decoratorEnd =
      decoratorStart + (decorator.endColumn - decorator.startColumn);

    if (decoratorStarts.has(decoratorStart)) {
      throw new Error(`Already opened decorator at ${decoratorStart}`);
    }

    decoratorStarts.set(decoratorStart, decorator.className);

    if (decoratorEnds.has(decoratorEnd)) {
      throw new Error(`Already closed decorator at ${decoratorEnd}`);
    }

    decoratorEnds.set(decoratorEnd, decorator.className);
  }

  let currentDecorator: string | null = null;
  let currentToken: string | null = null;
  let buffer = "";
  let lineIndex = 0;
  let lineOutput: ReactNode[] = [];
  const finalOutput: ReactNode[] = [];

  for (let i = 0; i < code.length; i++) {
    if (tokenEnds.has(i)) {
      if (!currentToken) {
        throw new Error(`Cannot close token at ${i} because it was not open.`);
      }

      if (!currentDecorator) {
        lineOutput.push(
          <span key={`${i}/t`} className={currentToken}>
            {buffer}
          </span>
        );
        buffer = "";
      }

      currentToken = null;
    }

    if (decoratorEnds.has(i)) {
      if (!currentDecorator) {
        throw new Error(
          `Cannot close decorator at ${i} because it was not open.`
        );
      }

      lineOutput.push(
        <span key={`${i}/d`} className={currentDecorator}>
          {buffer}
        </span>
      );
      buffer = "";
      currentDecorator = null;
    }

    if (decoratorStarts.has(i)) {
      if (currentDecorator) {
        throw new Error(
          `Cannot open decorator at ${i} before closing last one.`
        );
      }

      if (currentToken) {
        lineOutput.push(
          <span key={`${i}d`} className={currentToken}>
            {buffer}
          </span>
        );
        buffer = "";
      } else {
        lineOutput.push(buffer);
        buffer = "";
      }

      currentDecorator = decoratorStarts.get(i) ?? null;
    }

    if (tokenStarts.has(i)) {
      if (currentToken) {
        throw new Error(`Cannot open token at ${i} before closing last one.`);
      }

      currentToken = tokenStarts.get(i) ?? null;

      if (!currentDecorator) {
        lineOutput.push(buffer);
        buffer = "";
      }
    }

    if (code[i] === "\n") {
      lineOutput.push(buffer);
      buffer = "";

      const currentLineIndex = lineIndex;
      finalOutput.push(
        <div
          key={lineIndex}
          className={cn("cm-line", highlightedLines.get(lineIndex))}
          onMouseEnter={
            onLineHover ? () => onLineHover(currentLineIndex) : undefined
          }
        >
          {lineOutput}
          <br />
        </div>
      );
      lineOutput = [];
      lineIndex++;
    } else {
      buffer += code[i];
    }
  }

  if (currentDecorator) {
    lineOutput.push(
      <span key="end/d" className={currentDecorator}>
        {buffer}
      </span>
    );
  } else if (currentToken) {
    lineOutput.push(
      <span key="end/t" className={currentToken}>
        {buffer}
      </span>
    );
  } else {
    lineOutput.push(buffer);
  }

  finalOutput.push(
    <div
      key={lineIndex}
      className={cn("cm-line", highlightedLines.get(lineIndex))}
      onMouseEnter={onLineHover ? () => onLineHover(lineIndex) : undefined}
    >
      {lineOutput}
    </div>
  );

  return (
    <div
      dir="ltr"
      className={cn(
        "sandpack sandpack--codeblock ui-mdx-code-block",
        !noMargin && "ui-mdx-code-block--margin",
        noShadow && "ui-mdx-code-block--flat"
      )}
      style={{ contain: "content" }}
    >
      <div className="sp-wrapper">
        <div className="sp-stack">
          <div className="sp-code-editor">
            <pre className="sp-cm sp-pristine sp-javascript">
              <code
                className="sp-pre-placeholder"
                onMouseLeave={onLineHover ? () => onLineHover(null) : undefined}
              >
                {finalOutput}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeBlock;

function classNameToken(name: string): string {
  return `sp-syntax-${name}`;
}

function getSyntaxHighlight(theme: typeof CustomTheme): HighlightStyle {
  return HighlightStyle.define([
    { tag: tags.link, textDecoration: "underline" },
    { tag: tags.emphasis, fontStyle: "italic" },
    { tag: tags.strong, fontWeight: "bold" },
    { tag: tags.keyword, class: classNameToken("keyword") },
    {
      tag: [tags.atom, tags.number, tags.bool],
      class: classNameToken("static"),
    },
    { tag: tags.standard(tags.tagName), class: classNameToken("tag") },
    { tag: tags.variableName, class: classNameToken("plain") },
    {
      tag: tags.function(tags.variableName),
      class: classNameToken("definition"),
    },
    {
      tag: [tags.definition(tags.function(tags.variableName)), tags.tagName],
      class: classNameToken("definition"),
    },
    { tag: tags.propertyName, class: classNameToken("property") },
    {
      tag: [tags.literal, tags.inserted],
      class: classNameToken(theme.syntax.string ? "string" : "static"),
    },
    { tag: tags.punctuation, class: classNameToken("punctuation") },
    { tag: [tags.comment, tags.quote], class: classNameToken("comment") },
  ]);
}

function getLineDecorators(meta?: string): Array<{
  line: number;
  className: string;
}> {
  if (!meta) {
    return [];
  }

  return getHighlightLines(meta).map((line) => ({
    className: "ui-code-line-highlight",
    line,
  }));
}

function getInlineDecorators(
  meta: string | undefined,
  code: string
): Array<InlineHighlight & { className: string }> {
  if (!meta) {
    return [];
  }

  return getInlineHighlights(meta, code).map((line) => ({
    ...line,
    className: cn("code-step ui-code-inline-highlight", {
      "ui-code-inline-highlight--one": line.step === 1,
      "ui-code-inline-highlight--two": line.step === 2,
      "ui-code-inline-highlight--three": line.step === 3,
      "ui-code-inline-highlight--four": line.step === 4,
    }),
  }));
}

function getHighlightLines(meta: string): number[] {
  const parsedMeta = /{([\d,-]+)}/.exec(meta);

  if (!parsedMeta) {
    return [];
  }

  return rangeParser(parsedMeta[1]);
}

function getInlineHighlights(meta: string, code: string): InlineHighlight[] {
  const parsedMeta = /(\[\[.*\]\])/.exec(meta);

  if (!parsedMeta) {
    return [];
  }

  const lines = code.split("\n");
  const encodedHighlights = JSON.parse(parsedMeta[1]) as Array<
    [number, number, string, number | undefined]
  >;

  return encodedHighlights.map(([step, lineNo, substr, fromIndex]) => {
    const line = lines[lineNo - 1];
    let index = line.indexOf(substr);
    const lastIndex = line.lastIndexOf(substr);

    if (index !== lastIndex) {
      if (fromIndex === undefined) {
        throw new Error(
          `Found '${substr}' twice. Specify fromIndex as the fourth value in the tuple.`
        );
      }

      index = line.indexOf(substr, fromIndex);
    }

    if (index === -1) {
      throw new Error(`Could not find: '${substr}'`);
    }

    return {
      step,
      line: lineNo,
      startColumn: index,
      endColumn: index + substr.length,
    };
  });
}
