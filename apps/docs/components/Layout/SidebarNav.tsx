import Link from "next/link";
import { useRouter } from "next/router";
import { DocsMenu } from "@decadez/web-dev-ui";
import type { RouteItem } from "@/utils/docs";

export function SidebarNav({ routeTree }: { routeTree: RouteItem[] }) {
  const router = useRouter();
  const currentPath = router.asPath.split(/[?#]/)[0] || "/";

  return (
    <DocsMenu
      routeTree={routeTree}
      currentPath={currentPath}
      LinkComponent={Link}
      title="Docs menu"
    />
  );
}
