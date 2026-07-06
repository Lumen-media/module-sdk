# Commander API

The Commander is Lumen's command palette — opened with **Ctrl+K** (or Cmd+K on macOS). Modules can register two kinds of entries: **actions** that run a function, and **apps** that open a full embedded UI inside the palette.

All registrations go through `host.commands.add(spec)` inside `onload`. The returned `Disposable` is automatically called when the module unloads, removing the entry from the palette.

---

## CommandSpec

```ts
interface CommandSpec {
  id: string;                                         // unique, e.g. "my-module.do-something"
  title: string;                                      // shown as the row title
  subtitle?: string;                                  // secondary line shown below the title
  icon?: ComponentType<{ className?: string }>;       // lucide-react icon or any React component
  keybinding?: string;                                // shown as shortcut badge, e.g. "Ctrl+Shift+P"
  keywords?: string[];                                // extra search terms (not displayed)
  type?: 'action' | 'app';                            // default: 'action'
  run?: (args?: unknown) => unknown;                  // called on Enter (action)
  component?: ComponentType<CommanderAppProps>;       // rendered inside the palette (app)
  commanderSearch?: boolean | CommanderSearchOptions; // opt into the app-view search input
}
```

---

## Action — runs a function

Use `type: 'action'` (or omit `type`) for commands that execute immediately when the user presses Enter or clicks the row.

```ts
import { LumenPlugin, type LumenHost } from '@lumen/module-sdk';

export default class MyPlugin extends LumenPlugin {
  onload(host: LumenHost) {
    const cmd = host.commands.add({
      id: 'my-module.say-hello',
      title: 'Say Hello',
      subtitle: 'Sends a greeting notification',
      keybinding: 'Ctrl+Shift+H',
      keywords: ['greet', 'hello', 'notification'],
      type: 'action',
      run() {
        host.ui.notify({ message: 'Hello from my module!' });
      },
    });
    // cmd.dispose() is called automatically on unload
  }
}
```


What happens when the user selects this entry:
1. `run()` is called immediately.
2. The commander closes.

---

## App — opens an embedded UI

Use `type: 'app'` for commands that open a screen inside the commander instead of closing it. The user sees a back arrow (`←`) in the header and can return to the main list.

Your component always receives `{ onClose, onBack }` as props. If the command enables `commanderSearch`, it also receives the current search input value and helpers:

```ts
interface CommanderSearchAccessoryProps {
  query: string;
  setQuery: (query: string) => void;
  close: () => void;
  back: () => void;
}

type CommanderSearchTrailingComponent = ComponentType<CommanderSearchAccessoryProps>;

interface CommanderSearchOptions {
  placeholder?: string;
  initialQuery?: string;
}

interface CommanderAppProps {
  onClose: () => void;
  onBack: () => void;
  query?: string;
  setQuery?: (query: string) => void;
  setSearchTrailing?: Dispatch<SetStateAction<CommanderSearchTrailingComponent | undefined>>;
}
```


### App search input and trailing slot

Apps do not show a search input by default. Add `commanderSearch` to the command when the app should use the commander's header input.

```tsx
import { Settings } from 'lucide-react';
import { LumenPlugin, type CommanderAppProps, type LumenHost } from '@lumen/module-sdk';

function SearchScreen({ query = '', setSearchTrailing }: CommanderAppProps) {
  React.useEffect(() => {
    if (!setSearchTrailing) return;

    setSearchTrailing(() => function SearchActions() {
      return <button aria-label="Settings"><Settings size={16} /></button>;
    });

    return () => setSearchTrailing(undefined);
  }, [setSearchTrailing]);

  return <div>Searching for {query}</div>;
}

export default class SearchPlugin extends LumenPlugin {
  onload(host: LumenHost) {
    host.commands.add({
      id: 'my-module.search',
      title: 'Search My Service',
      type: 'app',
      commanderSearch: {
        placeholder: 'Search my service...',
        initialQuery: '',
      },
      component: SearchScreen,
    });
  }
}
```

`commanderSearch: true` enables the input with the app title as its placeholder. Passing an object lets you set `placeholder` and `initialQuery`. Use `setSearchTrailing` for compact actions that belong beside the input, such as settings, filters, or refresh. Clear it on unmount so the next app view starts clean.

### Example

```tsx
import { LumenPlugin, type LumenHost, type CommanderAppProps } from '@lumen/module-sdk';

function SettingsScreen({ onClose, onBack }: CommanderAppProps) {
  return (
    <div className="p-4 flex flex-col gap-3">
      <p>Configure my module here.</p>
      <button onClick={onBack}>← Back</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default class MyPlugin extends LumenPlugin {
  onload(host: LumenHost) {
    host.commands.add({
      id: 'my-module.settings',
      title: 'My Module — Settings',
      subtitle: 'Open configuration',
      type: 'app',
      component: SettingsScreen,
    });
  }
}
```

What happens when the user selects this entry:
1. The commander stays open.
2. The header shows the command `title` and a `←` back button.
3. Your component renders in the body area.
4. Calling `onBack()` returns to the main list; `onClose()` dismisses the palette entirely.

