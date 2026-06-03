import { type LumenHost, LumenPlugin } from "@lumen-media/module-sdk";
import { LumenHostProvider, useHost } from "@lumen-media/module-sdk/hooks";
import { useState } from "react";

function CounterPanel() {
	const host = useHost();
	const [count, setCount] = useState(0);

	const increment = async () => {
		const next = count + 1;
		setCount(next);
		await host.data.json.set("count", next);
	};

	return (
		<div className="lumen-mod-com-lumen-example-minimal">
			<p>Count: {count}</p>
			<button type="button" onClick={increment}>
				+1
			</button>
		</div>
	);
}

export default class MinimalPlugin extends LumenPlugin {
	private host!: LumenHost;

	async onload(host: LumenHost): Promise<void> {
		this.host = host;

		const saved = await host.data.json.get<number>("count", 0);
		host.log.info(`Loaded count: ${saved}`);

		host.panels.add({
			id: "minimal.counter",
			slot: "sidebar.left.tabs",
			title: "Counter",
			component: () => (
				<LumenHostProvider value={host}>
					<CounterPanel />
				</LumenHostProvider>
			),
		});

		host.commands.add({
			id: "minimal.reset",
			title: "Minimal: Reset Counter",
			run: async () => {
				await host.data.json.set("count", 0);
				host.ui.notify({ message: "Counter reset." });
			},
		});
	}

	override onunload(): void {
		this.host.log.info("Minimal module unloaded");
	}
}
