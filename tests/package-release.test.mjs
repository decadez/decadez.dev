import { test } from "node:test";
import assert from "node:assert/strict";
import {
  releaseLevel,
  nextVersion,
  chooseVersion,
  packageChanged,
} from "../scripts/package-release.mjs";

test("commit priority and breaking footers", () => {
  assert.equal(releaseLevel(["fix(ui): color", "\nfeat(ui): button"]), "minor");
  assert.equal(
    releaseLevel(["fix: color", "\nfeat(ui)!: remove sandbox"]),
    "breaking"
  );
  assert.equal(
    releaseLevel(["refactor: move editor\n\nBREAKING CHANGE: remove API"]),
    "breaking"
  );
  assert.equal(
    releaseLevel(["docs: clarify usage", "chore: dependencies"]),
    "patch"
  );
});
test("semver and pre-1.0 compatibility", () => {
  assert.equal(nextVersion("0.3.2", "patch"), "0.3.3");
  assert.equal(nextVersion("0.3.2", "minor"), "0.4.0");
  assert.equal(nextVersion("0.3.2", "breaking"), "0.4.0");
  assert.equal(nextVersion("1.3.2", "breaking"), "2.0.0");
  assert.throws(() => nextVersion("1.0.0-beta.1", "minor"));
});
test("honors an explicit version bump without bumping twice", () => {
  assert.equal(chooseVersion("0.4.0", "0.3.2", ["feat!: remove API"]), "0.4.0");
  assert.equal(chooseVersion("0.3.2", "0.3.2", ["fix: error"]), "0.3.3");
});
test("manual bumps must meet the required change level", () => {
  assert.equal(chooseVersion("0.3.3", "0.3.2", ["feat: add button"]), "0.4.0");
});

test("only changed package files count, including removals, docs and assets", () => {
  assert.equal(
    packageChanged(["apps/api/src/main.ts"], "packages/nest-infra"),
    false
  );
  assert.equal(
    packageChanged(
      ["packages/web-dev-ui/dist/index.js"],
      "packages/web-dev-ui"
    ),
    false
  );
  assert.equal(
    packageChanged(
      ["packages/web-dev-ui-other/src/a.ts"],
      "packages/web-dev-ui"
    ),
    false
  );
  for (const file of [
    "src/deleted.ts",
    "README.md",
    "src/assets/logo.svg",
    "package.json",
  ]) {
    assert.equal(
      packageChanged([`packages/web-dev-ui/${file}`], "packages/web-dev-ui"),
      true
    );
  }
});

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { prepare } from "../scripts/package-release.mjs";

