export type RouteItem = {
  path: string;
  title: string;
  description: string;
  section: "quick-start" | "components" | "patterns";
  children?: RouteItem[];
};

export type TocItem = {
  url: string;
  text: string;
  depth: 2 | 3;
};

export type DocPage = {
  path: string;
  title: string;
  description: string;
  breadcrumbs: string[];
  docPath?: string;
};

export const routeTree: RouteItem[] = [
  {
    path: "/",
    title: "Quick Start",
    description: "Use the extracted decadez.dev UI components.",
    section: "quick-start",
    children: [
      {
        path: "/components/button",
        title: "Button",
        description: "Actions and navigation buttons.",
        section: "components",
      },
      {
        path: "/components/card",
        title: "Card",
        description: "Quiet content surfaces.",
        section: "components",
      },
      {
        path: "/components/code",
        title: "Code",
        description: "Inline and block code treatments.",
        section: "components",
      },
      {
        path: "/components/site-header",
        title: "SiteHeader",
        description: "The site navigation composition.",
        section: "components",
      },
      {
        path: "/components/mdx",
        title: "MDX",
        description: "Documentation primitives and live sandboxes.",
        section: "components",
      },
    ],
  },
  {
    path: "/patterns",
    title: "Patterns",
    description: "Composition and publishing notes.",
    section: "patterns",
    children: [
      {
        path: "/patterns/composition",
        title: "Composition",
        description: "How the library decides what to include.",
        section: "patterns",
      },
      {
        path: "/patterns/publishing",
        title: "Publishing",
        description: "Package outputs and deployment flow.",
        section: "patterns",
      },
    ],
  },
];

export const pages: DocPage[] = [
  {
    path: "/",
    title: "Quick Start",
    description:
      "A focused component library extracted from the production site.",
    breadcrumbs: ["Docs"],
    docPath: "index.md",
  },
  {
    path: "/components/button",
    title: "Button",
    description: "Actions and navigation buttons.",
    breadcrumbs: ["Docs", "Components", "Button"],
    docPath: "components/button.md",
  },
  {
    path: "/components/card",
    title: "Card",
    description: "Quiet content surfaces.",
    breadcrumbs: ["Docs", "Components", "Card"],
    docPath: "components/card.md",
  },
  {
    path: "/components/code",
    title: "Code",
    description: "Inline and block code treatments.",
    breadcrumbs: ["Docs", "Components", "Code"],
    docPath: "components/code.md",
  },
  {
    path: "/components/site-header",
    title: "SiteHeader",
    description: "The site navigation composition.",
    breadcrumbs: ["Docs", "Components", "SiteHeader"],
    docPath: "components/site-header.md",
  },
  {
    path: "/components/mdx",
    title: "MDX",
    description: "Documentation primitives and live sandboxes.",
    breadcrumbs: ["Docs", "Components", "MDX"],
    docPath: "components/mdx.md",
  },
  {
    path: "/patterns/composition",
    title: "Composition",
    description: "How the package decides what to include.",
    breadcrumbs: ["Docs", "Patterns"],
    docPath: "patterns/composition.md",
  },
  {
    path: "/patterns/publishing",
    title: "Publishing",
    description: "Package outputs and deployment flow.",
    breadcrumbs: ["Docs", "Patterns"],
    docPath: "patterns/publishing.md",
  },
];

export function getPageByPath(path: string) {
  return pages.find((page) => page.path === path);
}

export function getAllPagePaths() {
  return pages.map((page) => page.path);
}
