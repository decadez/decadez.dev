const headingIds = new Map([
  ["Overview", "overview"],
  ["Quick start", "quick-start"],
  ["Package shape", "package-shape"],
  ["Install", "install"],
  ["Stylesheet", "stylesheet"],
  ["Dark mode", "dark-mode"],
  ["Font", "font"],
  ["Component list", "list"],
  ["When to use", "when-to-use"],
  ["Code demo", "code-demo"],
  ["API", "api"],
  ["Principle", "principle"],
  ["Outputs", "outputs"],
]);

export function getHeadingId(text: string) {
  const cleanText = text.replace(/`/g, "").trim();

  return (
    headingIds.get(cleanText) ??
    cleanText
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}
