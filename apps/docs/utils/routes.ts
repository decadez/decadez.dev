import { getAllPagePaths, getPageByPath, routeTree } from "@/utils/docs";

export function normalizePath(markdownPath?: string[]) {
  if (!markdownPath || markdownPath.length === 0) {
    return "/";
  }

  return `/${markdownPath.join("/")}`;
}

export function getStaticDocPaths() {
  return getAllPagePaths().map((path) => ({
    params: {
      markdownPath: path === "/" ? [] : path.slice(1).split("/"),
    },
  }));
}

export function getRouteMeta(path: string) {
  const flatRoutes = routeTree.flatMap((route) => [
    route,
    ...(route.children ?? []),
  ]);
  const currentIndex = flatRoutes.findIndex((route) => route.path === path);

  return {
    route: flatRoutes[currentIndex],
    prevRoute: currentIndex > 0 ? flatRoutes[currentIndex - 1] : null,
    nextRoute:
      currentIndex >= 0 && currentIndex < flatRoutes.length - 1
        ? flatRoutes[currentIndex + 1]
        : null,
  };
}

export { getPageByPath, routeTree };
