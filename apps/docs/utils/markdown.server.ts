import path from "node:path";
import { readFile } from "node:fs/promises";
import { docsContentDirectory } from "./server-paths";
import type { TocItem } from "./docs";
import { getHeadingId } from "./headings";

export async function readDocSource(docPath: string) {
  const source = await readFile(
    path.join(docsContentDirectory, docPath),
    "utf8"
  );
  const names = [...source.matchAll(/<ExamplePreview name="([a-z-]+)" \/>/g)];
  let expanded = source;
  for (const match of names) {
    const code = await readFile(
      path.join(process.cwd(), "examples", `${match[1]}.tsx`),
      "utf8"
    );
    expanded = expanded.replace(
      match[0],
      `\`\`\`tsx example=${match[1]}\n${code.trimEnd()}\n\`\`\``
    );
  }
  return expanded;
}

export function getTocFromMarkdown(source = ""): TocItem[] {
  const toc = source
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const text = match[2].trim();

      return {
        url: `#${getHeadingId(text)}`,
        text,
        depth: match[1].length as 2 | 3,
      };
    });

  if (source.includes("<MdxComponentGallery />")) {
    toc.push(
      { url: "#coverage", text: "Source coverage", depth: 2 },
      { url: "#prose", text: "Prose components", depth: 2 },
      { url: "#learning", text: "Learning blocks", depth: 2 },
      { url: "#diagrams", text: "Diagrams and code", depth: 2 },
      { url: "#challenges", text: "Challenges", depth: 2 },
      { url: "#sandbox", text: "Sandbox", depth: 2 },
      { url: "#sandbox-parts", text: "Sandbox parts", depth: 2 },
      { url: "#contexts", text: "Contexts", depth: 2 }
    );
  }

  return toc;
}
