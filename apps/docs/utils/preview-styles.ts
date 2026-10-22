/** Use the stylesheet Next already compiled, including Tailwind and asset URLs. */
export function getPreviewStyles() {
  return Array.from(document.styleSheets)
    .flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules).map((rule) =>
          rule.cssText.replace(
            /url\(["']?([^"')]+)["']?\)/g,
            (_, url: string) =>
              `url(${JSON.stringify(new URL(url, sheet.href ?? document.baseURI).href)})`
          )
        );
      } catch {
        // An unrelated cross-origin stylesheet cannot expose its CSS rules.
        return [];
      }
    })
    .join("\n");
}
