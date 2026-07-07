# decadez.dev

A lightweight personal blog and portfolio built with Next.js, TypeScript, and
Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

## Static Build

```bash
GITHUB_PAGES=true \
NEXT_PUBLIC_URL=https://decadez.github.io/decadez.dev \
NEXT_PUBLIC_BASE_PATH=/decadez.dev \
npm run build
```

The GitHub Actions workflow publishes the static `out` directory to GitHub
Pages.
