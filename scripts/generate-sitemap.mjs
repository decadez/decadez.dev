import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const siteUrl =
  process.env.NEXT_PUBLIC_URL || "https://decadez.github.io/decadez.dev";
const contentsDir = path.join(process.cwd(), "contents");

const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

const posts = fs
  .readdirSync(contentsDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const source = fs.readFileSync(path.join(contentsDir, file), "utf8");
    const { data } = matter(source);
    return {
      slug: data.slug || file.replace(/\.md$/, ""),
      category: data.category,
      tags: data.tags || [],
    };
  });

const categories = [
  ...new Set(posts.map((post) => slugify(post.category || "")).filter(Boolean)),
];
const tags = [...new Set(posts.flatMap((post) => post.tags).filter(Boolean))];

const routes = [
  "",
  "/blog",
  "/blog/categories",
  "/blog/tags",
  ...categories.map((category) => `/blog/categories/${category}`),
  ...tags.map((tag) => `/blog/tags/${tag}`),
  ...posts.map((post) => `/blog/posts/${encodeURIComponent(post.slug.trim())}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(process.cwd(), "public", "robots.txt"),
  `User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
);
