const sandboxLanguageExtensions: Record<string, string> = {
  js: "js",
  jsx: "jsx",
  ts: "ts",
  tsx: "tsx",
};

export function getSandboxAppFile(language: string) {
  const extension = sandboxLanguageExtensions[language.toLowerCase()] ?? "js";
  return `/src/App.${extension}`;
}
