const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/decadez.dev/ui" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
