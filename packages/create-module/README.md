# @lumen/create-module

Scaffolder for new [Lumen](https://github.com/Lumen-media/lumen) modules.

## Use

```bash
pnpm create @lumen/module my-module
```

Creates `./my-module/` with the starter template (manifest, src/main.ts, package.json). Next:

```bash
cd my-module
pnpm install
pnpm build
```

## Programmatic API

```ts
import { scaffoldModule } from "@lumen/create-module";

await scaffoldModule("My Module", { cwd: process.cwd() });
```

## License

MIT
