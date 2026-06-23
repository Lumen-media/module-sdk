# @lumen-media/module-sdk

TypeScript types and contracts for building [Lumen](https://github.com/Lumen-media/lumen) modules.

## Getting started

Scaffold a new module with the CLI (no install required):

```bash
npx @lumen-media/module-cli init my-module
```

## Manual install

```bash
pnpm add -D @lumen-media/module-sdk
```

## Usage

```ts
import { LumenPlugin, type LumenHost } from "@lumen-media/module-sdk";

export default class MyPlugin extends LumenPlugin {
  async onload(host: LumenHost) {
    host.commands.add({
      id: "my-plugin.hello",
      title: "Say hello",
      run: () => host.ui.notify({ message: "Hello from a module!" }),
    });
  }
}
```

## Key APIs

| API | Description |
|---|---|
| `host.panels.add(spec)` | Register a UI panel (`dialog`, `presenter.content`, `sidebar.right.tabs`) |
| `host.menus.addItem(menu, item)` | Add an item to a host menu |
| `host.commands.add(spec)` | Register a command palette entry |
| `host.ui.openDialog(id)` | Open a registered dialog panel |
| `host.presentation.project(id, props)` | Project a `presenter.content` panel to the media window |
| `host.presentation.clear()` | Hide the currently projected panel |
| `host.overlay.project(id, props)` | Project a `presenter.content` panel to the overlay window |
| `host.overlay.clear()` | Close/clear the overlay window |
| `host.data.json.get/set(key, value)` | Persist module data locally |

## Overlay output

Use `host.overlay` when a module needs a separate output window instead of taking over the media window. The overlay renders the same kind of panel as presentation output: register a `presenter.content` panel, then project that panel through `host.overlay.project`.

```tsx
host.panels.add({
  id: `${host.meta.id}.overlay`,
  slot: "presenter.content",
  component: OverlayView,
});

host.overlay.project(`${host.meta.id}.overlay`, {
  mode: "corner",
});

host.overlay.clear();
```

`host.presentation` and `host.overlay` are independent outputs. Use `presentation` for the media/presenter window and `overlay` for a dedicated overlay window that can stay synchronized through module events, props, or host events.

## License

MIT
