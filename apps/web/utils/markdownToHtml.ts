import { remark } from "remark";
import html from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  const basePath = process.env.GITHUB_PAGES === "true" ? "/decadez.dev" : "";
  return basePath
    ? result.toString().replace(/(<img\s[^>]*src=")\/(?!\/)/g, `$1${basePath}/`)
    : result.toString();
}
