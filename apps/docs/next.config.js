const path = require("node:path");

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/decadez.dev/ui" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  turbopack: { root: path.resolve(__dirname, "../..") },
  transpilePackages: ["@decadez/web-dev-ui"],
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_DOCS_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
