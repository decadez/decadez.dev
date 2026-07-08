import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import type { Type } from "@nestjs/common";

const moduleFilePattern = /\.module\.(?:ts|js)$/;

function collectModuleFiles(dir: string): string[] {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      return collectModuleFiles(fullPath);
    }

    return moduleFilePattern.test(entry) && !entry.endsWith(".d.ts")
      ? [fullPath]
      : [];
  });
}

function isNestModuleExport(exported: unknown): exported is Type<unknown> {
  return typeof exported === "function" && exported.name.endsWith("Module");
}

export function loadFeatureModules(baseDir: string) {
  return collectModuleFiles(baseDir)
    .filter((file) => extname(file) === ".ts" || !file.endsWith(".d.ts"))
    .flatMap((file) => Object.values(require(file)))
    .filter(isNestModuleExport);
}
