import { useState } from "react";
import type { ReactNode } from "react";
import { Card, CardBody, SiteHeader } from "@decadez/web-dev-ui";
import { docsBasePath } from "@/utils/base-path";

const spriteSrc = `${docsBasePath}/decade-rider-kick-spaced.png`;

export function ComponentCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardBody>
        <h3 className="docs-card-title">{title}</h3>
        <p>{children}</p>
      </CardBody>
    </Card>
  );
}

export function ExamplePanel({
  flush = false,
  children,
}: {
  flush?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={flush ? "docs-example docs-example--flush" : "docs-example"}
    >
      {children}
    </div>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return <div className="docs-callout">{children}</div>;
}

export function HeaderPreview() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <ExamplePanel flush>
      <div className={`${theme} docs-header-demo`}>
        <SiteHeader
          brandHref="#"
          brandLabel="decadez"
          brandAccent=".dev"
          spriteSrc={spriteSrc}
          navLinks={[
            { url: "#whoami", text: "Who am i?" },
            { url: "#projects", text: "Projects" },
            { url: "#blog", text: "Blog" },
            { url: "#contact", text: "Contact" },
          ]}
          currentSection="blog"
          theme={theme}
          onThemeToggle={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
          navClassName="docs-header-preview"
        />
      </div>
    </ExamplePanel>
  );
}
