## Outputs

Public packages ship compiled JavaScript and TypeScript declarations. The UI package also exports `@decadez/web-dev-ui/styles.css`. Sandbox editing and preview infrastructure belong to `apps/docs` and are no longer exported by `@decadez/web-dev-ui/mdx` in 0.4.0.

## Automatic releases

Updates merged into `main` under a public `packages/*` directory start the package release workflow. Private packages and generated `dist` files are excluded. Application changes do not publish packages. Feature branches and `dev/*` branches validate work without publishing stable releases.

Each affected package uses the highest Conventional Commit change level in its own file history: `feat` increments minor; `fix`, docs, refactor and other changes increment patch; `!` or a `BREAKING CHANGE:` footer increments major after 1.0 and minor before 1.0. Use package scopes such as `feat(web-dev-ui): add button state` and `fix(nest-infra): reconnect Redis`. An explicit version in `package.json` is preserved when it meets or exceeds the required bump.

Versions and the pnpm lockfile are committed together on main, with tags such as `web-dev-ui-v0.4.0`. The same workflow calls the package publishing workflow directly, because tags pushed by `GITHUB_TOKEN` do not start another workflow. Changes are compared with each package's latest release tag so a queued push cannot lose an earlier package update.

## Repository setup and retries

Allow GitHub Actions to write contents and allow its release commit to main under branch protection. Configure the repository secret `NPM_TOKEN` with npm publish permission for these packages and provenance support. The reusable publishing workflow checks, builds and publishes only affected packages.

A failed publish leaves its committed version and tag available. Rerun the failed workflow, or run `Release changed packages` manually: an unpublished tagged version is retried without another version bump. Already published versions are skipped. Registry errors other than a missing version stop the release. The individual manual package workflows retry only an existing persisted release tag on main. A version regression stops preparation.

## Preview development

Run `pnpm dev:docs`. Component examples live in `apps/docs/examples` and import the local UI package through Next.js source aliases, so package edits update previews through HMR. Register the dynamic import in `ExamplePreview.tsx` and add `<ExamplePreview name="button" />` to Markdown. Documentation reads that example file for the Source and Edit & run views. Preview loads locally; Edit & run starts the docs-only Sandpack editor and uses the published npm component package inside its isolated runtime. The editor injects the stylesheet already compiled by Next.js, avoiding Tailwind processing in Sandpack.

## Deployments

GitHub Pages continues to build the web and docs applications. API-only and nest-infra-only updates skip the Pages workflow. Vercel Git deployment is temporarily disabled through both the repository root and API root `vercel.json`, covering either configured Vercel root directory. Manual Vercel CLI deployments remain available.
