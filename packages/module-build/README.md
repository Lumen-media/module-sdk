# @lumen/module-build

Vite plugin for building [Lumen](https://github.com/Lumen-media/lumen) modules.

> Pre-1.0. Used through `@lumen/module-cli` `build` / `pack` by default; can also be wired into a custom Vite config directly.

## Install

```bash
pnpm add -D @lumen/module-build vite
```

## Usage

`vite.config.ts` at the module's project root:

```ts
import { defineConfig } from "vite";
import lumenModule from "@lumen/module-build";

export default defineConfig({
  plugins: [lumenModule()],
});
```

The plugin:

- Validates `manifest.json` against the canonical schema from `@lumen/module-sdk`.
- Bundles `src/main.ts` into `dist/main.js` (single ESM file).
- Externalizes `react`, `react-dom`, `@lumen/ui`, `@lumen/module-sdk` (resolved against the host at runtime via the Lumen import map).
- Copies `manifest.json`, optional `styles.css`, optional `assets/` to `dist/`.
- Warns on CSS selectors not namespaced under `.lumen-mod-{id}`.

## Options

```ts
lumenModule({
  manifest: "manifest.json",   // default
  entry: "src/main.ts",        // default
  styles: "styles.css",        // default, copied only if present
  assets: "assets",            // default, copied only if present
});
```

## Architecture

See [module-sdk-architecture.md](https://github.com/Lumen-media/lumen/blob/main/docs/architecture/module-sdk-architecture.md).

## License

MIT
