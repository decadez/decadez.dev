import { execFileSync } from "node:child_process";
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  appendFileSync,
} from "node:fs";
import { pathToFileURL } from "node:url";

export function releaseLevel(messages) {
  if (
    messages.some(
      (message) =>
        /^(\w+)(\([^\n]+\))?!:/.test(message.trimStart().split("\n")[0]) ||
        /^BREAKING[ -]CHANGE:\s+\S/m.test(message)
    )
  )
    return "breaking";
  return messages.some((message) =>
    /^feat(?:\([^\n]+\))?:/.test(message.trimStart().split("\n")[0])
  )
    ? "minor"
    : "patch";
}
export function nextVersion(version, level) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) throw new Error(`Expected stable semantic version: ${version}`);
  const [major, minor, patch] = match.slice(1).map(Number);
  if (level === "breaking")
    return major === 0 ? `0.${minor + 1}.0` : `${major + 1}.0.0`;
  if (level === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}
export function isNewer(left, right) {
  const a = left.split(".").map(Number),
    b = right.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] > b[i];
  }
  return false;
}
export function chooseVersion(current, baseline, messages) {
  nextVersion(current, "patch");
  nextVersion(baseline, "patch");
  if (isNewer(baseline, current))
    throw new Error(`Version regressed from ${baseline} to ${current}`);
  const required = nextVersion(baseline, releaseLevel(messages));
  return isNewer(current, required) ? current : required;
}
export function packageChanged(files, directory) {
  return files.some(
    (file) =>
      file.startsWith(`${directory}/`) &&
      !/\/(?:dist|node_modules)\//.test(file)
  );
}
const git = (...args) =>
  execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();

export function published(name, version) {
  try {
    const value = execFileSync(
      "npm",
      [
        "view",
        `${name}@${version}`,
        "version",
        "--json",
        "--registry=https://registry.npmjs.org",
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    );
    return JSON.parse(value) === version;
  } catch (error) {
    if (/E404/.test(error.stderr?.toString() ?? "")) return false;
    throw error;
  }
}

export function prepare({
  before,
  registryCheck = published,
  persist = true,
} = {}) {
  const releases = [],
    bumped = [];
  for (const entry of readdirSync("packages", { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const directory = `packages/${entry.name}`;
    const manifestPath = `${directory}/package.json`;
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    if (manifest.private) continue;
    let tag;
    try {
      tag = git(
        "describe",
        "--tags",
        "--abbrev=0",
        "--match",
        `${entry.name}-v*`,
        "HEAD"
      );
    } catch {
      /* First automated release. */
    }
    // On the first run, cover everything since automation was introduced. This
    // also covers pushes skipped by GitHub's single pending concurrency slot.
    const introduced = git(
      "log",
      "--diff-filter=A",
      "--format=%H",
      "--",
      ".github/workflows/release-packages.yml"
    )
      .split("\n")
      .filter(Boolean)
      .at(-1);
    let initialBase = before;
    if (introduced) {
      try {
        initialBase = git("rev-parse", `${introduced}^`);
      } catch {
        initialBase = undefined;
      }
    }
    const base =
      tag ||
      (initialBase && !/^0+$/.test(initialBase)
        ? initialBase
        : git("hash-object", "-t", "tree", "/dev/null"));
    const files = git(
      "diff",
      "--name-only",
      base,
      "HEAD",
      "--",
      directory
    ).split("\n");
    if (packageChanged(files, directory)) {
      let baseline = manifest.version;
      try {
        baseline = JSON.parse(git("show", `${base}:${manifestPath}`)).version;
      } catch {
        /* New package. */
      }
      const range =
        /^[0-9a-f]+$/.test(base) && git("cat-file", "-t", base) === "tree"
          ? "HEAD"
          : `${base}..HEAD`;
      const messages = git(
        "log",
        "--format=%B%x00",
        range,
        "--",
        directory
      ).split("\0");
      manifest.version = chooseVersion(manifest.version, baseline, messages);
      if (persist)
        writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
      bumped.push({ directory, tag: `${entry.name}-v${manifest.version}` });
      releases.push({
        directory,
        name: manifest.name,
        version: manifest.version,
        ref: `${entry.name}-v${manifest.version}`,
      });
    } else if (
      tag === `${entry.name}-v${manifest.version}` &&
      !registryCheck(manifest.name, manifest.version)
    ) {
      // A previous run committed the version but publishing failed. Reuse it.
      releases.push({
        directory,
        name: manifest.name,
        version: manifest.version,
        ref: `${entry.name}-v${manifest.version}`,
      });
    }
  }
  if (persist && bumped.length) {
    execFileSync("pnpm", ["install", "--lockfile-only", "--ignore-scripts"], {
      stdio: "inherit",
    });
    execFileSync(
      "pnpm",
      [
        "exec",
        "prettier",
        "--write",
        ...bumped.map(({ directory }) => `${directory}/package.json`),
      ],
      { stdio: "inherit" }
    );
    git(
      "add",
      "pnpm-lock.yaml",
      ...bumped.map(({ directory }) => `${directory}/package.json`)
    );
    git("commit", "-m", "chore(release): version changed packages");
    for (const { tag } of bumped) git("tag", tag);
    // Versions and tags reach the remote together, before the publish jobs start.
    git(
      "push",
      "--atomic",
      "origin",
      "HEAD:main",
      ...bumped.map(({ tag }) => `refs/tags/${tag}`)
    );
  }
  return { include: releases, ref: git("rev-parse", "HEAD") };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  if (process.argv[2] === "verify-release") {
    const directory = process.argv[3];
    const manifest = JSON.parse(
      readFileSync(`${directory}/package.json`, "utf8")
    );
    const tag = `${directory.split("/").at(-1)}-v${manifest.version}`;
    if (
      git("rev-parse", `refs/tags/${tag}^{commit}`) !== git("rev-parse", "HEAD")
    )
      throw new Error("Publish only the persisted release tag commit");
    git("merge-base", "--is-ancestor", "HEAD", "origin/main");
  } else if (process.argv[2] === "check-published") {
    const manifest = JSON.parse(
      readFileSync(`${process.argv[3]}/package.json`, "utf8")
    );
    if (process.env.GITHUB_OUTPUT)
      appendFileSync(
        process.env.GITHUB_OUTPUT,
        `published=${published(manifest.name, manifest.version)}\n`
      );
  } else {
    const result = prepare({ before: process.env.RELEASE_BEFORE });
    if (process.env.GITHUB_OUTPUT)
      appendFileSync(
        process.env.GITHUB_OUTPUT,
        `matrix=${JSON.stringify({ include: result.include })}\nref=${result.ref}\nhas-packages=${result.include.length > 0}\n`
      );
    console.log(JSON.stringify(result));
  }
}
