# @decadez/nest-infra

Shared NestJS infrastructure utilities for Decadez services.

## Features

- Load local environment files with `loadEnvFiles()`
- Preload Vercel Edge Config with `EdgeConfigModule` and `EdgeConfigService`
- Auto-load Nest feature modules with `loadFeatureModules()`
- Wrap API responses with `ResponseInterceptor`
- Common empty-value utilities

## Usage

```ts
import { EdgeConfigModule, loadFeatureModules } from "@decadez/nest-infra";
```

## Publish

```bash
pnpm --filter @decadez/nest-infra build
pnpm --filter @decadez/nest-infra publish --access public
```