---

## Invoking a command programmatically

Any module can invoke a registered command by id:

```ts
host.commands.invoke('my-module.say-hello');
// with optional args:
host.commands.invoke('my-module.do-thing', { target: 'foo' });
```

The `args` value is forwarded to the command's `run(args)` function. Returns whatever `run` returns, or `undefined` if the command is not found.

---

## Search behaviour

The commander searches `title`, `subtitle`, and every string in `keywords` together. Add `keywords` for terms users might type that don't appear in the title:

```ts
host.commands.add({
  id: 'my-module.clear-cache',
  title: 'Clear Cache',
  keywords: ['reset', 'flush', 'purge', 'limpar', 'cache'],
  type: 'action',
  run() { /* ... */ },
});
```

---

## Badge labels

| `type`    | Badge shown in the list |
|-----------|-------------------------|
| `'action'` (default) | `COMMAND` |
| `'app'`   | `APP`      |

---

---

## Prefix search

Prefixes let a module intercept typed queries that start with a specific word. When the user types `bible foo`, the commander routes `foo` to your handler instead of running the normal search. Results are shown in a dedicated group labeled with the prefix `title`.

### PrefixSpec

```ts
interface PrefixSpec {
  prefix: string;          // trigger word, e.g. "bible"
  title: string;           // group heading in the results list, e.g. "Bible"
  icon?: ComponentType<{ className?: string }>;
  placeholder?: string;    // input placeholder while prefix is active
  handle(query: string): PrefixResult[] | Promise<PrefixResult[]>;
}

interface PrefixResult {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;          // defaults to the prefix title
  run?: () => void;        // called on Enter
  component?: ComponentType<CommanderAppProps>;  // opens an app screen
  commanderSearch?: boolean | CommanderSearchOptions;
}
```

A `PrefixResult` that opens a `component` can also set `commanderSearch`. This is how a prefix handler can open an app screen while keeping the typed prefix query in the commander's header input:

```ts
return [{
  id: 'external-search',
  title: `Search for "${query}"`,
  component: SearchScreen,
  commanderSearch: { placeholder: 'Search...', initialQuery: query },
}];
```

### Registration

```ts
export default class BiblePlugin extends LumenPlugin {
  onload(host: LumenHost) {
    host.commands.addPrefix({
      prefix: 'bible',
      title: 'Bible',
      placeholder: 'Type a reference (1Jo 2:1) or a phrase...',
      handle(query) {
        if (!query) return [];
        // verse reference pattern: "1jo 2:1", "john 3:16"
        if (/^\w+\s+\d+:\d+/.test(query)) {
          return [
            {
              id: `verse:${query}`,
              title: `Go to ${query}`,
              subtitle: 'Open verse in Bible viewer',
              run() { host.bus.emit('bible:navigate', { ref: query }); },
            },
          ];
        }
        // phrase search — async example
        return searchBibleAsync(query).then((verses) =>
          verses.map((v) => ({
            id: `verse:${v.ref}`,
            title: v.text,
            subtitle: v.ref,
            badge: 'VERSE',
            run() { host.bus.emit('bible:navigate', { ref: v.ref }); },
          }))
        );
      },
    });
  }
}
```

### Built-in scope prefixes

The following prefixes are built into the commander and reroute the search scope automatically — no module registration needed:

| Prefix | Scope |
|---|---|
| `lyric <query>` | Lyrics only |
| `lyrics <query>` | Lyrics only |
| `song <query>` | Lyrics only |
| `media <query>` | Media (audio, video, image) |
| `audio <query>` | Media |
| `video <query>` | Media |
| `image <query>` | Media |
| `cmd <query>` | Commands & Shortcuts |
| `command <query>` | Commands & Shortcuts |

Example: typing `lyric amazing grace` is equivalent to switching to the **Lyrics** tab and searching for `amazing grace`.

---

## Full example — action + app in one module

```tsx
import { LumenPlugin, type LumenHost, type CommanderAppProps } from '@lumen/module-sdk';
import { Settings } from 'lucide-react';

function ConfigPanel({ onBack }: CommanderAppProps) {
  return (
    <div className="p-4">
      <h2 className="text-sm font-semibold mb-2">Raffle Settings</h2>
      {/* ... form fields ... */}
      <button onClick={onBack}>Done</button>
    </div>
  );
}

export default class RafflePlugin extends LumenPlugin {
  onload(host: LumenHost) {
    host.commands.add({
      id: 'raffle.draw',
      title: 'Draw Raffle Winner',
      icon: Settings,
      keybinding: 'Ctrl+Shift+R',
      keywords: ['sorteio', 'winner', 'random'],
      type: 'action',
      run() {
        const winner = Math.random().toString(36).slice(2, 8);
        host.ui.notify({ title: 'Winner!', message: winner });
      },
    });

    host.commands.add({
      id: 'raffle.config',
      title: 'Raffle — Configure',
      subtitle: 'Set participants and rules',
      icon: Settings,
      type: 'app',
      component: ConfigPanel,
    });
  }
}
```
