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
| `host.panels.add(spec)` | Register a UI panel (`dialog`, `presenter.content`, `sidebar.right.tabs`, `app.header.trailing`) |
| `host.menus.addItem(menu, item)` | Add an item to a host menu |
| `host.commands.add(spec)` | Register a command palette entry |
| `host.ui.openDialog(id)` | Open a registered dialog panel |
| `host.presentation.project(id, props)` | Project a `presenter.content` panel to the media window |
| `host.presentation.clear()` | Hide the currently projected panel |
| `host.presentation.requestPresenterControls()` | Show the presenter controls bar (opt-in) |
| `host.presentation.controls.slides(components)` | Set custom slide components in the controls strip (16:9) |
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

## Presenter controls

The presenter controls bar only appears when the module explicitly requests it. If a module projects content without calling `requestPresenterControls()`, the controls bar stays hidden.

```ts
// Show the presenter controls bar
host.presentation.requestPresenterControls();

// Set custom slide components rendered in the sequence strip (16:9 aspect ratio)
host.presentation.controls.slides([
  SlideComponentA,
  SlideComponentB,
]);
```

Each slide component is rendered inside a `16:9` aspect ratio container in the horizontal thumbnail strip. The controls bar is automatically hidden when the projection is cleared via `host.presentation.clear()`.

## Header trailing slot

Use `app.header.trailing` for compact operator-facing UI in the right side of the main app header. Lumen wraps each module item in a constrained container so modules can expose a small status chip, icon, or action without taking over the header.

```tsx
host.panels.add({
  id: `${host.meta.id}.header-status`,
  slot: "app.header.trailing",
  component: () => (
    <button type="button" onClick={() => host.ui.openDialog(`${host.meta.id}.dialog`)}>
      Open module
    </button>
  ),
});
```

Keep header content short and action-oriented. Good fits are live timer states, compact connection indicators, or quick actions that reopen the module's main dialog.
## License

MIT

