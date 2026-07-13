import type { ElementType, ReactNode } from "react";
import { cx } from "./utils";

export type DocsMenuItem = {
  path: string;
  title: string;
  children?: DocsMenuItem[];
};

export type DocsMenuLinkComponent = ElementType<{
  href: string;
  className?: string;
  children: ReactNode;
  "aria-current"?: "page";
}>;

export type DocsMenuProps = {
  routeTree: DocsMenuItem[];
  currentPath: string;
  LinkComponent?: DocsMenuLinkComponent;
  title?: string;
  className?: string;
};

function normalizePath(path: string) {
  const pathOnly = path.split(/[?#]/)[0] || "/";

  if (pathOnly !== "/" && pathOnly.endsWith("/")) {
    return pathOnly.slice(0, -1);
  }

  return pathOnly;
}

function isActivePath(path: string, currentPath: string) {
  return normalizePath(path) === normalizePath(currentPath);
}

function findCurrentTitle(routeTree: DocsMenuItem[], currentPath: string) {
  for (const group of routeTree) {
    if (isActivePath(group.path, currentPath)) {
      return group.title;
    }

    const child = group.children?.find((item) =>
      isActivePath(item.path, currentPath)
    );

    if (child) {
      return child.title;
    }
  }

  return "Overview";
}

function DocsMenuLink({
  item,
  currentPath,
  LinkComponent,
}: {
  item: DocsMenuItem;
  currentPath: string;
  LinkComponent: DocsMenuLinkComponent;
}) {
  const active = isActivePath(item.path, currentPath);

  return (
    <LinkComponent
      href={item.path}
      aria-current={active ? "page" : undefined}
      className={cx("ui-docs-menu-link", active && "ui-docs-menu-link--active")}
    >
      {item.title}
    </LinkComponent>
  );
}

function DocsMenuSections({
  routeTree,
  currentPath,
  LinkComponent,
}: {
  routeTree: DocsMenuItem[];
  currentPath: string;
  LinkComponent: DocsMenuLinkComponent;
}) {
  return (
    <div className="ui-docs-menu-sections">
      {routeTree.map((group) => (
        <section key={group.path} className="ui-docs-menu-section">
          <p className="ui-docs-menu-section-title">{group.title}</p>
          <nav aria-label={group.title} className="ui-docs-menu-nav">
            <DocsMenuLink
              item={group}
              currentPath={currentPath}
              LinkComponent={LinkComponent}
            />
            {(group.children ?? []).map((item) => (
              <DocsMenuLink
                key={item.path}
                item={item}
                currentPath={currentPath}
                LinkComponent={LinkComponent}
              />
            ))}
          </nav>
        </section>
      ))}
    </div>
  );
}

export function DocsMenu({
  routeTree,
  currentPath,
  LinkComponent = "a",
  title = "Menu",
  className,
}: DocsMenuProps) {
  const currentTitle = findCurrentTitle(routeTree, currentPath);

  return (
    <>
      <details className={cx("ui-docs-menu-mobile", className)}>
        <summary>
          <span>{title}</span>
          <strong>{currentTitle}</strong>
        </summary>
        <DocsMenuSections
          routeTree={routeTree}
          currentPath={currentPath}
          LinkComponent={LinkComponent}
        />
      </details>
      <aside className={cx("ui-docs-menu-desktop", className)}>
        <div className="ui-docs-menu-inner">
          <DocsMenuSections
            routeTree={routeTree}
            currentPath={currentPath}
            LinkComponent={LinkComponent}
          />
        </div>
      </aside>
    </>
  );
}
