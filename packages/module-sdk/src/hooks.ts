import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { LumenHost, QueueState } from "./index.js";

export const LumenHostContext = createContext<LumenHost | null>(null);

export const LumenHostProvider = LumenHostContext.Provider;

export function useHost(): LumenHost {
	const host = useContext(LumenHostContext);
	if (!host) {
		throw new Error("useHost must be called inside a LumenHostProvider.");
	}
	return host;
}

export function useBus<T = unknown>(
	topic: string,
	handler: (payload: T) => void,
): void {
	const host = useHost();
	const ref = useRef(handler);
	ref.current = handler;

	useEffect(() => {
		const d = host.bus.on<T>(topic, (p) => ref.current(p));
		return () => d.dispose();
	}, [host, topic]);
}

export function useTheme(): string {
	const host = useHost();
	const [theme, setTheme] = useState(() => host.themes.current());

	useEffect(() => {
		setTheme(host.themes.current());
		const d = host.themes.onChange(setTheme);
		return () => d.dispose();
	}, [host]);

	return theme;
}

export function useSetting<T>(key: string, fallback: T): T {
	const host = useHost();
	const fallbackRef = useRef(fallback);
	fallbackRef.current = fallback;

	const [value, setValue] = useState<T>(fallback);

	useEffect(() => {
		let cancelled = false;
		host.settings
			.load<Record<string, unknown>>()
			.then((all) => {
				if (!cancelled && key in all) setValue(all[key] as T);
			})
			.catch(() => {});
		const d = host.settings.onChange((next) => {
			const all = next as Record<string, unknown>;
			setValue(key in all ? (all[key] as T) : fallbackRef.current);
		});
		return () => {
			cancelled = true;
			d.dispose();
		};
	}, [host, key]);

	return value;
}

export function useQueue(): QueueState {
	const host = useHost();
	const [state, setState] = useState(() => host.queue.state());

	useEffect(() => {
		setState(host.queue.state());
		const d = host.queue.onChange(setState);
		return () => d.dispose();
	}, [host]);

	return state;
}

export function useSlideState(): "idle" | "live" {
	const host = useHost();
	const [state, setState] = useState(() => host.presentation.state());

	useEffect(() => {
		setState(host.presentation.state());
		const d = host.presentation.onStateChange(setState);
		return () => d.dispose();
	}, [host]);

	return state;
}
