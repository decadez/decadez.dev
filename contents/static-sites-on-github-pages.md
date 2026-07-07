---
title: Static Sites on GitHub Pages
description: Notes from deploying a static Next.js site to GitHub Pages.
excerpt: A compact deployment checklist for a static Next.js site served from a GitHub Pages project path.
datetime: 2026-07-07T12:10:00.000+08:00
featured: true
category: Engineering
author: decadez
type: article
coverImage: ""
coverImageAlt: ""
coverImageWidth: "1200"
coverImageHeight: "700"
ogImage: ""
ogImageAlt: GitHub Pages deployment notes
language: English
slug: static-sites-on-github-pages
tags:
  - Next.js
  - GitHub Pages
  - Deployment
---

GitHub Pages project sites are served from a subpath like
`/decadez.dev`. Static Next.js sites need to know that path at build time.

## Checklist

- Use static export output.
- Set `basePath` and `assetPrefix` for the repository path.
- Avoid server routes and runtime-only data fetching.
- Generate `sitemap.xml` before the build.
- Add `.nojekyll` to the exported output.

The result is boring in the best way: a static directory that GitHub Pages can
host without any server process.