test("git history covers independent package changes and unpublished retry", () => {
  const directory = mkdtempSync(join(tmpdir(), "decadez-release-"));
  const previous = process.cwd();
  const git = (...args) =>
    execFileSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
      cwd: directory,
      encoding: "utf8",
    }).trim();
  const save = (name, version) => {
    mkdirSync(join(directory, "packages", name), { recursive: true });
    writeFileSync(
      join(directory, "packages", name, "package.json"),
      JSON.stringify({ name: `@decadez/${name}`, version })
    );
  };
  const commit = (message) => {
    git("add", ".");
    git("commit", "-m", message);
  };
  try {
    git("init");
    git("config", "core.fsmonitor", "false");
    git("config", "maintenance.auto", "false");
    git("config", "user.name", "Test");
    git("config", "user.email", "test@example.com");
    save("ui", "0.3.2");
    save("infra", "1.0.0");
    commit("chore: initial");
    git("tag", "ui-v0.3.2");
    git("tag", "infra-v1.0.0");
    writeFileSync(
      join(directory, "packages/ui/button.ts"),
      "export const button = 1;"
    );
    commit("feat(ui): add button");
    writeFileSync(join(directory, "packages/infra/README.md"), "Usage");
    commit("docs(infra): usage");
    writeFileSync(
      join(directory, "packages/ui/button.ts"),
      "export const button = 2;"
    );
    commit("fix(ui): refine button");
    process.chdir(directory);
    assert.deepEqual(
      prepare({ persist: false, registryCheck: () => true }).include.map(
        ({ name, version }) => [name, version]
      ),
      [
        ["@decadez/infra", "1.0.1"],
        ["@decadez/ui", "0.4.0"],
      ]
    );
    save("ui", "0.4.0");
    save("infra", "1.0.1");
    commit("chore(release): version changed packages");
    git("tag", "ui-v0.4.0");
    git("tag", "infra-v1.0.1");
    assert.deepEqual(
      prepare({ persist: false, registryCheck: () => true }).include,
      []
    );
    const retry = prepare({
      persist: false,
      registryCheck: (name) => name.endsWith("infra"),
    }).include;
    assert.equal(retry.length, 1);
    assert.equal(retry[0].version, "0.4.0");
    assert.equal(retry[0].ref, "ui-v0.4.0");
    writeFileSync(join(directory, "README.md"), "Unrelated docs update");
    commit("docs: update root guide");
    const laterRetry = prepare({
      persist: false,
      registryCheck: (name) => name.endsWith("infra"),
    }).include;
    assert.equal(laterRetry[0].ref, "ui-v0.4.0");
    writeFileSync(join(directory, "packages/infra/README.md"), "More usage");
    commit("docs(infra): another update");
    const mixed = prepare({
      persist: false,
      registryCheck: () => false,
    }).include;
    assert.equal(
      mixed.find(({ name }) => name.endsWith("ui")).ref,
      "ui-v0.4.0"
    );
    assert.equal(
      mixed.find(({ name }) => name.endsWith("infra")).ref,
      "infra-v1.0.2"
    );
  } finally {
    process.chdir(previous);
    rmSync(directory, {
      recursive: true,
      force: true,
      maxRetries: 3,
      retryDelay: 100,
    });
  }
});

test("first release includes skipped pushes since automation was added", () => {
  const directory = mkdtempSync(join(tmpdir(), "decadez-release-first-"));
  const previous = process.cwd();
  const git = (...args) =>
    execFileSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
      cwd: directory,
      encoding: "utf8",
    }).trim();
  try {
    git("init");
    git("config", "core.fsmonitor", "false");
    git("config", "maintenance.auto", "false");
    git("config", "user.name", "Test");
    git("config", "user.email", "test@example.com");
    mkdirSync(join(directory, "packages/ui"), { recursive: true });
    writeFileSync(
      join(directory, "packages/ui/package.json"),
      JSON.stringify({ name: "@decadez/ui", version: "0.1.0" })
    );
    git("add", ".");
    git("commit", "-m", "chore: initial");
    mkdirSync(join(directory, ".github/workflows"), { recursive: true });
    writeFileSync(
      join(directory, ".github/workflows/release-packages.yml"),
      "on: push"
    );
    writeFileSync(join(directory, "packages/ui/button.ts"), "button");
    git("add", ".");
    git("commit", "-m", "feat: add preview and release automation");
    const latestBefore = git("rev-parse", "HEAD");
    writeFileSync(join(directory, "README.md"), "Docs");
    git("add", ".");
    git("commit", "-m", "docs: root docs");
    process.chdir(directory);
    const result = prepare({
      before: latestBefore,
      persist: false,
      registryCheck: () => true,
    });
    assert.equal(result.include[0].version, "0.2.0");
  } finally {
    process.chdir(previous);
    rmSync(directory, {
      recursive: true,
      force: true,
      maxRetries: 3,
      retryDelay: 100,
    });
  }
});

test("rejects version regression and ignores commit examples in bodies", () => {
  assert.throws(
    () => chooseVersion("0.3.0", "0.4.0", ["fix: color"]),
    /regressed/
  );
  assert.equal(
    releaseLevel(["docs(ui): usage\n\nExample:\nfeat(ui): button"]),
    "patch"
  );
  assert.equal(
    releaseLevel(["docs(ui): usage\n\nExample:\nfeat!: button"]),
    "patch"
  );
});
