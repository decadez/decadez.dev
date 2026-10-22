# Docs preview and package releases

- Move Sandpack components, styles, dependencies and editor helpers into apps/docs.
- Keep reusable UI and syntax highlighting in web-dev-ui; remove its sandbox exports.
- Load registered examples directly from local package sources for fast HMR; read
  their source at build time for preview/source/edit views in documentation.
- Release public packages when main changes their files. Conventional commits
  select patch/minor/breaking bumps; before 1.0, breaking changes bump minor.
- Persist release versions and per-package tags before publishing. Retry unpublished
  tagged versions without another bump. Publish in the same workflow dependency chain.
- Disable Vercel Git deployment of the API and exclude API-only Pages builds.
- Validate release calculations with Node tests, then type-check, build static docs,
  and check repository formatting.
