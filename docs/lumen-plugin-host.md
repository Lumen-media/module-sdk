# Guia da SDK: `LumenPlugin` e `LumenHost`

Este guia descreve o contrato publico atual de `@lumen-media/module-sdk` para criar modulos do Lumen. Ele foca no que um autor de modulo pode fazer com `LumenPlugin` e com o `host` recebido em `onload`.

## Comeco rapido

```ts
import { LumenPlugin, type LumenHost } from "@lumen-media/module-sdk";

export default class MyPlugin extends LumenPlugin {
	async onload(host: LumenHost) {
		host.log.info("loaded", host.meta);

		host.commands.add({
			id: `${host.meta.id}.hello`,
			title: "Say hello",
			run: () => host.ui.notify({ message: "Hello from a module!" }),
		});
	}

	async onunload() {
		// Cleanup extra, se voce criou timers, observers ou conexoes proprias.
	}
}
```

## `LumenPlugin`

`LumenPlugin` e a classe base que todo modulo deve exportar como default.

```ts
export abstract class LumenPlugin {
	abstract onload(host: LumenHost): void | Promise<void>;
	onunload?(): void | Promise<void>;
}
```

| Metodo | Quando roda | Uso comum |
|---|---|---|
| `onload(host)` | Quando o Lumen carrega o modulo. | Registrar paineis, comandos, menus, listeners e inicializar dados. |
| `onunload()` | Quando o Lumen descarrega o modulo. | Limpar recursos externos ao host, como `setInterval`, `MutationObserver`, sockets proprios ou caches em memoria. |

As APIs de registro do host retornam `Disposable`. Guarde o disposable quando quiser remover algo antes do unload.

```ts
const command = host.commands.add({
	id: "my-plugin.temporary",
	title: "Temporary command",
	run: () => undefined,
});

command.dispose();
```

## Manifest do modulo

O manifest descreve o modulo para o CLI, para o empacotador e para o app host.

```json
{
	"id": "my-plugin",
	"name": "My Plugin",
	"version": "1.0.0",
	"api": "^0.1.0",
	"minLumenVersion": "0.4.0",
	"description": "Adds a useful workflow to Lumen",
	"author": {
		"name": "Your Name",
		"url": "https://example.com"
	},
	"entry": "main.js",
	"icon": "assets/icon.png",
	"keywords": ["lumen", "plugin"]
}
```

| Campo | Tipo | Obrigatorio | Descricao |
|---|---|---:|---|
| `id` | `string` | Sim | Id unico do modulo. Use como prefixo para comandos, paineis e topicos. |
| `name` | `string` | Sim | Nome exibido ao usuario. |
| `version` | `string` | Sim | Versao do modulo. |
| `api` | `string` | Sim | Range da versao da SDK/API alvo. |
| `minLumenVersion` | `string` | Sim | Versao minima do Lumen necessaria para rodar. |
| `description` | `string` | Nao | Descricao curta. |
| `author` | `string` ou `{ name, url?, email? }` | Nao | Autor ou mantenedor. |
| `entry` | `string` | Nao | Entrada ESM gerada pelo build. |
| `icon` | `string` | Nao | Caminho do icone empacotado. |
| `homepage` | `string` | Nao | Site do modulo. |
| `repository` | `string` | Nao | Repositorio do modulo. |
| `license` | `string` | Nao | Licenca. |
| `keywords` | `string[]` | Nao | Palavras-chave para descoberta. |

## `LumenHost`

`LumenHost` e o objeto entregue ao modulo em `onload`. Ele e a ponte entre o modulo e o app.

```ts
export interface LumenHost {
	meta: { id: string; version: string };
	window: "main" | "presenter";
	app: { version: string; locale: string };

	panels: PanelsAPI;
	commands: CommandsAPI;
	menus: MenusAPI;
	ui: UIAPI;

	bus: BusAPI;
	events: BusAPI;

	data: DataAPI;
	settings: SettingsAPI;

	lyrics: LyricsHostAPI;
	queue: QueueHostAPI;
	library: LibraryHostAPI;
	player: PlayerHostAPI;
	presentation: PresentationHostAPI;
	themes: ThemesHostAPI;
	fonts: FontsAPI;

	log: LoggerAPI;
}
```

