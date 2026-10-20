import { remark } from "remark";
import html from "remark-html";
import type { TocItem } from "./post-navigation";

type MarkdownNode = {
  type: string;
  depth?: number;
  value?: string;
  children?: MarkdownNode[];
};

function nodeText(node: MarkdownNode): string {
  return node.value ?? (node.children ?? []).map(nodeText).join("");
}

export async function compilePostMarkdown(markdown: string) {
  const processor = remark().use(html);
  const tree = processor.parse(markdown);
  const headings: TocItem[] = [];
  const usedIds = new Set<string>();
  const collect = (node: MarkdownNode) => {
    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      const text = nodeText(node);
      const base =
        text
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
          .replace(/^-|-$/g, "") || "section";
      let id = base;
      let suffix = 1;
      while (usedIds.has(id)) id = `${base}-${suffix++}`;
      usedIds.add(id);
      headings.push({ text, url: `#${id}`, depth: node.depth });
    }
    node.children?.forEach(collect);
  };
  collect(tree);
  const result = await processor.process(markdown);
  let index = 0;
  let content = result.toString().replace(/<h([23])>/g, (_, depth) => {
    const id = headings[index++].url.slice(1);
    return `<h${depth} id="${id}">`;
  });
  const basePath = process.env.GITHUB_PAGES === "true" ? "/decadez.dev" : "";
  if (basePath)
    content = content.replace(/(<img\s[^>]*src=")\/(?!\/)/g, `$1${basePath}/`);
  return { content, toc: headings };
}

export default async function markdownToHtml(markdown: string) {
  return (await compilePostMarkdown(markdown)).content;
}
