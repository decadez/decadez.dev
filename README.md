# decadez.dev

`decadez.dev` is a pnpm monorepo for the Decadez personal site, API service,
and shared NestJS infrastructure package.

## Apps

- `apps/web` - Next.js static blog and portfolio site.
- `apps/api` - NestJS API with URI versioning enabled. Current health endpoints
  live under `/v1/health`.
- `packages/nest-infra` - shared NestJS infrastructure package used by API
  services.

## Directory Structure

```text
.
├── apps
│   ├── api
│   │   ├── src
│   │   │   ├── app.module.ts
│   │   │   ├── main.ts
│   │   │   └── modules
│   │   │       └── health
│   │   │           └── v1
│   │   │               ├── health.controller.ts
│   │   │               └── health.module.ts
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── web
│       ├── components
│       ├── contents
│       ├── pages
│       ├── public
│       ├── sections
│       └── styles
├── packages
│   └── nest-infra
│       ├── src
│       │   ├── edge-config
│       │   ├── modules
│       │   ├── redis
│       │   ├── response
│       │   ├── supabase
│       │   ├── utils
│       │   ├── env.ts
│       │   └── index.ts
│       ├── README.md
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── .github
│   └── workflows
├── AGENTS.md
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

Key conventions:

- API business features live in `apps/api/src/modules/<feature>/<version>`.
- Each API feature version should expose its own Nest module, such as
  `health/v1/health.module.ts`.
- Shared backend infrastructure belongs in `packages/nest-infra/src`.
- Web content and UI remain under `apps/web`.

## Backend Infrastructure

`@decadez/nest-infra` provides reusable backend building blocks:

- environment loading from `.env.local` and `.env`
- Vercel Edge Config preload through `EdgeConfigModule`
- Supabase server client through `SupabaseModule`
- Redis client through `RedisModule`, with automatic best-effort LRU policy
  setup
- automatic feature module loading from `modules/**`
- unified API response wrapping with `ResponseInterceptor`
- small utility helpers such as empty-value checks

The API loads feature modules from `apps/api/src/modules`. Versioned controllers
should be placed under a version folder such as `modules/<feature>/v1`.

## Environment

The API expects local environment variables in `apps/api/.env.local`. Pull them
from Vercel with:

```bash
cd apps/api
pnpm dlx vercel env pull
```

Important backend variables include:

- `EDGE_CONFIG`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `REDIS_URL`

## Scripts

- `pnpm dev:web` - start the web app
- `pnpm dev:api` - start the API
- `pnpm lint` - type-check/lint all workspaces
- `pnpm build` - build all workspaces
- `pnpm publish:nest-infra` - publish the shared infrastructure package

## Development

```bash
pnpm install
pnpm dev:web
pnpm dev:api
```

## Static Build

```bash
GITHUB_PAGES=true \
NEXT_PUBLIC_URL=https://decadez.github.io/decadez.dev \
NEXT_PUBLIC_BASE_PATH=/decadez.dev \
pnpm --filter @decadez/web build
```

The GitHub Actions workflow publishes the static `out` directory to GitHub
Pages.

## Package Publishing

`packages/nest-infra` can be published manually or by GitHub Actions. The
workflow `.github/workflows/publish-nest-infra.yml` runs on `nest-infra-v*` tags
and requires `NPM_TOKEN` in repository secrets.
