import type { ReactNode } from "react";
import {
  Badge,
  Button,
  Code,
  CodeBlock,
  LinkButton,
} from "@decadez/web-dev-ui";
import {
  ComponentCard,
  ExamplePanel,
  Callout,
  HeaderPreview,
} from "@/components/DocBlocks";
import { docsHref } from "@/utils/base-path";

export type RouteItem = {
  path: string;
  title: string;
  description: string;
  section: "start" | "components" | "patterns";
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
  toc: TocItem[];
  content: ReactNode;
};

export const routeTree: RouteItem[] = [
  {
    path: "/",
    title: "Start Here",
    description: "Use the extracted decadez.dev UI components.",
    section: "start",
    children: [
      {
        path: "/installation",
        title: "Installation",
        description: "Install the package and stylesheet.",
        section: "start",
      },
      {
        path: "/theming",
        title: "Theming",
        description: "Class-based dark mode and the site font.",
        section: "start",
      },
    ],
  },
  {
    path: "/components",
    title: "Components",
    description: "Primitives and site compositions.",
    section: "components",
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
    title: "UI components for decadez.dev",
    description:
      "A focused component library extracted from the production site.",
    breadcrumbs: ["Docs"],
    toc: [
      { url: "#overview", text: "Overview", depth: 2 },
      { url: "#quick-start", text: "Quick start", depth: 2 },
      { url: "#package-shape", text: "Package shape", depth: 2 },
    ],
    content: (
      <>
        <section id="overview" className="docs-hero">
          <h1>UI components for decadez.dev</h1>
          <p>
            A documentation app built from a full source-level docs
            architecture: catch-all routes, route metadata, a layout shell,
            sidebar navigation, and an on-page table of contents. The visible
            product identity is decadez only.
          </p>
          <div className="docs-actions">
            <LinkButton href={docsHref("/installation")}>
              Get Started
            </LinkButton>
            <LinkButton href={docsHref("/components")} outline>
              Browse Components
            </LinkButton>
          </div>
        </section>

        <section id="quick-start" className="docs-section">
          <h2>Quick start</h2>
          <p>
            Install the package, import the stylesheet once, and compose the
            components you need.
          </p>
          <CodeBlock>{`pnpm add @decadez/web-dev-ui`}</CodeBlock>
        </section>

        <section id="package-shape" className="docs-section">
          <h2>Package shape</h2>
          <div className="docs-card-grid">
            <ComponentCard title="Primitives">
              Button, Card, Badge, Code, layout helpers.
            </ComponentCard>
            <ComponentCard title="Compositions">
              SiteHeader and the rider kick logo used by the production site.
            </ComponentCard>
          </div>
        </section>
      </>
    ),
  },
  {
    path: "/installation",
    title: "Installation",
    description: "Install the UI package and import its stylesheet.",
    breadcrumbs: ["Docs", "Start Here"],
    toc: [
      { url: "#install", text: "Install", depth: 2 },
      { url: "#stylesheet", text: "Stylesheet", depth: 2 },
    ],
    content: (
      <>
        <section id="install" className="docs-section docs-section--first">
          <h2>Install</h2>
          <CodeBlock>{`pnpm add @decadez/web-dev-ui`}</CodeBlock>
        </section>
        <section id="stylesheet" className="docs-section">
          <h2>Stylesheet</h2>
          <p>
            Import the stylesheet near your app root. It includes component CSS,
            the site font, and dark mode selectors.
          </p>
          <CodeBlock>{`import "@decadez/web-dev-ui/styles.css";`}</CodeBlock>
        </section>
      </>
    ),
  },
  {
    path: "/theming",
    title: "Theming",
    description: "Use class-based dark mode and the site font.",
    breadcrumbs: ["Docs", "Start Here"],
    toc: [
      { url: "#dark-mode", text: "Dark mode", depth: 2 },
      { url: "#font", text: "Font", depth: 2 },
    ],
    content: (
      <>
        <section id="dark-mode" className="docs-section docs-section--first">
          <h2>Dark mode</h2>
          <p>
            Components use a parent <Code>dark</Code> class to switch themes.
          </p>
        </section>
        <section id="font" className="docs-section">
          <h2>Font</h2>
          <Callout>
            The UI package owns the Jost site font, so consumers do not need a
            separate font link.
          </Callout>
        </section>
      </>
    ),
  },
  {
    path: "/components",
    title: "Components",
    description: "Primitives and site compositions currently in the package.",
    breadcrumbs: ["Docs"],
    toc: [{ url: "#list", text: "Component list", depth: 2 }],
    content: (
      <section id="list" className="docs-section docs-section--first">
        <h2>Component list</h2>
        <div className="docs-card-grid">
          <ComponentCard title="Button">Actions and links.</ComponentCard>
          <ComponentCard title="Card">Content surfaces.</ComponentCard>
          <ComponentCard title="Code">Technical text.</ComponentCard>
          <ComponentCard title="SiteHeader">Site navigation.</ComponentCard>
        </div>
      </section>
    ),
  },
  {
    path: "/components/button",
    title: "Button",
    description: "Actions and navigation buttons.",
    breadcrumbs: ["Docs", "Components"],
    toc: [
      { url: "#variants", text: "Variants", depth: 2 },
      { url: "#usage", text: "Usage", depth: 2 },
    ],
    content: (
      <>
        <section id="variants" className="docs-section docs-section--first">
          <h2>Variants</h2>
          <ExamplePanel>
            <div className="docs-row">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </ExamplePanel>
        </section>
        <section id="usage" className="docs-section">
          <h2>Usage</h2>
          <CodeBlock>{`import { Button, LinkButton } from "@decadez/web-dev-ui";

<Button>Primary</Button>
<LinkButton href="/contact">Contact</LinkButton>`}</CodeBlock>
        </section>
      </>
    ),
  },
  {
    path: "/components/card",
    title: "Card",
    description: "Quiet content surfaces.",
    breadcrumbs: ["Docs", "Components"],
    toc: [{ url: "#example", text: "Example", depth: 2 }],
    content: (
      <section id="example" className="docs-section docs-section--first">
        <h2>Example</h2>
        <div className="docs-card-grid">
          <ComponentCard title="Card">
            Theme-aware border and fill.
          </ComponentCard>
          <ComponentCard title="Badge">Compact metadata label.</ComponentCard>
        </div>
      </section>
    ),
  },
  {
    path: "/components/code",
    title: "Code",
    description: "Inline and block code treatments.",
    breadcrumbs: ["Docs", "Components"],
    toc: [{ url: "#example", text: "Example", depth: 2 }],
    content: (
      <section id="example" className="docs-section docs-section--first">
        <h2>Example</h2>
        <p>
          Import styles with <Code>@decadez/web-dev-ui/styles.css</Code>.
        </p>
        <CodeBlock>{`import { Code, CodeBlock } from "@decadez/web-dev-ui";`}</CodeBlock>
      </section>
    ),
  },
  {
    path: "/components/site-header",
    title: "SiteHeader",
    description: "The site navigation composition.",
    breadcrumbs: ["Docs", "Components"],
    toc: [
      { url: "#preview", text: "Preview", depth: 2 },
      { url: "#container", text: "Container sizing", depth: 2 },
    ],
    content: (
      <>
        <section id="preview" className="docs-section docs-section--first">
          <h2>Preview</h2>
          <HeaderPreview />
        </section>
        <section id="container" className="docs-section">
          <h2>Container sizing</h2>
          <p>
            The docs preview uses a container query so the example responds to
            the preview width instead of the browser width.
          </p>
        </section>
      </>
    ),
  },
  {
    path: "/patterns/composition",
    title: "Composition",
    description: "How the package decides what to include.",
    breadcrumbs: ["Docs", "Patterns"],
    toc: [{ url: "#principle", text: "Principle", depth: 2 }],
    content: (
      <section id="principle" className="docs-section docs-section--first">
        <h2>Principle</h2>
        <p>
          The package only includes primitives and compositions already present
          in the site.
        </p>
      </section>
    ),
  },
  {
    path: "/patterns/publishing",
    title: "Publishing",
    description: "Package outputs and deployment flow.",
    breadcrumbs: ["Docs", "Patterns"],
    toc: [{ url: "#outputs", text: "Outputs", depth: 2 }],
    content: (
      <section id="outputs" className="docs-section docs-section--first">
        <h2>Outputs</h2>
        <p>
          The package ships compiled JavaScript, declarations, and a single
          stylesheet entry.
        </p>
      </section>
    ),
  },
];

export function getPageByPath(path: string) {
  return pages.find((page) => page.path === path);
}

export function getAllPagePaths() {
  return pages.map((page) => page.path);
}