## Contexto do host

| Campo | Uso |
|---|---|
| `host.meta.id` | Id do modulo carregado. |
| `host.meta.version` | Versao do modulo carregado. |
| `host.window` | Janela atual: `"main"` ou `"presenter"`. |
| `host.app.version` | Versao do app Lumen. |
| `host.app.locale` | Locale atual do app. |

Use `host.window` para separar a UI principal da UI de apresentacao.

```ts
async onload(host: LumenHost) {
	if (host.window === "presenter") {
		registerPresenter(host);
		return;
	}

	registerMainWindow(host);
}
```

## Mapa das APIs

| API | O que permite fazer |
|---|---|
| `host.panels` | Registrar componentes React em slots do app. |
| `host.commands` | Adicionar comandos, apps e prefixos na command palette. |
| `host.menus` | Registrar menus ou adicionar itens a menus existentes. |
| `host.ui` | Mostrar notificacoes, confirmar, pedir texto, abrir command palette, dialog, seletor de background e seletor de midia. |
| `host.bus` | Publicar e ouvir topicos compartilhados. |
| `host.events` | Publicar e ouvir eventos com a mesma interface do bus. |
| `host.data` | Persistir JSON e usar SQLite escopados ao modulo. |
| `host.settings` | Carregar, salvar e observar configuracoes do modulo. |
| `host.queue` | Ler estado da fila, observar mudancas e navegar (next/previous/goTo). |
| `host.presentation` | Projetar ou limpar uma view na janela de apresentacao. |
| `host.themes` | Ler tema atual e observar mudancas. |
| `host.fonts` | Listar fontes disponiveis. |
| `host.log` | Escrever logs prefixados pelo modulo. |
| `host.player` | Controlar o player ativo: nextSlide, play por id. |
| `host.lyrics`, `host.library` | Reservados no contrato atual da SDK. |

## Paineis com `host.panels`

Registre componentes React em slots do Lumen.

```tsx
function ToolsPanel() {
	return <div>Tools</div>;
}

host.panels.add({
	id: `${host.meta.id}.tools`,
	slot: "sidebar.right.tabs",
	title: "Tools",
	component: ToolsPanel,
	when: () => true,
});
```

Slots disponiveis no tipo da SDK:

| Slot | Uso esperado |
|---|---|
| `sidebar.left.tabs` | Abas da lateral esquerda. |
| `sidebar.right.tabs` | Abas da lateral direita. |
| `main.center` | Area central principal. |
| `dialog` | Conteudo de dialog aberto por `host.ui.openDialog(id)`. |
| `presenter.content` | Conteudo para a janela de apresentacao. |
| `settings.section` | Secao de configuracoes. |
| `command-palette.section` | Secao dentro da command palette. |
| `editor.lyrics.toolbar` | Toolbar do editor de letras. |

## Comandos com `host.commands`

### Comando de acao

```ts
host.commands.add({
	id: `${host.meta.id}.refresh`,
	title: "Refresh module data",
	subtitle: "Reload local cache",
	keywords: ["sync", "reload"],
	keybinding: "Ctrl+Shift+R",
	run: async (args) => {
		host.log.info("refresh requested", args);
		host.ui.notify({ message: "Data refreshed" });
	},
});
```

### Comando app

Um comando do tipo `"app"` renderiza uma subinterface React dentro da command palette.

```tsx
import type { CommanderAppProps } from "@lumen-media/module-sdk";

function BrowserCommand({ onBack, onClose }: CommanderAppProps) {
	return (
		<div>
			<button onClick={onBack}>Back</button>
			<button onClick={onClose}>Close</button>
		</div>
	);
}

host.commands.add({
	id: `${host.meta.id}.browser`,
	title: "Open module browser",
	type: "app",
	component: BrowserCommand,
});
```

### Prefixos de busca

