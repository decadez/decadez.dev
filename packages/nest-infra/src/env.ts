import { existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";

export interface LoadEnvFilesOptions {
  cwd?: string;
  files?: string[];
  override?: boolean;
}

export function loadEnvFiles(options: LoadEnvFilesOptions = {}) {
  const cwd = options.cwd ?? process.cwd();
  const files = options.files ?? [".env.local", ".env"];

  return files
    .map((file) => join(cwd, file))
    .filter((envPath) => existsSync(envPath))
    .map((envPath) =>
      config({ path: envPath, override: options.override ?? false })
    );
}
