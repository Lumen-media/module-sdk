# @lumen-media/module-cli

Command-line tool for building [Lumen](https://github.com/Lumen-media/lumen) modules.

## Scaffold a new module

No install needed — use `npx`:

```bash
npx @lumen-media/module-cli init my-module
cd my-module
npm install
npm run build
```

This generates a ready-to-use module with `vite.config.ts`, TypeScript, React, CI workflow, and all scripts pre-configured.

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
| `npm run build` | Compiles the module to `dist/` |
| `npm run pack` | Builds and packages into a `.lumenpack` file |
| `npm run sync-manifest` | Syncs `version` and `description` from `package.json` to `manifest.json` |
| `npm version patch\|minor\|major` | Bumps version and auto-updates `manifest.json` |

## Releases (CI)

The generated module includes a GitHub Actions workflow at `.github/workflows/release.yml`. To publish a new version, go to **Actions → Release → Run workflow** and enter the version number. The workflow will bump the version, build the `.lumenpack`, and create a GitHub release automatically.

**Required setup** — the workflow needs write access to your repository. Enable it at:

- **Repository:** Settings → Actions → General → Workflow permissions → **Read and write permissions**
- **Organization (if applicable):** Org Settings → Actions → General → Workflow permissions → **Read and write permissions**

## Adding Tailwind CSS

```bash
npm install -D tailwindcss @tailwindcss/postcss
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
