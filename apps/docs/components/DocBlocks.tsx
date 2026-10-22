import type { ReactNode } from "react";
import { Card, CardBody } from "@decadez/web-dev-ui";

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
