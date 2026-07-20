import type { ComponentType, Dispatch, SetStateAction } from "react";
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
	permissions?: {
		network: string[];
	};
}

export type LumenWindow = "main" | "presenter";

export type SlotName =
	| "sidebar.left.tabs"
	| "sidebar.right.tabs"
	| "main.center"
	| "dialog"
	| "presenter.content"
	| "presenter.controls.item"
	| "settings.section"
	| "command-palette.section"
	| "editor.lyrics.toolbar"
	| "app.header.trailing";

export interface PresenterControlsItemProps {
	kind: "lyrics" | "image" | "presentation" | null;
	active: boolean;
	slideIndex: number;
	totalSlides: number;
}

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

export interface CommanderSearchAccessoryProps {
	query: string;
	setQuery: (query: string) => void;
	close: () => void;
	back: () => void;
}

export type CommanderSearchTrailingComponent =
	ComponentType<CommanderSearchAccessoryProps>;

export type CommanderBackHandler = () =>
	| boolean
	| undefined
	| Promise<boolean | undefined>;

export interface CommanderSearchOptions {
	placeholder?: string;
	initialQuery?: string;
}

export interface CommanderAppProps {
	onClose: () => void;
	onBack: () => void;
	query?: string;
	setQuery?: (query: string) => void;
	setSearchTrailing?: Dispatch<
		SetStateAction<CommanderSearchTrailingComponent | undefined>
	>;
	setBackHandler?: Dispatch<SetStateAction<CommanderBackHandler | undefined>>;
}

export interface CommandSpec {
	id: string;
	title: string;
	subtitle?: string;
	icon?: ComponentType<{ className?: string }>;
	keybinding?: string;
	keywords?: string[];
	type?: "action" | "app";
	run?: (args?: unknown) => unknown;
	component?: ComponentType<CommanderAppProps>;
	commanderSearch?: boolean | CommanderSearchOptions;
}

export interface PrefixResult {
	id: string;
	title: string;
	subtitle?: string;
	badge?: string;
	run?: () => void;
	component?: ComponentType<CommanderAppProps>;
	commanderSearch?: boolean | CommanderSearchOptions;
}

export interface PrefixSpec {
	prefix: string;
	title: string;
	icon?: ComponentType<{ className?: string }>;
	placeholder?: string;
	handle(query: string): PrefixResult[] | Promise<PrefixResult[]>;
}

export interface CommandsAPI {
	add(spec: CommandSpec): Disposable;
	invoke(id: string, args?: unknown): unknown;
	addPrefix(spec: PrefixSpec): Disposable;
}

export interface NotifyOpts {
	title?: string;
	message: string;
	level?: "info" | "warn" | "error" | "success" | "loading" | "custom";
	[key: string]: unknown;
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

export interface SelectedBackground {
	type: "theme" | "image" | "video";
	src: string;
	name: string;
}

export interface LibraryItem {
	id: string;
	title: string;
	type: "image" | "audio" | "video" | "lyric" | "presentation";
	thumbnail?: string;
}

export interface UIAPI {
	notify(opts: NotifyOpts): void;
	confirm(opts: ConfirmOpts): Promise<boolean>;
	prompt(opts: PromptOpts): Promise<string | null>;
	openCommandPalette(prefilter?: string): void;
	openDialog(panelId: string): void;
	openBackgroundPicker(onSelect: (bg: SelectedBackground) => void): void;
	openMediaPicker(onSelect: (item: LibraryItem) => void): void;
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

export interface Migration {
	version: number;
	up: string;
}

export interface SqliteHandle {
	exec(sql: string, params?: unknown[]): Promise<void>;
	query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
	migrate(versions: Migration[]): Promise<void>;
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

// ── NetAPI ───────────────────────────────────────────────────────────

export type NetMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
export type NetResponseType = "json" | "text" | "bytes" | "none";

export type NetQueryValue = string | number | boolean | null | undefined;

export type NetRequestBody =
	| { type: "json"; value: unknown }
	| { type: "text"; value: string; contentType?: string }
	| { type: "bytes"; valueBase64: string; contentType?: string }
	| { type: "form"; value: Record<string, NetQueryValue> }
	| {
			type: "multipart";
			parts: Array<
				| { name: string; type: "text"; value: string; contentType?: string }
				| {
						name: string;
						type: "bytes";
						valueBase64: string;
						filename?: string;
						contentType?: string;
				  }
			>;
	  };

export interface NetRequest {
	url: string;
	method?: NetMethod;
	query?: Record<string, NetQueryValue | NetQueryValue[]>;
	headers?: Record<string, string>;
	body?: NetRequestBody;
	responseType?: NetResponseType;
	timeoutMs?: number;
	maxBytes?: number;
	followRedirects?: boolean;
}

export interface NetResponse<T = unknown> {
	ok: boolean;
	status: number;
	statusText: string;
	headers: Record<string, string>;
	url: string;
	redirected: boolean;
	data: T;
}

export type NetErrorCode =
	| "permission_denied"
	| "invalid_url"
	| "blocked_url"
	| "timeout"
	| "network_error"
	| "response_too_large"
	| "invalid_response"
	| "unsupported_body"
	| "unsupported_response_type";

export interface NetError extends Error {
	code: NetErrorCode;
	status?: number;
	url?: string;
}

export interface NetAPI {
	request<T = unknown>(input: NetRequest): Promise<NetResponse<T>>;

