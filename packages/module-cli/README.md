# @lumen-media/module-cli

Command-line tool for building [Lumen](https://github.com/Lumen-media/lumen) modules.

## Scaffold a new module

No install needed — use `npx`:

```bash
npx @lumen-media/module-cli init my-module
cd my-module
pnpm install
pnpm build
```

This generates a ready-to-use module with `vite.config.ts`, TypeScript, React, and all scripts pre-configured.

## Commands

```
lumen-module init <name>       Scaffold a new module from the starter template
lumen-module build             Build the module via Vite
lumen-module pack              Build, then zip dist/ into {id}-{version}.lumenpack
lumen-module validate [path]   Validate manifest.json (default: ./manifest.json)
```

## Scripts included in the generated module

| Script | Description |
|---|---|
| `pnpm build` | Compiles the module to `dist/` |
| `pnpm pack` | Builds and packages into a `.lumenpack` file |
| `pnpm sync-manifest` | Syncs `version` and `description` from `package.json` to `manifest.json` |
| `pnpm version patch\|minor\|major` | Bumps version and auto-updates `manifest.json` |

## Adding Tailwind CSS

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

Then add to `vite.config.ts`:

```ts
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  // ...
});
```

Create `src/styles.css`:

```css
@import "tailwindcss/utilities";
@source "./**/*.tsx";
```

Import it in `src/main.ts` as inline CSS and inject on load.

## License

MIT
