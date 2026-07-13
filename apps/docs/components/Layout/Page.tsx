import { useEffect, useState } from "react";
import type { DocPage, RouteItem, TocItem } from "@/utils/docs";
import { routeTree } from "@/utils/docs";
import { MarkdownDoc } from "@/components/MarkdownDoc";
import { TopNav } from "./TopNav";
import { SidebarNav } from "./SidebarNav";
import { Toc } from "./Toc";
import { DocsFooter } from "./Footer";

type DocsTheme = "light" | "dark";

const themeStorageKey = "decadez-docs-theme";

function applyDocsTheme(theme: DocsTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#1d2a35" : "#f9fafb");
}

export function Page({
  page,
  source,
  toc,
  prevRoute,
  nextRoute,
}: {
  page: DocPage;
  source: string;
  toc: TocItem[];
  prevRoute: RouteItem | null;
  nextRoute: RouteItem | null;
}) {
  const [theme, setTheme] = useState<DocsTheme>("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(themeStorageKey);

    if (storedTheme === "light" || storedTheme === "dark") {
      applyDocsTheme(storedTheme);
      setTheme(storedTheme);
    } else {
      applyDocsTheme("light");
    }
  }, []);

  function handleThemeToggle() {
    setTheme((current) => {
      const nextTheme = current === "dark" ? "light" : "dark";
      window.localStorage.setItem(themeStorageKey, nextTheme);
      applyDocsTheme(nextTheme);

      return nextTheme;
    });
  }

  return (
    <div className={theme}>
      <div className="docs-shell">
        <TopNav theme={theme} onThemeToggle={handleThemeToggle} />
        <div className="docs-layout">
          <SidebarNav routeTree={routeTree} />
          <main className="docs-content" id="main">
            <article>
              <div className="docs-breadcrumbs">
                {page.breadcrumbs.map((crumb, index) => (
                  <span key={crumb}>
                    {index > 0 && <span>/ </span>}
                    {crumb}
                  </span>
                ))}
              </div>
              {page.path !== "/" && (
                <header className="docs-page-heading">
                  <h1>{page.title}</h1>
                  <p>{page.description}</p>
                </header>
              )}
              <MarkdownDoc source={source} />
              <DocsFooter prevRoute={prevRoute} nextRoute={nextRoute} />
            </article>
          </main>
          <Toc headings={toc} />
        </div>
      </div>
    </div>
  );
}
