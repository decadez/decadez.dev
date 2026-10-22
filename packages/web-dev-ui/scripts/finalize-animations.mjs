import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// TypeScript's bundler resolution emits extensionless imports. Public ESM and
// NodeNext declarations need explicit file paths, including directory indexes.
const directory = fileURLToPath(
  new URL("../dist/animations/", import.meta.url)
);
function visit(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (/\.(js|d\.ts)$/.test(entry.name)) {
      const source = readFileSync(file, "utf8");
      const finalized = source.replace(
        /(\b(?:from|import)\s+)(["'])(\.[^"']+)\2/g,
        (match, prefix, quote, specifier) => {
          if (/\.(?:js|mjs|cjs|json|css)$/.test(specifier)) return match;
          const resolved = path.resolve(folder, specifier);
          const suffix = existsSync(`${resolved}.js`)
            ? ".js"
            : existsSync(path.join(resolved, "index.js"))
              ? "/index.js"
              : null;
          if (!suffix)
            throw new Error(
              `Unresolved animation import ${specifier} in ${file}`
            );
          return `${prefix}${quote}${specifier}${suffix}${quote}`;
        }
      );
      writeFileSync(file, finalized);
    }
  }
}
visit(directory);