Prefixos deixam a command palette rotear uma consulta para o modulo.

```ts
host.commands.addPrefix({
	prefix: "note",
	title: "Notes",
	placeholder: "Search notes...",
	async handle(query) {
		const notes = await searchNotes(query);

		return notes.map((note) => ({
			id: note.id,
			title: note.title,
			subtitle: note.summary,
			badge: "NOTE",
			run: () => openNote(note.id),
		}));
	},
});
```

Tambem e possivel chamar um comando por id:

```ts
host.commands.invoke(`${host.meta.id}.refresh`, { force: true });
```

## Menus com `host.menus`

```ts
host.menus.register({
	id: `${host.meta.id}.menu`,
	label: "My Plugin",
	priority: 50,
	items: [
		{
			type: "action",
			id: `${host.meta.id}.open`,
			label: "Open",
			onClick: () => host.ui.openDialog(`${host.meta.id}.dialog`),
		},
		{ type: "separator" },
		{
			type: "submenu",
			label: "Tools",
			items: [
				{
					type: "action",
					id: `${host.meta.id}.refresh-menu`,
					label: "Refresh",
					shortcut: "Ctrl+R",
					onClick: () => host.commands.invoke(`${host.meta.id}.refresh`),
				},
			],
		},
	],
});
```

Para adicionar um item em um menu existente:

```ts
host.menus.addItem("file", {
	type: "action",
	id: `${host.meta.id}.import`,
	label: "Import from plugin",
	onClick: () => host.ui.notify({ message: "Import started" }),
});
```

## UI imperativa com `host.ui`

```ts
host.ui.notify({
	title: "Saved",
	message: "Settings saved",
	level: "info",
});

const confirmed = await host.ui.confirm({
	title: "Delete cache?",
	message: "This removes local plugin cache.",
	danger: true,
});

const name = await host.ui.prompt({
	title: "Preset name",
	placeholder: "Sunday morning",
	initial: "Default",
});

host.ui.openCommandPalette("note ");
host.ui.openDialog(`${host.meta.id}.dialog`);

// Abre o seletor de background (tema, imagem ou video)
host.ui.openBackgroundPicker((background) => {
	// background: { type: "theme" | "image" | "video", src: string, name: string }
	host.log.info("selected background", background);
});

// Abre o seletor de midia da biblioteca
host.ui.openMediaPicker((item) => {
	// item: LibraryItem
	host.log.info("selected media", item.id, item.title, item.type);
});
```

### `LibraryItem`

```ts
interface LibraryItem {
	id: string;
	title: string;
	type: "image" | "audio" | "video" | "lyric" | "presentation";
	thumbnail?: string;
}
```

## Comunicacao com `host.bus` e `host.events`

As duas APIs usam a mesma interface:

```ts
interface SelectedPayload {
	id: string;
}

const disposable = host.bus.on<SelectedPayload>(
	`${host.meta.id}:selected`,
	(payload) => {
		host.log.info("selected", payload.id);
	},
);

host.bus.emit<SelectedPayload>(`${host.meta.id}:selected`, { id: "abc" });
disposable.dispose();
```

Use nomes de topicos prefixados pelo id do modulo para evitar colisao com outros modulos.

## Dados persistentes com `host.data`

### JSON

```ts
interface PluginState {
	count: number;
}

const state = await host.data.json.get<PluginState>("state", { count: 0 });

await host.data.json.set("state", {
	count: state.count + 1,
});

const allData = await host.data.json.load();
await host.data.json.save(allData);
await host.data.json.delete("state");
```

### SQLite

```ts
const db = await host.data.sqlite();

await db.exec(
	"CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, title TEXT NOT NULL)",
);

await db.exec("INSERT INTO notes (id, title) VALUES (?, ?)", [
	"n1",
	"First note",
]);

const rows = await db.query<{ id: string; title: string }>(
	"SELECT id, title FROM notes",
);
```

## Settings com `host.settings`

O contrato atual de settings e orientado a carregar/salvar um objeto do modulo e observar mudancas.

