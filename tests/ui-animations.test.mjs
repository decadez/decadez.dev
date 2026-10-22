import { after, test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  mkdtempSync,
  symlinkSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const packageDirectory = fileURLToPath(
  new URL("../packages/web-dev-ui/", import.meta.url)
);
const require = createRequire(path.join(packageDirectory, "package.json"));
const ts = require("typescript");
const React = require("react");
const { renderToString } = require("react-dom/server");
const source = path.join(packageDirectory, "src/animations");
const output = mkdtempSync(path.join(tmpdir(), "decadez-animations-test-"));
writeFileSync(path.join(output, "package.json"), '{"type":"commonjs"}');
symlinkSync(
  path.join(packageDirectory, "node_modules"),
  path.join(output, "node_modules"),
  "dir"
);
function compile(relative = "") {
  for (const entry of readdirSync(path.join(source, relative), {
    withFileTypes: true,
  })) {
    const name = path.join(relative, entry.name);
    if (entry.isDirectory()) compile(name);
    else if (/\.tsx?$/.test(name)) {
      const file = path.join(output, name.replace(/\.tsx?$/, ".js"));
      mkdirSync(path.dirname(file), { recursive: true });
      writeFileSync(
        file,
        ts.transpileModule(readFileSync(path.join(source, name), "utf8"), {
          fileName: name,
          compilerOptions: {
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.CommonJS,
            jsx: ts.JsxEmit.ReactJSX,
          },
        }).outputText
      );
    }
  }
}
compile();
after(() => rmSync(output, { recursive: true, force: true, maxRetries: 3 }));
const api = require(path.join(output, "index.js"));

test("all 43 upstream components remain in the catalog and public entry", () => {
  assert.equal(api.animationCatalog.length, 43);
  assert.equal(new Set(api.animationCatalog.map(({ id }) => id)).size, 43);
  const directories = readdirSync(path.join(source, "components"), {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory())
    .map(({ name }) => name)
    .sort();
  assert.deepEqual(
    api.animationCatalog.map(({ id }) => id).sort(),
    directories
  );
  for (const item of api.animationCatalog) {
    assert.equal(api[item.name], item.component);
    assert.ok(item.source.match(/^\d{4}-\d{2}-\d{2}\//));
  }
});

test("the full catalog renders on the server without external resources or a sandbox", () => {
  for (const item of api.animationCatalog) {
    const html = renderToString(
      React.createElement(item.component, {
        size: 160,
        "aria-label": item.name,
        paused: true,
      })
    );
    assert.ok(html.includes(`data-animation="${item.id}"`), item.id);
    assert.ok(html.includes('data-paused="true"'), item.id);
    assert.ok(html.includes('role="img"'), item.id);
    assert.doesNotMatch(
      html,
      /<iframe|<script|src="https?:|@import|https:\/\/fonts/
    );
    const css = require(
      path.join(output, `components/${item.id}/${item.id}.styles.js`)
    ).styles;
    assert.ok(css.includes(`[data-animation="${item.id}"]`), item.id);
    for (const match of css.matchAll(/@keyframes\s+([\w-]+)/g))
      assert.ok(match[1].startsWith(`ca-${item.id}-`), match[1]);
  }
});

test("provider defaults, per-component overrides and decorative semantics survive migration", () => {
  const Animation = api.WalkingCatAnimation;
  const html = renderToString(
    React.createElement(
      api.AnimationProvider,
      { value: { size: 240, paused: true, reducedMotion: "always" } },
      React.createElement(Animation, { size: 160, paused: false })
    )
  );
  assert.ok(html.includes("width:160px"));
  assert.ok(html.includes('data-paused="false"'));
  assert.ok(html.includes('data-reduced-motion="always"'));
  assert.ok(html.includes('aria-hidden="true"'));
});

test("same-component SVG definitions stay unique across instances", () => {
  for (const name of [
    "LoadingGalleryAnimation",
    "LoadingRippleAnimation",
    "LoadingWaveAnimation",
    "LoadingSquaresAnimation",
  ]) {
    const html = renderToString(
      React.createElement(
        React.Fragment,
        null,
        React.createElement(api[name]),
        React.createElement(api[name])
      )
    );
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.ok(ids.length > 0, name);
    assert.equal(new Set(ids).size, ids.length, name);
    for (const reference of html.matchAll(/href="#([^"]+)"/g))
      assert.ok(ids.includes(reference[1]), reference[1]);
  }
});

test("package preserves attribution and dedicated component entries", () => {
  const manifest = require(path.join(packageDirectory, "package.json"));
  assert.equal(
    manifest.exports["./animations/*"].import,
    "./dist/animations/components/*/index.js"
  );
  assert.ok(manifest.files.includes("licenses"));
  assert.match(
    readFileSync(
      path.join(packageDirectory, "licenses/css-animations.LICENSE"),
      "utf8"
    ),
    /Copyright \(c\) 2026 yui540/
  );
});

test("built ESM public entries load with native Node resolution and render", async () => {
  const built = await import(
    pathToFileURL(path.join(packageDirectory, "dist/animations/index.js")).href
  );
  assert.equal(built.animationCatalog.length, 43);
  for (const item of built.animationCatalog) {
    const entry = await import(
      pathToFileURL(
        path.join(
          packageDirectory,
          `dist/animations/components/${item.id}/index.js`
        )
      ).href
    );
    assert.equal(entry[item.name], item.component);
    assert.ok(
      renderToString(React.createElement(entry[item.name])).includes(
        `data-animation="${item.id}"`
      )
    );
  }
  const hooks = await import(
    pathToFileURL(path.join(packageDirectory, "dist/animations/hooks/index.js"))
      .href
  );
  assert.equal(hooks.useAnimation, built.useAnimation);
});

test("public animation declarations work in a strict NodeNext consumer", () => {
  const consumer = path.join(output, "consumer");
  mkdirSync(path.join(consumer, "node_modules/@decadez"), { recursive: true });
  symlinkSync(
    packageDirectory,
    path.join(consumer, "node_modules/@decadez/web-dev-ui"),
    "dir"
  );
  for (const dependency of ["react", "@types"]) {
    symlinkSync(
      path.join(packageDirectory, "node_modules", dependency),
      path.join(consumer, "node_modules", dependency),
      "dir"
    );
  }
  const entry = path.join(consumer, "index.mts");
  writeFileSync(
    entry,
    `
import { animationCatalog, AnimationProvider } from "@decadez/web-dev-ui/animations";
import { WalkingCatAnimation } from "@decadez/web-dev-ui/animations/walking-cat";
import { useAnimation } from "@decadez/web-dev-ui/animations/hooks";
import * as theme from "@decadez/web-dev-ui/animations/theme";
const component: typeof animationCatalog[number]["component"] = WalkingCatAnimation;
const controls: ReturnType<typeof useAnimation>["animationProps"] = { paused: true, replayKey: 1 };
void [component, controls, AnimationProvider, theme];
`
  );
  execFileSync(
    process.execPath,
    [
      require.resolve("typescript/bin/tsc"),
      entry,
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      "--target",
      "ES2020",
      "--noEmit",
      "--strict",
    ],
    { stdio: "pipe" }
  );
});
