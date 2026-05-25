# @lumen/module-cli

Command-line tool for building [Lumen](https://github.com/Lumen-media/lumen) modules.

> Pre-1.0. `build` / `pack` / `validate` are functional. `dev` and `init` ship in upcoming releases.

## Install

```bash
pnpm add -D @lumen/module-cli vite
```

The CLI installs `@lumen/module-build` automatically (as a runtime dependency). You still need `vite` in your project as a peer.

## Commands

```
lumen-module init <name>           Scaffold a new module
lumen-module build                 Build via Vite + @lumen/module-build
lumen-module pack                  Build, then zip dist/ into a .lumenpack
lumen-module validate [path]       Validate manifest.json (default ./manifest.json)
lumen-module dev [path]            Hot-reload against a running Lumen (planned)
lumen-module publish               Open a PR to community-modules (planned)
```

### Default Vite configuration

When `build` (or `pack`) is invoked and no `vite.config.{ts,js,mjs}` exists in the project root, the CLI applies `@lumen/module-build` automatically. Authors with custom Vite needs can drop a `vite.config.ts` of their own — the CLI defers to it.

## License

MIT
