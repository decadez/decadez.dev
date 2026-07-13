import type { TocItem } from "@/utils/docs";
import { useTocHighlight } from "./useTocHighlight";

export function Toc({ headings }: { headings: TocItem[] }) {
  const currentIndex = useTocHighlight(headings);
  const selectedIndex = Math.min(currentIndex, headings.length - 1);

  return (
    <aside className="docs-toc">
      <div className="docs-toc-inner">
        <p>On this page</p>
        <nav aria-label="On this page">
          {headings.map((item, index) => (
            <a
              key={item.url}
              href={item.url}
              aria-current={selectedIndex === index ? "location" : undefined}
              className={selectedIndex === index ? "docs-toc-active" : ""}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
