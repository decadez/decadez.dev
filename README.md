# decadez.dev

pnpm monorepo for the Decadez website, component documentation, API and reusable packages. Use Node.js 22 and pnpm 11.7.0.

## Applications and packages

- `apps/web` — Next.js static site and blog
- `apps/docs` — component previews, source examples and docs-only Sandpack editor
- `apps/api` — NestJS API; automatic Vercel Git deployment is temporarily disabled
- `packages/web-dev-ui` — reusable React UI and MDX primitives
- `packages/nest-infra` — reusable NestJS infrastructure

## Development

```bash
pnpm install
pnpm dev:web
pnpm dev:docs
pnpm dev:api
```

Run `pnpm lint`, `pnpm format:check`, `pnpm test:release` and `pnpm test:animations` for validation. Run `pnpm build:web` or `pnpm build:docs` for frontend builds; `pnpm build` builds the API.

## Component previews

Examples in `apps/docs/examples` import local package sources for HMR. Markdown references `<ExamplePreview name="button" />` for Preview, Source, Edit & run and Reset controls. Sandpack components and dependencies live exclusively in `apps/docs`; the UI package no longer exports sandbox APIs as of 0.4.0.

## CSS animations

43 animations from the local css-animations package are integrated into `web-dev-ui` under `@decadez/web-dev-ui/animations`. Individual imports such as `@decadez/web-dev-ui/animations/walking-cat` keep the feature separate from ordinary UI. The docs Animations catalog provides live playback, source and local-source editing. Original MIT attribution is included in the published package.

## Releases and deployment

Public package changes on `main` automatically select Conventional Commit versions, persist manifests/lockfile/tags, and publish only affected packages. Retry uses the same persisted release tag. Configure `NPM_TOKEN` and permit the Actions release commit on main. See [publishing rules](apps/docs/content/patterns/publishing.md) for version policy and recovery.

The Pages workflow builds `apps/web` and `apps/docs`, serving docs under `/decadez.dev/ui`. API-only updates skip it. Root and API `vercel.json` disable automatic Git deployments; manual API deployments remain possible.
