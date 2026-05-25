# Lumen Module SDK

The public contract for building [Lumen](https://github.com/Lumen-media/lumen) modules. Source of truth for the types Lumen implements and module authors consume.

## Packages

| Package | Status | Purpose |
|---------|--------|---------|
| [`@lumen/module-sdk`](./packages/module-sdk) | scaffolded | Runtime types, `LumenPlugin`, React hooks, manifest schema |
| `@lumen/module-build` | not started | Vite plugin for module authors |
| `@lumen/module-cli` | not started | `lumen-module` CLI (`init`, `dev`, `build`, `pack`) |
| `@lumen/create-module` | not started | `pnpm create @lumen/module` scaffolder |

## Development

```bash
pnpm install
pnpm build         # build all packages
pnpm typecheck     # typecheck all packages
pnpm test          # run all tests
pnpm lint          # biome check
pnpm format        # biome format --write
```

## Releasing

Versioning is managed by [Changesets](https://github.com/changesets/changesets).

```bash
pnpm changeset           # describe a change
pnpm version-packages    # bump versions and update changelogs
pnpm release             # build and publish to npm
```

## Architecture

See [module-sdk-architecture.md](https://github.com/Lumen-media/lumen/blob/main/docs/architecture/module-sdk-architecture.md) in the Lumen repo for the full design.

## License

MIT