	/** Thin wrapper over request() that throws on non-2xx and returns data directly. */
	get?<T = unknown>(
		url: string,
		opts?: Omit<NetRequest, "url" | "method" | "body">,
	): Promise<T>;

	/** Thin wrapper over request() that throws on non-2xx and returns data directly. */
	post?<T = unknown>(
		url: string,
		body?: NetRequestBody | unknown,
		opts?: Omit<NetRequest, "url" | "method" | "body">,
	): Promise<T>;
}

// ── FsAPI ────────────────────────────────────────────────────────────

export interface FsAPI {
	read(path: string): Promise<Uint8Array>;
	write(path: string, data: Uint8Array): Promise<void>;
	exists(path: string): Promise<boolean>;
	list(path: string): Promise<string[]>;
	remove(path: string): Promise<void>;
}

// ── I18nAPI ──────────────────────────────────────────────────────────

export interface I18nAPI {
	t(key: string, params?: Record<string, string>): string;
	locale(): string;
}

export type LyricsHostAPI = Record<string, never>;

export type MediaType = "audio" | "video" | "image";

export interface MediaRef {
	id: string;
	path: string;
	name: string;
	type: MediaType;
}

export interface LibraryHostAPI {
	addUrl?(input: {
		type: "video";
		url: string;
		addToQueue?: boolean;
		playNext?: boolean;
		duration?: number;
	}): Promise<MediaRef>;
}

export interface PlayerHostAPI {
	nextSlide(): void;
	play(itemId: string): void;
}

export interface ThemesHostAPI {
	current(): string;
	onChange(handler: (theme: string) => void): Disposable;
	defaultBackground(): {
		src: string;
		type: "theme" | "image" | "video";
		name: string;
	} | null;
}

export interface QueueItem {
	id: string;
	title: string;
}

export interface QueueState {
	items: QueueItem[];
	currentIndex: number | null;
}

export interface QueueTriggerSpec<T = unknown> {
	id: string;
	label: string;
	icon?: ComponentType<{ size?: number; className?: string }>;
	ConfigComponent: ComponentType<{ value: T; onChange: (value: T) => void }>;
	SummaryComponent?: ComponentType<{ value: T; onEdit: () => void }>;
	defaultConfig: T;
	onFire(config: T): void;
}

export interface QueueHostAPI {
	state(): QueueState;
	onChange(handler: (state: QueueState) => void): Disposable;
	next(): void;
	previous(): void;
	goTo(index: number): void;
	registerTrigger<T = unknown>(spec: QueueTriggerSpec<T>): Disposable;
	addUrl?(input: {
		url: string;
		position?: "end" | "next";
		duration?: number;
	}): Promise<void>;
}
export interface FontsAPI {
	list(): Promise<string[]>;
}

export interface WindowConfig {
	maximized?: boolean;
	resizable?: boolean;
	decorations?: boolean;
	title?: string;
	fullscreen?: boolean;
	width?: number;
	height?: number;
	minWidth?: number;
	minHeight?: number;
}

export interface PresentationHostAPI {
	state(): "idle" | "live";
	onStateChange(handler: (state: "idle" | "live") => void): Disposable;
	project(viewId: string, props?: unknown): void;
	clear(): void;
	isWindowOpen(): boolean;
}

export interface OverlayHostAPI {
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
	overlay: OverlayHostAPI;
	themes: ThemesHostAPI;
	fonts: FontsAPI;

	fs: FsAPI;
	net: NetAPI;
	i18n: I18nAPI;
	log: LoggerAPI;
}

export abstract class LumenPlugin {
	abstract onload(host: LumenHost): void | Promise<void>;
	onunload?(): void | Promise<void>;
}
