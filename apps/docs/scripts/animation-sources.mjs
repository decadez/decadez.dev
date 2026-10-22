import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { watch } from "node:fs";
import { spawn } from "node:child_process";

// Build a static asset for the editor; keep source text out of page props.
const directory = fileURLToPath(
  new URL("../../../packages/web-dev-ui/src/animations/", import.meta.url)
);
const target = fileURLToPath(
  new URL("../public/animation-sources.json", import.meta.url)
);
async function generate() {
  const files = {};
  async function visit(relative = "") {
    for (const entry of await readdir(path.join(directory, relative), {
      withFileTypes: true,
    })) {
      const name = path.posix.join(relative, entry.name);
      if (entry.isDirectory()) await visit(name);
      else if (/\.tsx?$/.test(name))
        files[`/src/animation-package/${name}`] = await readFile(
          path.join(directory, name),
          "utf8"
        );
    }
  }
  await visit();
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(`${target}.tmp`, JSON.stringify(files));
  await rename(`${target}.tmp`, target);
}
await generate();

if (process.argv[2] === "--dev") {
  let pending = Promise.resolve();
  const watcher = watch(directory, { recursive: true }, () => {
    pending = pending.then(generate).catch((error) => console.error(error));
  });
  const next = spawn("next", ["dev", ...process.argv.slice(3)], {
    stdio: "inherit",
  });
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => {
      watcher.close();
      next.kill(signal);
    });
  }
  next.on("exit", (code) => {
    watcher.close();
    process.exit(code ?? 0);
  });
  next.on("error", (error) => {
    watcher.close();
    console.error(error);
    process.exit(1);
  });
}
