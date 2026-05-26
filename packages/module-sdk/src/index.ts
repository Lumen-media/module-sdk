import type { ComponentType } from "react";
import manifestSchema from "./manifest.schema.json";

export { manifestSchema };

export interface Disposable {
	dispose(): void;
}

export interface ModuleManifestAuthor {
	name: string;
	url?: string;
	email?: string;
}

export interface ModuleManifest {
	id: string;
	name: string;
	version: string;
	api: string;
	minLumenVersion: string;
	description?: string;
	author?: string | ModuleManifestAuthor;
	entry?: string;
	icon?: string;
	homepage?: string;
	repository?: string;
	license?: string;
	keywords?: string[];
}

export type LumenWindow = "main" | "presenter";

export type SlotName =
	| "sidebar.left.tabs"
	| "sidebar.right.tabs"
	| "main.center"
	| "dialog"
	| "presenter.content"
	| "presenter.overlay"
	| "settings.section"
	| "command-palette.section"
	| "editor.lyrics.toolbar";

export interface PanelSpec {
	id: string;
	slot: SlotName;
	title?: string;
	icon?: string;
	component: ComponentType<unknown>;
	when?: () => boolean;
}

export interface PanelsAPI {
	add(spec: PanelSpec): Disposable;
}

export interface CommanderAppProps {
	onClose: () => void;
	onBack: () => void;
}

export interface CommandSpec {
	id: string;
	title: string;
	subtitle?: string;
	icon?: ComponentType<{ className?: string }>;
	keybinding?: string;
	keywords?: string[];
	type?: 'action' | 'app';
	run?: (args?: unknown) => unknown;
	component?: ComponentType<CommanderAppProps>;
}

export interface CommandsAPI {
	add(spec: CommandSpec): Disposable;
	invoke(id: string, args?: unknown): unknown;
}

export interface NotifyOpts {
	title?: string;
	message: string;
	level?: "info" | "warn" | "error";
}

export interface ConfirmOpts {
	title: string;
	message: string;
	danger?: boolean;
}

export interface PromptOpts {
	title: string;
	placeholder?: string;
	initial?: string;
}

export interface UIAPI {
	notify(opts: NotifyOpts): void;
	confirm(opts: ConfirmOpts): Promise<boolean>;
	prompt(opts: PromptOpts): Promise<string | null>;
	openCommandPalette(prefilter?: string): void;
	openDialog(panelId: string): void;
}

export interface MenuItemSeparator {
	type: "separator";
	id?: string;
}

export interface MenuItemAction {
	type: "action";
	id: string;
	label: string;
	shortcut?: string;
	onClick?: () => void;
}

export interface MenuItemSubmenu {
	type: "submenu";
	id?: string;
	label: string;
	items: MenuItemDef[];
}

export type MenuItemDef = MenuItemSeparator | MenuItemAction | MenuItemSubmenu;

export interface MenuSpec {
	id: string;
	label: string;
	items?: MenuItemDef[];
	priority?: number;
}

export interface MenusAPI {
	register(spec: MenuSpec): Disposable;
	addItem(menuId: string, item: MenuItemAction, priority?: number): Disposable;
}

export interface BusAPI {
	emit<T = unknown>(topic: string, payload?: T): void;
	on<T = unknown>(topic: string, handler: (payload: T) => void): Disposable;
}

export interface JsonStore {
	load(): Promise<unknown>;
	save(value: unknown): Promise<void>;
	get<T = unknown>(key: string, fallback?: T): Promise<T>;
	set<T>(key: string, value: T): Promise<void>;
	delete(key: string): Promise<void>;
}

export interface SqliteHandle {
	exec(sql: string, params?: unknown[]): Promise<void>;
	query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
}

export interface DataAPI {
	json: JsonStore;
	sqlite: () => Promise<SqliteHandle>;
}

export interface SettingsAPI {
	load<T = unknown>(): Promise<T>;
	save<T>(value: T): Promise<void>;
	onChange(handler: (next: unknown) => void): Disposable;
}

export interface LoggerAPI {
	debug(...args: unknown[]): void;
	info(...args: unknown[]): void;
	warn(...args: unknown[]): void;
	error(...args: unknown[]): void;
}

export type LyricsHostAPI = Record<string, never>;
export type LibraryHostAPI = Record<string, never>;
export type PlayerHostAPI = Record<string, never>;

export interface ThemesHostAPI {
	current(): string;
	onChange(handler: (theme: string) => void): Disposable;
}

export interface QueueItem {
	id: string;
	title: string;
}

export interface QueueState {
	items: QueueItem[];
	currentIndex: number | null;
}

export interface QueueHostAPI {
	state(): QueueState;
	onChange(handler: (state: QueueState) => void): Disposable;
}

export interface PresentationHostAPI {
	state(): "idle" | "live";
	onStateChange(handler: (state: "idle" | "live") => void): Disposable;
	project(viewId: string, props?: unknown): void;
	clear(): void;
	isWindowOpen(): boolean;
}

export interface LumenHost {
	meta: { id: string; version: string };
	window: LumenWindow;
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

	log: LoggerAPI;
}

export abstract class LumenPlugin {
	abstract onload(host: LumenHost): void | Promise<void>;
	onunload?(): void | Promise<void>;
}
