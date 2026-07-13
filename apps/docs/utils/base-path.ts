export const docsBasePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH ?? "";

export function docsHref(path: string) {
  if (path.startsWith("#") || path.startsWith("http")) {
    return path;
  }

  return `${docsBasePath}${path}`;
}
