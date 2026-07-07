/** @type {import('next').NextConfig} */

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/decadez.dev" : "";

module.exports = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx", "html"],
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
  compiler: {
    removeConsole: true,
  },
};

// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
