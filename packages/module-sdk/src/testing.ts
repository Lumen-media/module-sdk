import type { Disposable, LumenHost } from "./index.js";

export function createMockHost(overrides?: Partial<LumenHost>): LumenHost {
	const noop = (): void => {};
	const disposable: Disposable = { dispose: noop };

	const base: LumenHost = {
		meta: { id: "test-module", version: "0.0.0" },
		window: "main",
		app: { version: "0.0.0", locale: "en" },
		panels: { add: () => disposable },
		commands: {
			add: () => disposable,
			invoke: () => undefined,
			addPrefix: () => disposable,
		},
		menus: { register: () => disposable, addItem: () => disposable },
		ui: {
			notify: noop,
			confirm: () => Promise.resolve(true),
			prompt: () => Promise.resolve(null),
			openCommandPalette: noop,
			openDialog: noop,
			openBackgroundPicker: noop,
			openMediaPicker: noop,
		},
		bus: { emit: noop, on: () => disposable },
		events: { emit: noop, on: () => disposable },
		data: {
			json: {
				load: () => Promise.resolve({}),
				save: () => Promise.resolve(),
				get: (_key, fallback) => Promise.resolve(fallback as unknown as never),
				set: () => Promise.resolve(),
				delete: () => Promise.resolve(),
			},
			sqlite: () => Promise.reject(new Error("sqlite not available in tests")),
		},
		settings: {
			load: () => Promise.resolve({} as unknown as never),
			save: () => Promise.resolve(),
			onChange: () => disposable,
		},
		lyrics: {},
		queue: {
			state: () => ({ items: [], currentIndex: null }),
			onChange: () => disposable,
			next: noop,
			previous: noop,
			goTo: noop,
			registerTrigger: () => disposable,
		},
		library: {},
		player: {
			nextSlide: noop,
			play: noop,
		},
		presentation: {
			state: () => "idle",
			onStateChange: () => disposable,
			project: noop,
			clear: noop,
			isWindowOpen: () => false,
		},
		overlay: {
			state: () => "idle",
			onStateChange: () => disposable,
			project: noop,
			clear: noop,
			isWindowOpen: () => false,
		},
		surface: {
			state: () => "idle",
			onStateChange: () => disposable,
			openWindow: noop,
			clear: noop,
			isWindowOpen: () => false,
		},
		themes: {
			current: () => "dark",
			onChange: () => disposable,
			defaultBackground: () => null,
		},
		fonts: {
			list: () => Promise.resolve([]),
		},
		fs: {
			read: () => Promise.resolve(new Uint8Array()),
			write: () => Promise.resolve(),
			exists: () => Promise.resolve(false),
			list: () => Promise.resolve([]),
			remove: () => Promise.resolve(),
		},
		net: {
			request: <T>() =>
				Promise.resolve({
					ok: true,
					status: 200,
					statusText: "OK" as const,
					headers: {} as Record<string, string>,
					url: "",
					redirected: false,
					data: null as unknown as T,
				}),
			get: <T>() => Promise.resolve(null as unknown as T),
			post: <T>() => Promise.resolve(null as unknown as T),
		},
		i18n: {
			t: (key: string) => key,
			locale: () => "en",
		},
		log: {
			debug: noop,
			info: noop,
			warn: noop,
			error: noop,
		},
	};

	return { ...base, ...overrides };
}
