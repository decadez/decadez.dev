import Link from "next/link";
import type { RouteItem } from "@/utils/docs";

export function DocsFooter({
  prevRoute,
  nextRoute,
}: {
  prevRoute: RouteItem | null;
  nextRoute: RouteItem | null;
}) {
  return (
    <nav className="docs-pager" aria-label="Docs pagination">
      {prevRoute ? (
        <Link href={prevRoute.path}>
          <span>Previous</span>
          {prevRoute.title}
        </Link>
      ) : (
        <span />
      )}
      {nextRoute ? (
        <Link href={nextRoute.path}>
          <span>Next</span>
          {nextRoute.title}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
