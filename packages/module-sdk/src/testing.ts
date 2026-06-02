import type { Disposable, LumenHost } from "./index.js";

export function createMockHost(overrides?: Partial<LumenHost>): LumenHost {
	const noop = (): void => {};
	const disposable: Disposable = { dispose: noop };

	const base: LumenHost = {
		meta: { id: "test-module", version: "0.0.0" },
		window: "main",
		app: { version: "0.0.0", locale: "en" },
		panels: { add: () => disposable },
		commands: { add: () => disposable, invoke: () => undefined, addPrefix: () => disposable },
		menus: { register: () => disposable, addItem: () => disposable },
		ui: {
			notify: noop,
			confirm: () => Promise.resolve(true),
			prompt: () => Promise.resolve(null),
			openCommandPalette: noop,
			openDialog: noop,
			openBackgroundPicker: noop,
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
		},
		library: {},
		player: {},
		presentation: {
			state: () => "idle",
			onStateChange: () => disposable,
			project: noop,
			clear: noop,
			isWindowOpen: () => false,
		},
		themes: {
			current: () => "dark",
			onChange: () => disposable,
		},
		fonts: {
			list: () => Promise.resolve([]),
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
