# @lumen/module-sdk

Public contract for building [Lumen](https://github.com/Lumen-media/lumen) modules.

> Pre-1.0. Types only. Breaking changes will land in minor bumps until 1.0.0.

## Install

```bash
pnpm add -D @lumen/module-sdk
```

## Usage

```ts
import { LumenPlugin, type LumenHost } from "@lumen/module-sdk";

export default class MyPlugin extends LumenPlugin {
  async onload(host: LumenHost) {
    host.commands.add({
      id: "my-plugin.hello",
      title: "Say hello",
      run: () => host.ui.notify({ message: "Hello from a module" }),
    });
  }
}
```

## Architecture

See [module-system-architecture.md](https://github.com/Lumen-media/lumen/blob/main/docs/architecture/module-system-architecture.md) and [module-sdk-architecture.md](https://github.com/Lumen-media/lumen/blob/main/docs/architecture/module-sdk-architecture.md) in the Lumen repo.

## License

MIT