```ts
interface PluginSettings {
	enabled: boolean;
	accent: string;
}

const settings = await host.settings.load<PluginSettings>();

await host.settings.save<PluginSettings>({
	enabled: settings?.enabled ?? true,
	accent: settings?.accent ?? "cyan",
});

const disposable = host.settings.onChange((next) => {
	host.log.info("settings changed", next);
});
```

## Fila com `host.queue`

```ts
const queue = host.queue.state();

host.log.info("current queue item", {
	currentIndex: queue.currentIndex,
	current: queue.currentIndex === null ? null : queue.items[queue.currentIndex],
});

host.queue.onChange((next) => {
	host.log.info("queue changed", next);
});

// Navegacao
host.queue.next();
host.queue.previous();
host.queue.goTo(2); // 0-based
```

Cada item da fila no contrato atual tem:

```ts
interface QueueItem {
	id: string;
	title: string;
}
```

| Metodo | Uso |
|---|---|
| `state()` | Retorna `{ items, currentIndex }`. |
| `onChange(handler)` | Observa mudancas no estado da fila. |
| `next()` | Avanca para o proximo item. |
| `previous()` | Volta para o item anterior. |
| `goTo(index)` | Vai para o item no indice informado (0-based). |

## Apresentacao com `host.presentation`

Registre uma view de presenter e depois projete essa view.

```tsx
function PresenterView(props: unknown) {
	return <main>{JSON.stringify(props)}</main>;
}

host.panels.add({
	id: `${host.meta.id}.presenter`,
	slot: "presenter.content",
	component: PresenterView,
});

host.presentation.project(`${host.meta.id}.presenter`, {
	title: "Live title",
});

host.presentation.onStateChange((state) => {
	host.log.info("presentation state", state);
});

host.presentation.clear();
```

APIs disponiveis:

| Metodo | Uso |
|---|---|
| `state()` | Retorna `"idle"` ou `"live"`. |
| `onStateChange(handler)` | Observa transicoes de apresentacao. |
| `project(viewId, props?)` | Projeta uma view registrada. |
| `clear()` | Limpa a apresentacao atual. |
| `isWindowOpen()` | Informa se a janela de apresentacao esta aberta. |

## Temas com `host.themes`

```ts
const currentTheme = host.themes.current();

host.themes.onChange((theme) => {
	host.log.info("theme changed", theme);
});
```

No contrato atual, o tema e representado por `string`.

## Fontes com `host.fonts`

```ts
const fonts = await host.fonts.list();
host.log.info("available fonts", fonts);
```

## Logs com `host.log`

```ts
host.log.debug("debug data");
host.log.info("module loaded");
host.log.warn("something to inspect");
host.log.error("something failed");
```

## Player com `host.player`

Controle o player de midia ativo.

```ts
// Avanca para o proximo slide (apresentacoes e letras)
host.player.nextSlide();

// Da play em um item da biblioteca pelo id
host.player.play("media-item-id");
```

| Metodo | Uso |
|---|---|
| `nextSlide()` | Avanca o slide da apresentacao ou lyric ativa. |
| `play(itemId)` | Da play no item da biblioteca com o id informado. |

## APIs reservadas

`host.lyrics` e `host.library` existem no shape de `LumenHost`, mas no contrato atual da SDK sao tipadas como `Record<string, never>`. Trate essas areas como reservadas para evolucao da API.

## Padroes recomendados

Prefixe ids e topicos com `host.meta.id`.

```ts
const commandId = `${host.meta.id}.refresh`;
const topic = `${host.meta.id}:changed`;
```

Separe registros por janela.

```ts
if (host.window === "presenter") {
	host.panels.add({
		id: `${host.meta.id}.presenter`,
		slot: "presenter.content",
		component: PresenterView,
	});
} else {
	host.commands.add({
		id: `${host.meta.id}.open`,
		title: "Open plugin",
		run: () => host.ui.openDialog(`${host.meta.id}.dialog`),
	});
}
```

Use `onunload` para limpar apenas o que voce criou fora das APIs do host.
